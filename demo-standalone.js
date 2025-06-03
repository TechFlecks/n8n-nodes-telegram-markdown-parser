#!/usr/bin/env node

/**
 * TechFlecks Telegram Markdown Parser - Standalone Demo
 *
 * Copyright © 2025 TechFlecks Technologies
 * Licensed under TechFlecks Software License Agreement v1.0
 *
 * This standalone demo shows how to use the TechFlecks Telegram Markdown Parser
 * as a standalone library without n8n. Run with: npm run demo-standalone
 *
 * For license terms, see LICENSE.md
 * Contact: support@techflecks.com
 */

const TelegramMarkdownParser = require('./dist/nodes/TelegramMarkdownParser/TelegramMarkdownParser.node.js').TelegramMarkdownParser;

console.log('🔧 TechFlecks Telegram Markdown Parser - Standalone Usage Demo');
console.log('=================================================================');
console.log();

console.log('📋 This demo shows how to use the parser as a standalone library');
console.log('   (without n8n workflow engine)');
console.log();

// Available static methods
console.log('🛠️  Available Static Methods:');
console.log('----------------------------------------');
const methods = [
    'convertToTelegramMarkdownV2',
    'convertHtmlToTelegramMd',
    'escapeForTelegram',
    'validateTelegramMarkdown',
    'escapeSpecialCharactersOnly'
];

methods.forEach((method, index) => {
    console.log((index + 1) + '. TelegramMarkdownParser.' + method + '()');
});
console.log();

// Example 1: Direct markdown conversion
console.log('📝 Example 1: Direct Markdown Conversion');
console.log('--------------------------------------------------');

const markdownText = '# TechFlecks Newsletter\n\n## This Week\'s Updates\n\nWe\'re excited to share **major improvements** to our platform:\n\n### New Features\n- *Enhanced security* with multi-factor authentication\n- **Real-time notifications** for critical events\n- ~~Legacy dashboard~~ replaced with modern interface\n- Advanced `API endpoints` for developers\n\n*Questions? Email us at support@techflecks.com*';

console.log('🔤 Original Markdown:');
console.log(markdownText);
console.log();

const convertedMarkdown = TelegramMarkdownParser.convertToTelegramMarkdownV2(markdownText);
console.log('📱 Telegram MarkdownV2 Output:');
console.log(convertedMarkdown);
console.log();

// Example 2: HTML conversion
console.log('🌐 Example 2: HTML to Telegram Conversion');
console.log('--------------------------------------------------');

const htmlText = '<h1>🎉 Black Friday Sale!</h1>\n<p>Get <strong>70% OFF</strong> on all <em>TechFlecks Premium</em> plans!</p>\n<ul>\n<li><u>Priority support</u> (24/7 availability)</li>\n<li><code>Advanced API access</code> with higher limits</li>\n</ul>\n<p>🚀 <a href="https://techflecks.com/pricing">Upgrade Now</a></p>';

console.log('🏷️  Original HTML:');
console.log(htmlText);
console.log();

const convertedHtml = TelegramMarkdownParser.convertHtmlToTelegramMd(htmlText);
console.log('📱 Telegram MarkdownV2 Output:');
console.log(convertedHtml);
console.log();

// Example 3: Special character escaping
console.log('⚡ Example 3: Special Character Escaping');
console.log('--------------------------------------------------');

const textWithSpecialChars = 'System Alert: Database connection failed!\n\nError Details:\n- Server: db.techflecks.com:5432\n- Status: Connection timeout (30s)\n- Code: ECONNREFUSED\n\nActions Required:\n1. Check server status\n2. Contact DevOps: devops@techflecks.com';

console.log('⚠️  Original Text (with special characters):');
console.log(textWithSpecialChars);
console.log();

const escapedText = TelegramMarkdownParser.escapeForTelegram(textWithSpecialChars);
console.log('🔒 Escaped for Telegram:');
console.log(escapedText);
console.log();

// Example 4: Format validation
console.log('✅ Example 4: Format Validation');
console.log('--------------------------------------------------');

const validTelegramFormat = '*Welcome to TechFlecks\\!*\n\n_Thank you for choosing our platform\\._\n\nHere\'s what you can do:\n\\- Browse our __documentation__\n\\- Try our `sample code`\n\\- Contact support';

const invalidTelegramFormat = '*Unmatched bold formatting\n_Missing closing italic\n**Double asterisk bold**\nUnescaped special chars: . ! - ( )\n[Incomplete link](https://example';

console.log('✅ Testing Valid Format:');
console.log(validTelegramFormat.substring(0, 100) + '...');
console.log();

const validationResult = TelegramMarkdownParser.validateTelegramMarkdown(validTelegramFormat);
console.log('📊 Validation Result:');
console.log('   Valid: ' + (validationResult.isValid ? '✅' : '❌'));
console.log('   Errors: ' + validationResult.errors.length);
console.log('   Warnings: ' + validationResult.warnings.length);
console.log('   Suggestions: ' + validationResult.suggestions.length);
console.log();

console.log('❌ Testing Invalid Format:');
console.log(invalidTelegramFormat);
console.log();

const invalidValidationResult = TelegramMarkdownParser.validateTelegramMarkdown(invalidTelegramFormat);
console.log('📊 Validation Result:');
console.log('   Valid: ' + (invalidValidationResult.isValid ? '✅' : '❌'));
console.log('   Errors: ' + invalidValidationResult.errors.length);
console.log('   Warnings: ' + invalidValidationResult.warnings.length);
console.log('   Suggestions: ' + invalidValidationResult.suggestions.length);

if (invalidValidationResult.errors.length > 0) {
    console.log('   Error Details:');
    invalidValidationResult.errors.forEach((error, index) => {
        console.log('     ' + (index + 1) + '. ' + error);
    });
}
console.log();

// Example 5: Programmatic usage
console.log('💻 Example 5: Programmatic Usage in Your Code');
console.log('--------------------------------------------------');

console.log('// Import the parser');
console.log('const TelegramMarkdownParser = require(\'@techflecks/n8n-nodes-telegram-markdown-parser\');');
console.log();
console.log('// Convert markdown');
console.log('const telegramText = TelegramMarkdownParser.convertToTelegramMarkdownV2(\'**Hello** *world*!\');');
console.log();
console.log('// Escape special characters');
console.log('const safeText = TelegramMarkdownParser.escapeForTelegram(\'Price: $19.99!\');');
console.log();
console.log('// Validate format');
console.log('const validation = TelegramMarkdownParser.validateTelegramMarkdown(\'*bold* _italic_\');');
console.log();
console.log('// Use in your Telegram bot');
console.log('bot.sendMessage(chatId, telegramText, { parse_mode: \'MarkdownV2\' });');
console.log();

// Performance metrics
console.log('📈 Performance Metrics:');
console.log('------------------------------');

const performanceTests = [
    { name: 'Short text (50 chars)', text: '**Bold** *italic* text with `code` formatting.', iterations: 5000 },
    { name: 'Medium text (500 chars)', text: markdownText.substring(0, 500), iterations: 1000 },
    { name: 'Long text (1000+ chars)', text: markdownText + ' ' + htmlText, iterations: 500 }
];

performanceTests.forEach(testCase => {
    const startTime = process.hrtime.bigint();

    for (let i = 0; i < testCase.iterations; i++) {
        TelegramMarkdownParser.convertToTelegramMarkdownV2(testCase.text);
    }

    const endTime = process.hrtime.bigint();
    const totalTimeMs = Number(endTime - startTime) / 1_000_000;
    const avgTimeMs = totalTimeMs / testCase.iterations;
    const throughput = Math.round(1000 / avgTimeMs);

    console.log('📊 ' + testCase.name + ':');
    console.log('   ' + testCase.iterations + ' iterations in ' + totalTimeMs.toFixed(2) + 'ms');
    console.log('   Average: ' + avgTimeMs.toFixed(3) + 'ms per conversion');
    console.log('   Throughput: ' + throughput.toLocaleString() + ' conversions/second');
    console.log();
});

console.log('🎯 Summary:');
console.log('--------------------');
console.log('✅ TechFlecks Telegram Markdown Parser provides:');
console.log('   • Fast and reliable markdown conversion');
console.log('   • Comprehensive HTML support');
console.log('   • Safe character escaping for Telegram');
console.log('   • Detailed format validation');
console.log('   • High-performance processing');
console.log();

console.log('📦 Installation:');
console.log('   npm install @techflecks/n8n-nodes-telegram-markdown-parser');
console.log();

console.log('🔗 Resources:');
console.log('   📚 Documentation: https://github.com/TechFlecks/n8n-nodes-telegram-markdown-parser');
console.log('   🐛 Issues: https://github.com/TechFlecks/n8n-nodes-telegram-markdown-parser/issues');
console.log('   📧 Support: support@techflecks.com');
console.log('   🌐 Website: https://www.techflecks.com');
console.log();

console.log('🎉 Standalone demo completed!');
console.log('💡 Try the interactive demo: npm run demo');
