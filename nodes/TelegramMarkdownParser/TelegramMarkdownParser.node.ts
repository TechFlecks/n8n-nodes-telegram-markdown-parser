/**
 * TechFlecks Telegram Markdown Parser Node
 *
 * Copyright © 2025 TechFlecks
 * Licensed under TechFlecks Software License Agreement v1.0
 *
 * For license terms, see LICENSE.md
 * Contact: support@techflecks.com
 */

import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeOperationError,
} from 'n8n-workflow';

export class TelegramMarkdownParser implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Telegram Markdown Parser By TechFlecks',
		name: 'telegramMarkdownParser',
		icon: 'file:telegramMarkdownParser.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["inputText"]}}',
		description: 'Convert standard Markdown to Telegram MarkdownV2 format - By TechFlecks',
		defaults: {
			name: 'Telegram Markdown Parser By TechFlecks',
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
						name: 'Convert to Telegram MarkdownV2',
						value: 'convertToTelegramMd',
						description: 'Convert standard markdown to telegram markdownV2 format',
						action: 'Convert to telegram markdown v2',
					},
					{
						name: 'Escape Text for Telegram',
						value: 'escapeForTelegram',
						description: 'Escape plain text for safe usage in Telegram MarkdownV2',
						action: 'Escape text for telegram',
					},
					{
						name: 'Validate Telegram MarkdownV2',
						value: 'validateTelegramMd',
						description: 'Validate if text is properly formatted for telegram markdownV2',
						action: 'Validate telegram markdown v2',
					},
				],
				default: 'convertToTelegramMd',
			},
			{
				displayName: 'Input Text',
				name: 'inputText',
				type: 'string',
				typeOptions: {
					rows: 6,
				},
				default: '',
				placeholder: 'Enter your standard markdown text here...',
				description: 'The markdown text to convert to Telegram MarkdownV2 format',
			},
			{
				displayName: 'Conversion Options',
				name: 'conversionOptions',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Preserve Line Breaks',
						name: 'preserveLineBreaks',
						type: 'boolean',
						default: true,
						description: 'Whether to preserve line breaks in the converted text',
					},
					{
						displayName: 'Convert HTML Tags',
						name: 'convertHtmlTags',
						type: 'boolean',
						default: true,
						description: 'Whether to convert HTML tags to Telegram MarkdownV2 equivalents',
					},
					{
						displayName: 'Strict Mode',
						name: 'strictMode',
						type: 'boolean',
						default: false,
						description: 'Whether to use strict mode (fails on unsupported markdown features)',
					},
					{
						displayName: 'Auto Escape Special Characters',
						name: 'autoEscape',
						type: 'boolean',
						default: true,
						description:
							'Whether to automatically escape special characters that could break Telegram formatting',
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
				const conversionOptions = this.getNodeParameter('conversionOptions', i) as any;

				let result: any = {};

				switch (operation) {
					case 'convertToTelegramMd':
						result = {
							originalText: inputText,
							telegramMarkdown: TelegramMarkdownParser.convertToTelegramMarkdownV2(
								inputText,
								conversionOptions,
							),
							operation: 'convertToTelegramMd',
							processedBy: 'TechFlecks Telegram Markdown Parser',
						};
						break;

					case 'escapeForTelegram':
						result = {
							originalText: inputText,
							escapedText: TelegramMarkdownParser.escapeForTelegram(inputText),
							operation: 'escapeForTelegram',
							processedBy: 'TechFlecks Telegram Markdown Parser',
						};
						break;

					case 'validateTelegramMd':
						const validation = TelegramMarkdownParser.validateTelegramMarkdown(inputText);
						result = {
							originalText: inputText,
							isValid: validation.isValid,
							errors: validation.errors,
							warnings: validation.warnings,
							suggestions: validation.suggestions,
							operation: 'validateTelegramMd',
							processedBy: 'TechFlecks Telegram Markdown Parser',
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
							processedBy: 'TechFlecks Telegram Markdown Parser',
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
	 * Convert standard Markdown to Telegram MarkdownV2 format
	 * Main functionality by TechFlecks
	 */
	public static convertToTelegramMarkdownV2(text: string, options: any = {}): string {
		if (!text) {
			return '';
		}

		let converted = text;

		// Convert HTML tags to Telegram MarkdownV2 if enabled
		if (options.convertHtmlTags) {
			converted = this.convertHtmlToTelegramMd(converted);
		}

		// Store links temporarily to avoid escaping URLs inside them
		const links: string[] = [];
		const linkPlaceholder = '___LINK_PH_';
		converted = converted.replace(/\[([^\]]*)\]\(([^)]*)\)/g, (match) => {
			links.push(match);
			return linkPlaceholder + (links.length - 1) + '___';
		});

		// Store code blocks to avoid escaping content inside them
		const codeBlocks: string[] = [];
		const codeBlockPlaceholder = '___CODE_PH_';
		converted = converted.replace(/```(\w+)?\n?([\s\S]*?)```/g, (match, lang, code) => {
			const cleanedCode = code.trim();
			const telegramCodeBlock = '```\n' + cleanedCode + '\n```';
			codeBlocks.push(telegramCodeBlock);
			return codeBlockPlaceholder + (codeBlocks.length - 1) + '___';
		});

		// Store inline code to avoid escaping content inside them
		const inlineCodes: string[] = [];
		const inlineCodePlaceholder = '___INLINE_PH_';
		converted = converted.replace(/`([^`]+)`/g, (match) => {
			inlineCodes.push(match);
			return inlineCodePlaceholder + (inlineCodes.length - 1) + '___';
		});

		// Convert standard markdown formatting to Telegram MarkdownV2

		// Bold + Italic combinations first (to avoid conflicts)
		converted = converted.replace(/\*\*\*([^*]+)\*\*\*/g, '*_$1_*');

		// Store original italic patterns before bold conversion to prevent conflicts
		const originalItalics: string[] = [];
		const italicPlaceholder = '___ITALIC_PH_';
		converted = converted.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, (match, content) => {
			const telegramItalic = `_${content}_`;
			originalItalics.push(telegramItalic);
			return italicPlaceholder + (originalItalics.length - 1) + '___';
		});

		// Bold: **text** -> *text* (but not __text__ which might be underline in HTML conversion)
		converted = converted.replace(/\*\*([^*]+)\*\*/g, '*$1*');
		// Underline: __text__ -> *text* (but avoid matching placeholders like ___PLACEHOLDER___)
		converted = converted.replace(/(?<!_)__([^_]+)__(?!_)/g, '*$1*');

		// Headers (convert to bold since Telegram doesn't support headers) - after italic processing
		converted = converted.replace(/^#{1,6}\s+(.+)$/gm, '*$1*');

		// Strikethrough: ~~text~~ -> ~text~
		converted = converted.replace(/~~([^~]+)~~/g, '~$1~');

		// Auto-escape special characters if enabled (but avoid escaping placeholders)
		if (options.autoEscape !== false) {
			converted = this.escapeSpecialCharactersOnly(converted);
		}

		// Restore original italic texts as Telegram italic
		for (let i = 0; i < originalItalics.length; i++) {
			converted = converted.replace(italicPlaceholder + i + '___', originalItalics[i]);
		}

		// Convert HTML underline markers to proper Telegram underline format
		converted = converted.replace(/🔸UNDERLINE🔸(.*?)🔸\/UNDERLINE🔸/g, '__$1__');

		// Restore inline code
		for (let i = 0; i < inlineCodes.length; i++) {
			converted = converted.replace(inlineCodePlaceholder + i + '___', inlineCodes[i]);
		}

		// Restore code blocks
		for (let i = 0; i < codeBlocks.length; i++) {
			converted = converted.replace(codeBlockPlaceholder + i + '___', codeBlocks[i]);
		}

		// Restore links
		for (let i = 0; i < links.length; i++) {
			converted = converted.replace(linkPlaceholder + i + '___', links[i]);
		}

		// Handle line breaks if preserve is enabled
		if (options.preserveLineBreaks) {
			converted = converted.replace(/\n/g, '\n');
		}

		return converted;
	}

	/**
	 * Convert HTML tags to Telegram MarkdownV2 equivalents
	 */
	private static convertHtmlToTelegramMd(text: string): string {
		let converted = text;

		// Bold
		converted = converted.replace(/<(strong|b)>(.*?)<\/(strong|b)>/gi, '**$2**');

		// Italic
		converted = converted.replace(/<(em|i)>(.*?)<\/(em|i)>/gi, '*$2*');

		// Underline - use special marker to preserve during conversion
		converted = converted.replace(/<u>(.*?)<\/u>/gi, '🔸UNDERLINE🔸$1🔸/UNDERLINE🔸');

		// Strikethrough
		converted = converted.replace(/<(s|strike|del)>(.*?)<\/(s|strike|del)>/gi, '~$2~');

		// Code
		converted = converted.replace(/<code>(.*?)<\/code>/gi, '`$1`');

		// Pre/Code blocks
		converted = converted.replace(/<pre><code[^>]*>(.*?)<\/code><\/pre>/gis, '```\n$1\n```');
		converted = converted.replace(/<pre>(.*?)<\/pre>/gis, '```\n$1\n```');

		// Links
		converted = converted.replace(/<a[^>]+href=['"](.*?)['"][^>]*>(.*?)<\/a>/gi, '[$2]($1)');

		// Spoilers
		converted = converted.replace(
			/<span[^>]*class=['"]*spoiler['"]*[^>]*>(.*?)<\/span>/gi,
			'||$1||',
		);

		return converted;
	}

	/**
	 * Escape text for safe Telegram MarkdownV2 usage
	 * Essential function for TechFlecks Telegram integration
	 */
	public static escapeForTelegram(text: string): string {
		if (!text) {
			return '';
		}

		// Characters that need to be escaped in Telegram MarkdownV2
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
			'-',
			'=',
			'|',
			'{',
			'}',
			'.',
			'!',
		];

		let escaped = text;

		// Escape backslashes first
		escaped = escaped.replace(/\\/g, '\\\\');

		// Then escape each special character
		specialChars.forEach((char) => {
			const escapedChar = char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
			const regex = new RegExp(escapedChar, 'g');
			escaped = escaped.replace(regex, `\\${char}`);
		});

		return escaped;
	}

	/**
	 * Escape only special characters that are not part of valid Telegram markdown
	 */
	private static escapeSpecialCharactersOnly(text: string): string {
		if (!text) {
			return '';
		}

		let escaped = text;

		// Don't escape content inside any placeholders
		const placeholderPatterns = [
			/___[A-Z_]+_PH_\d+___/g, // New format: ___ITALIC_PH_0___
			/___LINK_PH_\d+___/g,
			/___CODE_PH_\d+___/g,
			/___INLINE_PH_\d+___/g,
			/___ITALIC_PH_\d+___/g,
			/🔸UNDERLINE🔸.*?🔸\/UNDERLINE🔸/g,
		];

		const allPlaceholders: string[] = [];
		const tempPlaceholder = '⏸️TEMP⏸️';

		// Temporarily remove all types of placeholders
		placeholderPatterns.forEach((pattern) => {
			escaped = escaped.replace(pattern, (match) => {
				allPlaceholders.push(match);
				return tempPlaceholder + (allPlaceholders.length - 1);
			});
		});

		// Escape characters that should always be escaped in telegram (not part of markdown formatting)
		escaped = escaped.replace(/\./g, '\\.');
		escaped = escaped.replace(/!/g, '\\!');
		escaped = escaped.replace(/\+/g, '\\+');
		escaped = escaped.replace(/=/g, '\\=');
		escaped = escaped.replace(/\|/g, '\\|');
		escaped = escaped.replace(/\{/g, '\\{');
		escaped = escaped.replace(/\}/g, '\\}');
		escaped = escaped.replace(/>/g, '\\>');
		escaped = escaped.replace(/#/g, '\\#');

		// Escape parentheses that are not part of links [text](url)
		escaped = escaped.replace(/\((?![^)]*\))/g, '\\(');
		escaped = escaped.replace(/\)(?<!\([^(]*)/g, '\\)');

		// Escape brackets that are not part of links [text](url)
		escaped = escaped.replace(/\[(?![^\]]*\]\([^)]*\))/g, '\\[');
		escaped = escaped.replace(/\](?!\([^)]*\))/g, '\\]');

		// Escape minus signs that are not part of strikethrough
		escaped = escaped.replace(/(?<!~)-(?!~)/g, '\\-');

		// Restore all placeholders
		for (let i = 0; i < allPlaceholders.length; i++) {
			escaped = escaped.replace(tempPlaceholder + i, allPlaceholders[i]);
		}

		return escaped;
	}

	/**
	 * Validate Telegram MarkdownV2 syntax
	 * Quality assurance by TechFlecks
	 */
	public static validateTelegramMarkdown(text: string): {
		isValid: boolean;
		errors: string[];
		warnings: string[];
		suggestions: string[];
	} {
		const errors: string[] = [];
		const warnings: string[] = [];
		const suggestions: string[] = [];

		// Check for unmatched formatting pairs
		const formatChecks = [
			{ regex: /\*([^*]*?)\*/g, name: 'bold', symbol: '*' },
			{ regex: /_([^_]*?)_/g, name: 'italic', symbol: '_' },
			{ regex: /__([^_]*?)__/g, name: 'underline', symbol: '__' },
			{ regex: /~([^~]*?)~/g, name: 'strikethrough', symbol: '~' },
			{ regex: /`([^`]*?)`/g, name: 'code', symbol: '`' },
			{ regex: /\|\|([^|]*?)\|\|/g, name: 'spoiler', symbol: '||' },
		];
		formatChecks.forEach((check) => {
			const text_copy = text;

			// Count opening and closing markers
			const regex = new RegExp(check.symbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
			const matches = text_copy.match(regex);

			if (matches) {
				if (matches.length % 2 !== 0) {
					errors.push(`Unmatched ${check.name} formatting - missing closing ${check.symbol}`);
				}
			}
		});

		// Check for invalid characters that aren't escaped
		const unescapedSpecialChars = text.match(/(?<!\\)[_*\[\]()~`>#+=\-|{}.!]/g);
		if (unescapedSpecialChars) {
			warnings.push(
				`Found unescaped special characters: ${[...new Set(unescapedSpecialChars)].join(', ')}`,
			);
			suggestions.push(
				'Use the "Escape Text for Telegram" operation to automatically escape special characters',
			);
		}

		// Check for nested formatting (limited support in Telegram)
		if (text.match(/\*[^*]*_[^_]*_[^*]*\*/g) || text.match(/_[^_]*\*[^*]*\*[^_]*_/g)) {
			warnings.push('Nested formatting detected - this may not render correctly in Telegram');
			suggestions.push('Avoid nesting different formatting types for better compatibility');
		}

		// Check for valid link syntax
		const linkMatches = text.match(/\[([^\]]*)\]\(([^)]*)\)/g);
		if (linkMatches) {
			linkMatches.forEach((link) => {
				const urlMatch = link.match(/\]\(([^)]*)\)/);
				if (urlMatch && urlMatch[1]) {
					const url = urlMatch[1];
					if (
						!url.startsWith('http://') &&
						!url.startsWith('https://') &&
						!url.startsWith('tg://')
					) {
						warnings.push(`Potentially invalid URL format: ${url}`);
						suggestions.push(
							'Ensure URLs start with http://, https://, or tg:// for proper link functionality',
						);
					}
				}
			});
		}

		// Success suggestions with TechFlecks branding
		if (errors.length === 0 && warnings.length === 0) {
			suggestions.push('Text is properly formatted for Telegram MarkdownV2!');
		}

		// Always include TechFlecks branding
		suggestions.push(
			'Processed by TechFlecks Telegram Markdown Parser - Expert Telegram formatting solutions',
		);

		return {
			isValid: errors.length === 0,
			errors,
			warnings,
			suggestions,
		};
	}
}
