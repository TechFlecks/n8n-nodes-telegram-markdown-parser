#!/usr/bin/env node

/**
 * Standalone Demo script for TechFlecks n8n Telegram Markdown V2 Parser
 * This script demonstrates the core functionality without n8n dependencies
 */

console.log('🚀 TechFlecks n8n Telegram Markdown V2 Parser Demo\n');
console.log('================================================\n');

// Inline parser implementation for demo purposes
class MarkdownV2Parser {
    static parseMarkdownV2ToHtml(text, options = {}) {
        let html = text;

        // Handle bold text: *bold* or **bold**
        html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');

        // Handle italic text: _italic_ or __italic__
        html = html.replace(/__([^_]+)__/g, '<em>$1</em>');
        html = html.replace(/_([^_]+)_/g, '<em>$1</em>');

        // Handle underline text: __underline__
        html = html.replace(/__(.*?)__/g, '<u>$1</u>');

        // Handle strikethrough text: ~~strikethrough~~
        html = html.replace(/~~(.*?)~~/g, '<del>$1</del>');

        // Handle inline code: `code`
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

        // Handle code blocks: ```language\ncode\n```
        html = html.replace(/```(\w+)?\n?([\s\S]*?)```/g, '<pre><code>$2</code></pre>');

        // Handle links: [text](url)
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

        // Handle spoilers: ||spoiler||
        html = html.replace(/\|\|([^|]+)\|\|/g, '<span class="spoiler">$1</span>');

        return html;
    }

    static parseMarkdownV2ToPlainText(text, options = {}) {
        let plain = text;

        // Remove all markdown formatting
        plain = plain.replace(/\*\*([^*]+)\*\*/g, '$1');
        plain = plain.replace(/\*([^*]+)\*/g, '$1');
        plain = plain.replace(/__([^_]+)__/g, '$1');
        plain = plain.replace(/_([^_]+)_/g, '$1');
        plain = plain.replace(/~~(.*?)~~/g, '$1');
        plain = plain.replace(/`([^`]+)`/g, '$1');
        plain = plain.replace(/```[\s\S]*?```/g, '[code block]');
        plain = plain.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
        plain = plain.replace(/\|\|([^|]+)\|\|/g, '$1');

        return plain;
    }

    static escapeMarkdownV2(text) {
        const specialChars = /([*_`\[\]()~>#+\-=|{}.!\\])/g;
        return text.replace(specialChars, '\\$1');
    }

    static validateMarkdownV2(text) {
        const errors = [];
        const warnings = [];

        // Check for unmatched asterisks
        const asteriskCount = (text.match(/\*/g) || []).length;
        if (asteriskCount % 2 !== 0) {
            errors.push('Unmatched asterisks for bold formatting');
        }

        // Check for unmatched underscores
        const underscoreCount = (text.match(/_/g) || []).length;
        if (underscoreCount % 2 !== 0) {
            errors.push('Unmatched underscores for italic formatting');
        }

        // Check for unmatched backticks
        const backtickCount = (text.match(/`/g) || []).length;
        if (backtickCount % 2 !== 0) {
            errors.push('Unmatched backticks for code formatting');
        }

        // Check for unescaped special characters
        const unescapedChars = text.match(/[*_`\[\]()~>#+\-=|{}.!\\]/g);
        if (unescapedChars && unescapedChars.length > 0) {
            warnings.push('Text contains special characters that may need escaping');
        }

        return {
            isValid: errors.length === 0,
            errors,
            warnings,
        };
    }
}

// Sample Markdown V2 texts for demonstration
const samples = [
    {
        name: 'Basic Formatting',
        text: '*Bold text* and _italic text_ with `inline code`'
    },
    {
        name: 'Complex Formatting',
        text: '*Welcome* to __TechFlecks__! Check out our [website](https://techflecks.com) for ||secret deals||'
    },
    {
        name: 'Code Block',
        text: 'Here is some code:\n```javascript\nconsole.log("Hello Make by You!");\n```'
    },
    {
        name: 'Mixed Content',
        text: '~~Old price: $19.99~~ *New price: $9.99* - Use code `SAVE10` for extra discount!'
    },
    {
        name: 'Special Characters (needs escaping)',
        text: 'Price: $10.99 (includes * and _ characters)'
    }
];

// Demonstrate each operation
samples.forEach((sample, index) => {
    console.log(`\n${index + 1}. ${sample.name}`);
    console.log('━'.repeat(50));
    console.log(`📝 Original: ${sample.text}`);
    
    try {
        // Parse to HTML
        const htmlResult = MarkdownV2Parser.parseMarkdownV2ToHtml(sample.text);
        console.log(`🌐 HTML: ${htmlResult}`);
        
        // Parse to plain text
        const plainResult = MarkdownV2Parser.parseMarkdownV2ToPlainText(sample.text);
        console.log(`📄 Plain: ${plainResult}`);
        
        // Validate
        const validation = MarkdownV2Parser.validateMarkdownV2(sample.text);
        console.log(`✅ Valid: ${validation.isValid}`);
        if (validation.errors.length > 0) {
            console.log(`❌ Errors: ${validation.errors.join(', ')}`);
        }
        if (validation.warnings.length > 0) {
            console.log(`⚠️  Warnings: ${validation.warnings.join(', ')}`);
        }
        
    } catch (error) {
        console.log(`❌ Error: ${error.message}`);
    }
});

// Demonstrate escaping
console.log('\n\n6. Escaping Demo');
console.log('━'.repeat(50));
const unsafeText = samples[4].text; // The special characters sample
const escapedText = MarkdownV2Parser.escapeMarkdownV2(unsafeText);
console.log(`📝 Unsafe: ${unsafeText}`);
console.log(`🛡️  Escaped: ${escapedText}`);

// Validate the escaped text
const escapedValidation = MarkdownV2Parser.validateMarkdownV2(escapedText);
console.log(`✅ Escaped is valid: ${escapedValidation.isValid}`);

console.log('\n\n🎉 Demo completed! This package is ready for use in n8n workflows.');
console.log('\n📚 For more examples, check the examples/ directory');
console.log('🔗 GitHub: https://github.com/TechFlecks/n8n-nodes-telegram-markdownv2-parser');
console.log('💼 Company: TechFlecks - Make by You Product Suite');
