# 🚀 TechFlecks Telegram Markdown Parser v1.0.2

## 🐛 **Critical Bug Fix Release - GitHub Issues Resolved!**

Version 1.0.2 is a critical bug fix release that resolves major Telegram API parsing errors and significantly improves the reliability of the parser. This release addresses community-reported issues and enhances overall functionality.

---

## 📦 **Installation**

### Via n8n Community Nodes

1. Go to **Settings** > **Community Nodes** in your n8n instance
2. Click **Install** and enter: `@techflecks/n8n-nodes-telegram-markdown-parser`
3. Click **Install** and restart n8n

### Via npm

```bash
npm install @techflecks/n8n-nodes-telegram-markdown-parser@1.0.2
```

---

## 🔧 **Critical Fixes in v1.0.2**

### 🐛 **GitHub Issue #1: Parentheses Escaping Error**

- **Problem**: `"Bad Request: can't parse entities: Character '(' is reserved and must be escaped with the preceding '\'"`
- **Solution**: ✅ **FIXED** - Enhanced parentheses escaping logic
- **Impact**: Prevents Telegram API errors when text contains parentheses

### 🐛 **GitHub Issue #2: Unmatched Bold Entity Error**

- **Problem**: `"Bad Request: can't parse entities: Can't find end of Bold entity at byte offset 346"`
- **Solution**: ✅ **FIXED** - Added preprocessing for unmatched asterisks
- **Impact**: Handles malformed markdown gracefully without breaking Telegram parsing

### 🔍 **Missing Question Mark Escaping**

- **Problem**: Question marks (?) were not being escaped, causing parsing errors
- **Solution**: ✅ **FIXED** - Added question mark to special character escaping
- **Impact**: Comprehensive special character handling

---

## ✨ **New Features & Improvements**

### 🛡️ **Enhanced Error Prevention**

- **Pre-processing Engine**: New `preProcessText()` method validates and fixes common issues
- **Smart Link Protection**: Preserves valid markdown links while escaping other parentheses
- **Unmatched Marker Detection**: Automatically detects and handles unmatched formatting markers

### 🧪 **Expanded Test Coverage**

- **5 New GitHub Issue Tests**: Specific tests for community-reported issues
- **Total Tests**: 33 unit tests (previously 28)
- **Success Rate**: 100% pass rate
- **New Test Categories**:
  - Parentheses escaping validation
  - Unmatched bold entity handling
  - Mixed formatting scenarios
  - Link preservation tests

### ⚡ **Performance Improvements**

- **Throughput**: 53,675+ conversions/second (improved from 43,684)
- **Average Processing**: 0.019ms per conversion
- **Efficiency Gain**: ~23% performance improvement

---

## 🧪 **Verified Quality Metrics**

- **✅ Tests:** 33/33 passing (100% success rate)
- **⚡ Performance:** 53,675+ conversions per second
- **🔒 Security:** No vulnerabilities detected
- **📜 License:** Full TechFlecks compliance
- **🌐 Compatibility:** Node.js 20.15+ across all platforms
- **🐛 Bug Fixes:** All critical GitHub issues resolved

---

## 📋 **What's Tested**

### Core Functionality

- ✅ Standard Markdown to Telegram MarkdownV2 conversion
- ✅ HTML tags to Telegram MarkdownV2 conversion
- ✅ Special character escaping for Telegram
- ✅ Format validation and error detection

### Advanced Features

- ✅ Complex real-world markdown handling
- ✅ Link preservation during escaping
- ✅ Unmatched formatting marker detection
- ✅ Mixed formatting scenarios
- ✅ Error handling for edge cases

### GitHub Issues Validation

- ✅ Issue #1: Parentheses escaping (RESOLVED)
- ✅ Issue #2: Unmatched bold entities (RESOLVED)
- ✅ Question mark escaping (RESOLVED)
- ✅ Mixed formatting preservation (VERIFIED)
- ✅ Link protection during escaping (VERIFIED)

---

## 🔄 **Migration from v1.0.1**

No breaking changes! This is a drop-in replacement:

```bash
npm update @techflecks/n8n-nodes-telegram-markdown-parser
```

All existing workflows will continue to work, but with improved reliability and bug fixes.

---

## 🌟 **What's Next**

- **Community Feedback**: Continue addressing user-reported issues
- **Performance Optimization**: Further speed improvements
- **Feature Enhancements**: Based on user requests
- **Documentation**: Expanded examples and use cases

---

## 📞 **Support & Links**

- **NPM Package**: https://www.npmjs.com/package/@techflecks/n8n-nodes-telegram-markdown-parser
- **GitHub Repository**: https://github.com/TechFlecks/n8n-nodes-telegram-markdown-parser
- **Issues & Bug Reports**: https://github.com/TechFlecks/n8n-nodes-telegram-markdown-parser/issues
- **TechFlecks Support**: support@techflecks.com

---

## 🎯 **TechFlecks Commitment**

This release demonstrates TechFlecks' commitment to:

- ⚡ **Rapid Response** to community issues
- 🔧 **Quality Fixes** that address root causes
- 🧪 **Comprehensive Testing** for reliability
- 📈 **Continuous Improvement** in performance

---

_Released on June 3, 2025_  
_Built with ❤️ by TechFlecks Team_
