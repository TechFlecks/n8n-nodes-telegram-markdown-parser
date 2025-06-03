#!/usr/bin/env node

/**
 * TechFlecks Telegram Markdown Parser - Interactive Demo
 *
 * Copyright © 2025 TechFlecks Technologies
 * Licensed under TechFlecks Software License Agreement v1.0
 *
 * This demo showcases the main functionality of the TechFlecks Telegram Markdown Parser
 * in an interactive format. Run with: npm run demo
 *
 * For license terms, see LICENSE.md
 * Contact: support@techflecks.com
 */

const TelegramMarkdownParser = require('./dist/nodes/TelegramMarkdownParser/TelegramMarkdownParser.node.js').TelegramMarkdownParser;

console.log('🎯 TechFlecks Telegram Markdown Parser - Interactive Demo');
console.log('================================================================');
console.log();

// Display node information
try {
    const nodeInstance = new TelegramMarkdownParser();
    console.log('📋 Node Information:');
    console.log('   Name: ' + nodeInstance.description.displayName);
    console.log('   Version: ' + nodeInstance.description.version);
    console.log('   Operations: ' + nodeInstance.description.properties.find(p => p.name === 'operation').options.length);
    console.log();
} catch (error) {
    console.log('⚠️  Node instantiation info not available in demo mode');
    console.log();
}

// Demo scenarios
const scenarios = [
    {
        title: '📝 Basic Markdown Conversion',
        description: 'Convert standard markdown to Telegram MarkdownV2 format',
        input: 'This is **bold text**, *italic text*, and `inline code`.',
        method: 'convertToTelegramMarkdownV2'
    },
    {
        title: '🔗 Complex Formatting',
        description: 'Handle links, headers, and mixed formatting',
        input: '# Welcome to TechFlecks!\n\nVisit our [website](https://techflecks.com) for more info.\n\nFeatures:\n- **Fast processing**\n- *Easy integration*\n- ~~No complex setup~~',
        method: 'convertToTelegramMarkdownV2'
    },
    {
        title: '⚡ Special Character Escaping',
        description: 'Safely escape special characters for Telegram',
        input: 'Price: $19.99! Contact us at: support@techflecks.com (24/7)',
        method: 'escapeForTelegram'
    },
    {
        title: '✅ Format Validation',
        description: 'Validate existing Telegram MarkdownV2 format',
        input: '*Welcome to TechFlecks\\!* _Thank you for using our service\\._',
        method: 'validateTelegramMarkdown'
    }
];

// Process each demo scenario
console.log('🚀 Running Demo Scenarios:');
console.log();

scenarios.forEach((scenario, index) => {
    console.log((index + 1) + '. ' + scenario.title);
    console.log('   ' + scenario.description);
    console.log('   ' + '-'.repeat(50));

    console.log('   📥 INPUT:');
    console.log('   "' + scenario.input.substring(0, 100) + (scenario.input.length > 100 ? '..."' : '"'));
    console.log();

    try {
        let result;

        switch (scenario.method) {
            case 'convertToTelegramMarkdownV2':
                result = TelegramMarkdownParser.convertToTelegramMarkdownV2(scenario.input);
                console.log('   📤 TELEGRAM OUTPUT:');
                console.log('   "' + result.substring(0, 100) + (result.length > 100 ? '..."' : '"'));
                break;

            case 'escapeForTelegram':
                result = TelegramMarkdownParser.escapeForTelegram(scenario.input);
                console.log('   📤 ESCAPED OUTPUT:');
                console.log('   "' + result + '"');
                break;

            case 'validateTelegramMarkdown':
                result = TelegramMarkdownParser.validateTelegramMarkdown(scenario.input);
                console.log('   📤 VALIDATION RESULT:');
                console.log('   Valid: ' + (result.isValid ? '✅' : '❌'));
                console.log('   Errors: ' + result.errors.length);
                console.log('   Warnings: ' + result.warnings.length);
                break;
        }

        console.log('   ✅ Success');

    } catch (error) {
        console.log('   ❌ Error: ' + error.message);
    }

    console.log();
});

// Performance demonstration
console.log('⚡ Performance Demonstration:');
console.log('----------------------------------------');

const perfTestText = '**Performance test** with *various* `formatting` and [links](https://techflecks.com).';
const iterations = 1000;

console.log('Testing ' + iterations + ' conversions...');

const startTime = process.hrtime.bigint();
for (let i = 0; i < iterations; i++) {
    TelegramMarkdownParser.convertToTelegramMarkdownV2(perfTestText);
}
const endTime = process.hrtime.bigint();

const totalTimeMs = Number(endTime - startTime) / 1_000_000;
const avgTimeMs = totalTimeMs / iterations;
const throughput = Math.round(1000 / avgTimeMs);

console.log('✅ Completed ' + iterations + ' conversions in ' + totalTimeMs.toFixed(2) + 'ms');
console.log('📊 Average time: ' + avgTimeMs.toFixed(3) + 'ms per conversion');
console.log('🚀 Throughput: ' + throughput.toLocaleString() + ' conversions/second');
console.log();

// Usage instructions
console.log('📚 Usage Instructions:');
console.log('----------------------------------------');
console.log('1. Install in your n8n instance');
console.log('2. Add the "Telegram Markdown Parser By TechFlecks" node');
console.log('3. Choose your operation:');
console.log('   • Convert Text - Standard markdown to Telegram MarkdownV2');
console.log('   • Escape Text - Escape special characters for Telegram');
console.log('   • Validate Format - Check Telegram MarkdownV2 validity');
console.log('4. Connect to your Telegram bot workflow');
console.log();

console.log('🎉 Demo completed! TechFlecks Telegram Markdown Parser is ready to use.');
console.log('💡 For more examples, check the examples/ folder or run: npm run demo-standalone');
console.log();
console.log('🔗 Learn more: https://github.com/TechFlecks/n8n-nodes-telegram-markdown-parser');
console.log('📧 Support: support@techflecks.com');
