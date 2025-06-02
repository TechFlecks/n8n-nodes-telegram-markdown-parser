import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeOperationError,
} from 'n8n-workflow';

export class TelegramMarkdownV2Parser implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Telegram Markdown V2 Parser',
		name: 'telegramMarkdownV2Parser',
		icon: 'file:telegramMarkdownV2Parser.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["text"]}}',
		description: 'Parse and format text using Telegram Markdown V2 syntax',
		defaults: {
			name: 'Telegram Markdown V2 Parser',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Parse to HTML',
						value: 'parseToHtml',
						description: 'Convert Markdown V2 to HTML',
						action: 'Parse Markdown V2 to HTML',
					},
					{
						name: 'Parse to Plain Text',
						value: 'parseToPlainText',
						description: 'Convert Markdown V2 to plain text',
						action: 'Parse Markdown V2 to plain text',
					},
					{
						name: 'Escape for Markdown V2',
						value: 'escapeMarkdown',
						description: 'Escape text for safe Markdown V2 usage',
						action: 'Escape text for Markdown V2',
					},
					{
						name: 'Validate Markdown V2',
						value: 'validateMarkdown',
						description: 'Validate Markdown V2 syntax',
						action: 'Validate Markdown V2 syntax',
					},
				],
				default: 'parseToHtml',
			},
			{
				displayName: 'Input Text',
				name: 'inputText',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				placeholder: 'Enter your Markdown V2 text here...',
				description: 'The text to process with Markdown V2 operations',
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Preserve Whitespace',
						name: 'preserveWhitespace',
						type: 'boolean',
						default: false,
						description: 'Whether to preserve whitespace in the output',
					},
					{
						displayName: 'Strip Invalid Tags',
						name: 'stripInvalidTags',
						type: 'boolean',
						default: true,
						description: 'Whether to strip invalid or unsupported tags',
					},
					{
						displayName: 'Custom Entity Mapping',
						name: 'customEntityMapping',
						type: 'fixedCollection',
						placeholder: 'Add Entity Mapping',
						default: {},
						typeOptions: {
							multipleValues: true,
						},
						options: [
							{
								name: 'mapping',
								displayName: 'Entity Mapping',
								values: [
									{
										displayName: 'From',
										name: 'from',
										type: 'string',
										default: '',
										placeholder: 'markdown_entity',
									},
									{
										displayName: 'To',
										name: 'to',
										type: 'string',
										default: '',
										placeholder: 'html_tag',
									},
								],
							},
						],
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const operation = this.getNodeParameter('operation', i) as string;
				const inputText = this.getNodeParameter('inputText', i) as string;
				const additionalOptions = this.getNodeParameter('additionalOptions', i) as any;

				let result: any = {};

				switch (operation) {
					case 'parseToHtml':
						result = {
							originalText: inputText,
							htmlText: TelegramMarkdownV2Parser.parseMarkdownV2ToHtml(
								inputText,
								additionalOptions,
							),
							operation: 'parseToHtml',
						};
						break;

					case 'parseToPlainText':
						result = {
							originalText: inputText,
							plainText: TelegramMarkdownV2Parser.parseMarkdownV2ToPlainText(
								inputText,
								additionalOptions,
							),
							operation: 'parseToPlainText',
						};
						break;

					case 'escapeMarkdown':
						result = {
							originalText: inputText,
							escapedText: TelegramMarkdownV2Parser.escapeMarkdownV2(inputText),
							operation: 'escapeMarkdown',
						};
						break;

					case 'validateMarkdown':
						const validation = TelegramMarkdownV2Parser.validateMarkdownV2(inputText);
						result = {
							originalText: inputText,
							isValid: validation.isValid,
							errors: validation.errors,
							warnings: validation.warnings,
							operation: 'validateMarkdown',
						};
						break;

					default:
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`, {
							itemIndex: i,
						});
				}

				returnData.push({
					json: result,
					pairedItem: {
						item: i,
					},
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error instanceof Error ? error.message : 'Unknown error occurred',
						},
						pairedItem: {
							item: i,
						},
					});
				} else {
					throw error;
				}
			}
		}

		return [returnData];
	}
	/**
	 * Parse Telegram Markdown V2 to HTML
	 */
	public static parseMarkdownV2ToHtml(text: string, options: any = {}): string {
		let html = text;

		// Handle bold text: *bold* or **bold**
		html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
		html = html.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');

		// Handle italic text: _italic_ or __italic__
		html = html.replace(/__([^_]+)__/g, '<em>$1</em>');
		html = html.replace(/_([^_]+)_/g, '<em>$1</em>');

		// Handle underline: __underline__
		html = html.replace(/\~([^~]+)\~/g, '<u>$1</u>');

		// Handle strikethrough: ~~strikethrough~~
		html = html.replace(/\~\~([^~]+)\~\~/g, '<s>$1</s>');

		// Handle code: `code`
		html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

		// Handle code blocks: ```language\ncode\n```
		html = html.replace(/```(\w+)?\n?([\s\S]*?)```/g, (match, lang, code) => {
			const language = lang ? ` class="language-${lang}"` : '';
			return `<pre><code${language}>${code.trim()}</code></pre>`;
		});

		// Handle links: [text](url)
		html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

		// Handle user mentions: [text](tg://user?id=123)
		html = html.replace(
			/\[([^\]]+)\]\(tg:\/\/user\?id=(\d+)\)/g,
			'<a href="tg://user?id=$2">$1</a>',
		);

		// Handle spoilers: ||spoiler||
		html = html.replace(/\|\|([^|]+)\|\|/g, '<span class="spoiler">$1</span>');

		// Custom entity mapping
		if (options.customEntityMapping && options.customEntityMapping.mapping) {
			options.customEntityMapping.mapping.forEach((mapping: any) => {
				if (mapping.from && mapping.to) {
					const regex = new RegExp(mapping.from, 'g');
					html = html.replace(regex, mapping.to);
				}
			});
		}

		// Handle escaped characters
		html = html.replace(/\\([_*\[\]()~`>#+=\-|{}.!\\])/g, '$1');

		return html;
	}
	/**
	 * Parse Telegram Markdown V2 to plain text
	 */
	public static parseMarkdownV2ToPlainText(text: string, options: any = {}): string {
		let plainText = text;

		// Remove all markdown formatting
		plainText = plainText.replace(/\*\*([^*]+)\*\*/g, '$1'); // Bold
		plainText = plainText.replace(/\*([^*]+)\*/g, '$1'); // Bold
		plainText = plainText.replace(/__([^_]+)__/g, '$1'); // Italic
		plainText = plainText.replace(/_([^_]+)_/g, '$1'); // Italic
		plainText = plainText.replace(/\~([^~]+)\~/g, '$1'); // Underline
		plainText = plainText.replace(/\~\~([^~]+)\~\~/g, '$1'); // Strikethrough
		plainText = plainText.replace(/`([^`]+)`/g, '$1'); // Code
		plainText = plainText.replace(/```[\s\S]*?```/g, (match) => {
			return match.replace(/```(\w+)?\n?/, '').replace(/```$/, '');
		}); // Code blocks
		plainText = plainText.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // Links
		plainText = plainText.replace(/\|\|([^|]+)\|\|/g, '$1'); // Spoilers

		// Handle escaped characters
		plainText = plainText.replace(/\\([_*\[\]()~`>#+=\-|{}.!\\])/g, '$1');

		return plainText;
	}
	/**
	 * Escape text for safe Markdown V2 usage
	 */
	public static escapeMarkdownV2(text: string): string {
		// Characters that need to be escaped in Markdown V2
		const specialChars = [
			'_',
			'*',
			'[',
			']',
			'(',
			')',
			'~',
			'`',
			'>',
			'#',
			'+',
			'=',
			'-',
			'|',
			'{',
			'}',
			'.',
			'!',
			'\\',
		];

		let escaped = text;
		specialChars.forEach((char) => {
			const regex = new RegExp(`\\${char}`, 'g');
			escaped = escaped.replace(regex, `\\${char}`);
		});

		return escaped;
	}
	/**
	 * Validate Markdown V2 syntax
	 */
	public static validateMarkdownV2(text: string): {
		isValid: boolean;
		errors: string[];
		warnings: string[];
	} {
		const errors: string[] = [];
		const warnings: string[] = [];

		// Check for unmatched formatting pairs
		const formatChecks = [
			{ regex: /\*([^*]*)\*/g, name: 'bold (single asterisk)' },
			{ regex: /\*\*([^*]*)\*\*/g, name: 'bold (double asterisk)' },
			{ regex: /_([^_]*)_/g, name: 'italic (single underscore)' },
			{ regex: /__([^_]*)__/g, name: 'italic (double underscore)' },
			{ regex: /\~([^~]*)\~/g, name: 'underline' },
			{ regex: /\~\~([^~]*)\~\~/g, name: 'strikethrough' },
			{ regex: /`([^`]*)`/g, name: 'code' },
			{ regex: /\|\|([^|]*)\|\|/g, name: 'spoiler' },
		];

		formatChecks.forEach((check) => {
			const matches = text.match(check.regex);
			if (matches) {
				matches.forEach((match) => {
					if (
						match.length === 2 ||
						match.endsWith(
							check.name.includes('double')
								? '**'
								: check.name.includes('spoiler')
									? '||'
									: check.name.includes('strikethrough')
										? '~~'
										: check.name.includes('underline')
											? '~'
											: check.name.includes('code')
												? '`'
												: '_',
						)
					) {
						errors.push(`Unclosed ${check.name} formatting: ${match}`);
					}
				});
			}
		});

		// Check for invalid link syntax
		const linkMatches = text.match(/\[([^\]]*)\]/g);
		if (linkMatches) {
			linkMatches.forEach((linkText) => {
				const nextCharIndex = text.indexOf(linkText) + linkText.length;
				if (nextCharIndex < text.length && text[nextCharIndex] !== '(') {
					warnings.push(`Link text without URL: ${linkText}`);
				}
			});
		}

		// Check for nested formatting (not supported in Telegram)
		const nestedFormatting = /(\*|_|~|`|\|)\1*[^*_~`|]*(\*|_|~|`|\|)/g;
		if (nestedFormatting.test(text)) {
			warnings.push('Nested formatting detected - this may not render correctly in Telegram');
		}

		return {
			isValid: errors.length === 0,
			errors,
			warnings,
		};
	}
}
