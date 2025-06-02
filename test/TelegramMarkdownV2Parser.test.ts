import { TelegramMarkdownV2Parser } from '../nodes/TelegramMarkdownV2Parser/TelegramMarkdownV2Parser.node';

describe('TelegramMarkdownV2Parser', () => {
	let parser: TelegramMarkdownV2Parser;

	beforeEach(() => {
		parser = new TelegramMarkdownV2Parser();
	});

	describe('Node Description', () => {
		test('should have correct node description', () => {
			expect(parser.description.displayName).toBe('Telegram Markdown V2 Parser');
			expect(parser.description.name).toBe('telegramMarkdownV2Parser');
			expect(parser.description.group).toContain('transform');
		});

		test('should have all required operations', () => {
			const operations = parser.description.properties[0].options;
			expect(operations).toBeDefined();
			const operationValues = operations!.map((op: any) => op.value);

			expect(operationValues).toContain('parseToHtml');
			expect(operationValues).toContain('parseToPlainText');
			expect(operationValues).toContain('escapeMarkdown');
			expect(operationValues).toContain('validateMarkdown');
		});
	});
	describe('Markdown V2 to HTML Parsing', () => {
		test('should parse bold text correctly', () => {
			const result = (TelegramMarkdownV2Parser as any).parseMarkdownV2ToHtml('*bold text*');
			expect(result).toBe('<strong>bold text</strong>');
		});

		test('should parse italic text correctly', () => {
			const result = (TelegramMarkdownV2Parser as any).parseMarkdownV2ToHtml('_italic text_');
			expect(result).toBe('<em>italic text</em>');
		});

		test('should parse strikethrough text correctly', () => {
			const result = (TelegramMarkdownV2Parser as any).parseMarkdownV2ToHtml(
				'~~strikethrough text~~',
			);
			expect(result).toBe('<s>strikethrough text</s>');
		});

		test('should parse code correctly', () => {
			const result = (TelegramMarkdownV2Parser as any).parseMarkdownV2ToHtml('`inline code`');
			expect(result).toBe('<code>inline code</code>');
		});

		test('should parse links correctly', () => {
			const result = (TelegramMarkdownV2Parser as any).parseMarkdownV2ToHtml(
				'[TechFlecks](https://techflecks.com)',
			);
			expect(result).toBe('<a href="https://techflecks.com">TechFlecks</a>');
		});

		test('should parse spoilers correctly', () => {
			const result = (TelegramMarkdownV2Parser as any).parseMarkdownV2ToHtml('||spoiler text||');
			expect(result).toBe('<span class="spoiler">spoiler text</span>');
		});

		test('should handle mixed formatting', () => {
			const input = '*bold* and _italic_ with `code`';
			const result = (TelegramMarkdownV2Parser as any).parseMarkdownV2ToHtml(input);
			expect(result).toBe('<strong>bold</strong> and <em>italic</em> with <code>code</code>');
		});
	});

	describe('Markdown V2 to Plain Text Parsing', () => {
		test('should strip all formatting', () => {
			const input = '*bold* _italic_ `code` [link](url) ||spoiler||';
			const result = (TelegramMarkdownV2Parser as any).parseMarkdownV2ToPlainText(input);
			expect(result).toBe('bold italic code link spoiler');
		});

		test('should handle escaped characters', () => {
			const input = 'Price: \\$10\\.99 \\(sale\\)';
			const result = (TelegramMarkdownV2Parser as any).parseMarkdownV2ToPlainText(input);
			expect(result).toBe('Price: $10.99 (sale)');
		});
	});

	describe('Markdown V2 Escaping', () => {
		test('should escape special characters', () => {
			const input = 'Price: $10.99 (includes * and _ characters)';
			const result = (TelegramMarkdownV2Parser as any).escapeMarkdownV2(input);
			expect(result).toContain('\\$');
			expect(result).toContain('\\.');
			expect(result).toContain('\\(');
			expect(result).toContain('\\)');
			expect(result).toContain('\\*');
			expect(result).toContain('\\_');
		});
	});

	describe('Markdown V2 Validation', () => {
		test('should validate correct markdown', () => {
			const result = (TelegramMarkdownV2Parser as any).validateMarkdownV2('*bold* _italic_ `code`');
			expect(result.isValid).toBe(true);
			expect(result.errors).toHaveLength(0);
		});

		test('should detect unclosed formatting', () => {
			const result = (TelegramMarkdownV2Parser as any).validateMarkdownV2('*unclosed bold');
			expect(result.isValid).toBe(false);
			expect(result.errors.length).toBeGreaterThan(0);
		});

		test('should warn about potential issues', () => {
			const result = (TelegramMarkdownV2Parser as any).validateMarkdownV2('[link without url]');
			expect(result.warnings.length).toBeGreaterThan(0);
		});
	});
});
