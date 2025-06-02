#!/usr/bin/env node

/**
 * Demo script for TechFlecks n8n Telegram Markdown V2 Parser
 * This script demonstrates the core functionality of the parser
 */

// Note: This is a demo script - in actual n8n usage, the node handles this automatically
const { TelegramMarkdownV2Parser } = require('./dist/index.js');

console.log('🚀 TechFlecks n8n Telegram Markdown V2 Parser Demo\n');
console.log('================================================\n');

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
        const htmlResult = TelegramMarkdownV2Parser.parseMarkdownV2ToHtml(sample.text);
        console.log(`🌐 HTML: ${htmlResult}`);
        
        // Parse to plain text
        const plainResult = TelegramMarkdownV2Parser.parseMarkdownV2ToPlainText(sample.text);
        console.log(`📄 Plain: ${plainResult}`);
        
        // Validate
        const validation = TelegramMarkdownV2Parser.validateMarkdownV2(sample.text);
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
const escapedText = TelegramMarkdownV2Parser.escapeMarkdownV2(unsafeText);
console.log(`📝 Unsafe: ${unsafeText}`);
console.log(`🛡️  Escaped: ${escapedText}`);

// Validate the escaped text
const escapedValidation = TelegramMarkdownV2Parser.validateMarkdownV2(escapedText);
console.log(`✅ Escaped is valid: ${escapedValidation.isValid}`);

console.log('\n\n🎉 Demo completed! This package is ready for use in n8n workflows.');
console.log('\n📚 For more examples, check the examples/ directory');
console.log('🔗 GitHub: https://github.com/TechFlecks/n8n-nodes-telegram-markdownv2-parser');
console.log('💼 Company: TechFlecks - Make by You Product Suite');
