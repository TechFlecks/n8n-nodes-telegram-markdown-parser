#!/usr/bin/env node

/**
 * TechFlecks License Validation Script
 *
 * Copyright © 2025 TechFlecks
 * Licensed under TechFlecks Software License Agreement v1.0
 *
 * This script checks that all source files contain proper TechFlecks license headers
 *
 * For license terms, see LICENSE.md
 * Contact: support@techflecks.com
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_COPYRIGHT = 'Copyright © 2025 TechFlecks';
const REQUIRED_LICENSE = 'TechFlecks Software License Agreement v1.0';

// Files that should have license headers
const filesToCheck = [
    'nodes/TelegramMarkdownParser/TelegramMarkdownParser.node.ts',
    'demo.js',
    'demo-standalone.js',
    'index.js',
    'test/TelegramMarkdownParser.test.ts'
];

console.log('🔍 TechFlecks License Validation');
console.log('================================');
console.log();

let allValid = true;

filesToCheck.forEach(filePath => {
    console.log(`📄 Checking: ${filePath}`);

    try {
        const fullPath = path.join(__dirname, filePath);
        const content = fs.readFileSync(fullPath, 'utf8');

        const hasCopyright = content.includes(REQUIRED_COPYRIGHT);
        const hasLicense = content.includes(REQUIRED_LICENSE);

        if (hasCopyright && hasLicense) {
            console.log('   ✅ Valid license header');
        } else {
            console.log('   ❌ Missing license information:');
            if (!hasCopyright) console.log('      - Missing copyright notice');
            if (!hasLicense) console.log('      - Missing license reference');
            allValid = false;
        }
    } catch (error) {
        console.log(`   ⚠️  Could not read file: ${error.message}`);
        allValid = false;
    }

    console.log();
});

// Check key documentation files
const docFiles = [
    'LICENSE.md',
    'LICENSE-SUMMARY.md',
    'README.md',
    'CONTRIBUTING.md'
];

console.log('📚 Checking Documentation Files:');
console.log('----------------------------------');

docFiles.forEach(filePath => {
    console.log(`📄 Checking: ${filePath}`);

    try {
        const fullPath = path.join(__dirname, filePath);
        const content = fs.readFileSync(fullPath, 'utf8');

        const hasTechFlecks = content.includes('TechFlecks');
        const hasLicense = content.includes('License');

        if (hasTechFlecks && hasLicense) {
            console.log('   ✅ Contains TechFlecks licensing information');
        } else {
            console.log('   ❌ Missing TechFlecks licensing information');
            allValid = false;
        }
    } catch (error) {
        console.log(`   ⚠️  Could not read file: ${error.message}`);
        allValid = false;
    }

    console.log();
});

console.log('🎯 Summary:');
console.log('-----------');

if (allValid) {
    console.log('✅ All files have proper TechFlecks license attribution');
    console.log('📝 License compliance: PASSED');
    process.exit(0);
} else {
    console.log('❌ Some files are missing proper license attribution');
    console.log('📝 License compliance: FAILED');
    console.log();
    console.log('💡 Next steps:');
    console.log('   1. Add license headers to flagged files');
    console.log('   2. Ensure all files reference TechFlecks Software License Agreement v1.0');
    console.log('   3. Run this script again to verify');
    console.log();
    console.log('📧 Contact: legal@techflecks.com for licensing questions');
    process.exit(1);
}
