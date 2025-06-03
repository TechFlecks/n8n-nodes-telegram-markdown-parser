/**
 * TechFlecks Telegram Markdown Parser - Test Suite
 *
 * Copyright © 2025 TechFlecks Technologies
 * Licensed under TechFlecks Software License Agreement v1.0
 *
 * For license terms, see LICENSE.md
 * Contact: support@techflecks.com
 */

import { TelegramMarkdownParser } from '../nodes/TelegramMarkdownParser/TelegramMarkdownParser.node';

describe('TelegramMarkdownParser by TechFlecks', () => {
	let parser: TelegramMarkdownParser;

	beforeEach(() => {
		parser = new TelegramMarkdownParser();
	});

	describe('Node Description', () => {
		test('should have correct node description', () => {
			expect(parser.description.displayName).toBe('Telegram Markdown Parser By TechFlecks');
			expect(parser.description.name).toBe('telegramMarkdownParser');
			expect(parser.description.group).toContain('transform');
		});

		test('should have all required operations', () => {
			const operations = parser.description.properties[0].options;
			expect(operations).toBeDefined();
			const operationValues = operations!.map((op: any) => op.value);

			expect(operationValues).toContain('convertToTelegramMd');
			expect(operationValues).toContain('escapeForTelegram');
			expect(operationValues).toContain('validateTelegramMd');
		});
	});

	describe('Standard Markdown to Telegram MarkdownV2 Conversion', () => {
		test('should convert bold text correctly', () => {
			const result = (TelegramMarkdownParser as any).convertToTelegramMarkdownV2('**bold text**');
			expect(result).toBe('*bold text*');
		});

		test('should convert italic text correctly', () => {
			const result = (TelegramMarkdownParser as any).convertToTelegramMarkdownV2('*italic text*');
			expect(result).toBe('_italic text_');
		});

		test('should convert strikethrough text correctly', () => {
			const result = (TelegramMarkdownParser as any).convertToTelegramMarkdownV2(
				'~~strikethrough~~',
			);
			expect(result).toBe('~strikethrough~');
		});

		test('should handle headers by converting to bold', () => {
			const result = (TelegramMarkdownParser as any).convertToTelegramMarkdownV2('# Header 1');
			expect(result).toBe('*Header 1*');
		});

		test('should preserve code blocks', () => {
			const result = (TelegramMarkdownParser as any).convertToTelegramMarkdownV2(
				'```javascript\nconsole.log("hello");\n```',
			);
			expect(result).toBe('```\nconsole.log("hello");\n```');
		});

		test('should handle complex formatting combinations', () => {
			const input = '**bold** and *italic* and ~~strikethrough~~';
			const result = (TelegramMarkdownParser as any).convertToTelegramMarkdownV2(input);
			expect(result).toBe('*bold* and _italic_ and ~strikethrough~');
		});

		test('should convert links correctly', () => {
			const result = (TelegramMarkdownParser as any).convertToTelegramMarkdownV2(
				'[Google](https://google.com)',
			);
			expect(result).toBe('[Google](https://google.com)');
		});
	});

	describe('HTML to Telegram MarkdownV2 Conversion', () => {
		test('should convert HTML bold tags', () => {
			const result = (TelegramMarkdownParser as any).convertToTelegramMarkdownV2(
				'<strong>bold</strong>',
				{ convertHtmlTags: true },
			);
			expect(result).toBe('*bold*');
		});

		test('should convert HTML italic tags', () => {
			const result = (TelegramMarkdownParser as any).convertToTelegramMarkdownV2(
				'<em>italic</em>',
				{ convertHtmlTags: true },
			);
			expect(result).toBe('_italic_');
		});

		test('should convert HTML underline tags', () => {
			const result = (TelegramMarkdownParser as any).convertToTelegramMarkdownV2(
				'<u>underline</u>',
				{ convertHtmlTags: true },
			);
			expect(result).toBe('__underline__');
		});

		test('should convert HTML code tags', () => {
			const result = (TelegramMarkdownParser as any).convertToTelegramMarkdownV2(
				'<code>code</code>',
				{ convertHtmlTags: true },
			);
			expect(result).toBe('`code`');
		});

		test('should convert HTML links', () => {
			const result = (TelegramMarkdownParser as any).convertToTelegramMarkdownV2(
				'<a href="https://example.com">Link</a>',
				{ convertHtmlTags: true },
			);
			expect(result).toBe('[Link](https://example.com)');
		});
	});

	describe('Text Escaping for Telegram', () => {
		test('should escape special characters', () => {
			const result = (TelegramMarkdownParser as any).escapeForTelegram('Text with * and _ and []');
			expect(result).toBe('Text with \\* and \\_ and \\[\\]');
		});

		test('should escape all Telegram special characters', () => {
			const specialText = '_*[]()~`>#+=-|{}.!\\';
			const result = (TelegramMarkdownParser as any).escapeForTelegram(specialText);
			expect(result).toBe('\\_\\*\\[\\]\\(\\)\\~\\`\\>\\#\\+\\=\\-\\|\\{\\}\\.\\!\\\\');
		});

		test('should not double-escape already escaped characters', () => {
			const result = (TelegramMarkdownParser as any).escapeForTelegram('Already \\*escaped\\*');
			expect(result).toBe('Already \\\\\\*escaped\\\\\\*');
		});
	});

	describe('Telegram MarkdownV2 Validation', () => {
		test('should validate correct formatting', () => {
			const result = (TelegramMarkdownParser as any).validateTelegramMarkdown(
				'*bold* and _italic_',
			);
			expect(result.isValid).toBe(true);
			expect(result.errors).toHaveLength(0);
		});

		test('should detect unmatched bold formatting', () => {
			const result = (TelegramMarkdownParser as any).validateTelegramMarkdown('*unmatched bold');
			expect(result.isValid).toBe(false);
			expect(result.errors.length).toBeGreaterThan(0);
		});

		test('should detect unescaped special characters', () => {
			const result = (TelegramMarkdownParser as any).validateTelegramMarkdown(
				'Text with unescaped * character',
			);
			expect(result.warnings.length).toBeGreaterThan(0);
		});

		test('should provide suggestions for improvement', () => {
			const result = (TelegramMarkdownParser as any).validateTelegramMarkdown('*bold* _italic_');
			expect(result.suggestions.length).toBeGreaterThan(0);
			expect(result.suggestions.some((s: string) => s.includes('TechFlecks'))).toBe(true);
		});

		test('should validate link formats', () => {
			const result = (TelegramMarkdownParser as any).validateTelegramMarkdown(
				'[Link](invalid-url)',
			);
			expect(result.warnings.some((w: string) => w.includes('invalid URL'))).toBe(true);
		});

		test('should accept valid URLs', () => {
			const result = (TelegramMarkdownParser as any).validateTelegramMarkdown(
				'[Link](https://example.com)',
			);
			expect(result.warnings.filter((w: string) => w.includes('invalid URL'))).toHaveLength(0);
		});
	});

	describe('Integration Tests', () => {
		test('should handle complex real-world markdown', () => {
			const complexMarkdown = `
# Main Title
This is **bold text** and *italic text*.

## Subsection
- List item with ~~strikethrough~~
- Another item with \`inline code\`

\`\`\`javascript
function hello() {
    console.log("Hello World!");
}
\`\`\`

Check out [this link](https://techflecks.com)!
`;
			const result = (TelegramMarkdownParser as any).convertToTelegramMarkdownV2(complexMarkdown);
			expect(result).toContain('*Main Title*');
			expect(result).toContain('*bold text*');
			expect(result).toContain('_italic text_');
			expect(result).toContain('~strikethrough~');
			expect(result).toContain('```\nfunction hello()');
		});

		test('should maintain TechFlecks branding in results', () => {
			const result = (TelegramMarkdownParser as any).validateTelegramMarkdown('*test*');
			expect(result.suggestions.some((s: string) => s.includes('TechFlecks'))).toBe(true);
		});
	});

	describe('Error Handling', () => {
		test('should handle empty input gracefully', () => {
			const result = (TelegramMarkdownParser as any).convertToTelegramMarkdownV2('');
			expect(result).toBe('');
		});

		test('should handle null/undefined input', () => {
			expect(() => {
				(TelegramMarkdownParser as any).convertToTelegramMarkdownV2(null);
			}).not.toThrow();
		});

		test('should validate empty text without errors', () => {
			const result = (TelegramMarkdownParser as any).validateTelegramMarkdown('');
			expect(result.isValid).toBe(true);
		});
	});

	describe('GitHub Issues Fixes', () => {
		test('should fix Issue #1: Escape parentheses correctly', () => {
			// Test case based on Issue #1: "Character '(' is reserved and must be escaped"
			const problematicText =
				"Since you mentioned AI, let's dive a little deeper. To give you the most relevant information, could you tell me what aspects of AI are most interesting to you? For example, are you curious about:\n\n*   *Specific AI applications?* (e.g., chatbots, image recognition, predictive analytics)\n*   *The types of AI services we offer?* (e.g., custom model development, AI integration)\n*   *How AI can benefit your particular industry or business?*";

			const result = (TelegramMarkdownParser as any).convertToTelegramMarkdownV2(problematicText);

			// Check that all parentheses are escaped
			expect(result).toContain('\\(e\\.g\\.');
			expect(result).toContain('\\)');
			// Check that question marks are escaped
			expect(result).toContain('\\?');
			// Check that the result doesn't break Telegram parsing (no unescaped special chars)
			expect(result).not.toMatch(/(?<!\\)[()]/);
		});

		test('should fix Issue #2: Handle unmatched bold entities', () => {
			// Test case for Issue #2: "Can't find end of Bold entity"
			const textWithUnmatchedAsterisk =
				'This text has an unmatched * asterisk that should be escaped';

			const result = (TelegramMarkdownParser as any).convertToTelegramMarkdownV2(
				textWithUnmatchedAsterisk,
			);

			// The unmatched asterisk should be escaped
			expect(result).toContain('\\*');
			expect(result).not.toMatch(/(?<!\\)\*(?!\*)/); // No unescaped single asterisks
		});

		test('should handle mixed formatting and special characters', () => {
			const complexText =
				'**Bold text** with (parentheses) and *italic* text. Also has! special? characters.';

			const result = (TelegramMarkdownParser as any).convertToTelegramMarkdownV2(complexText);

			// Bold should be converted
			expect(result).toContain('*Bold text*');
			// Italic should be converted
			expect(result).toContain('_italic_');
			// Parentheses should be escaped
			expect(result).toContain('\\(parentheses\\)');
			// Special chars should be escaped
			expect(result).toContain('\\!');
			expect(result).toContain('\\?');
		});

		test('should validate and detect formatting issues', () => {
			const invalidText = 'This has unmatched * bold and (unescaped) parentheses';

			const validation = (TelegramMarkdownParser as any).validateTelegramMarkdown(invalidText);

			expect(validation.isValid).toBe(false);
			expect(validation.errors.length).toBeGreaterThan(0);
			expect(validation.errors.some((error: string) => error.includes('asterisk'))).toBe(true);
		});

		test('should preserve valid markdown links while escaping other parentheses', () => {
			const textWithLinks =
				'Check out [Google](https://google.com) and also (other parentheses) that need escaping.';

			const result = (TelegramMarkdownParser as any).convertToTelegramMarkdownV2(textWithLinks);

			// Valid markdown link should be preserved
			expect(result).toContain('[Google](https://google.com)');
			// Other parentheses should be escaped
			expect(result).toContain('\\(other parentheses\\)');
		});
	});
});
