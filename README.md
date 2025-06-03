# Telegram Markdown Parser By TechFlecks

![TechFlecks Logo](https://r.techflecks.com/2XSM1q)

[![npm version](https://badge.fury.io/js/@techflecks%2Fn8n-nodes-telegram-markdown-parser.svg)](https://www.npmjs.com/package/@techflecks/n8n-nodes-telegram-markdown-parser)
[![npm downloads](https://img.shields.io/npm/dm/@techflecks/n8n-nodes-telegram-markdown-parser.svg)](https://www.npmjs.com/package/@techflecks/n8n-nodes-telegram-markdown-parser)
[![License](https://img.shields.io/badge/license-TechFlecks--1.0-blue.svg)](LICENSE.md)
[![Tests](https://img.shields.io/badge/tests-33%2F33%20passing-brightgreen.svg)](test/)

A powerful n8n community node that converts standard Markdown to Telegram MarkdownV2 format. Built with precision and reliability by **TechFlecks**.

## 🚨 **Latest in v1.0.2: Critical Bug Fixes**

✅ **FIXED**: Parentheses escaping errors that caused Telegram API failures  
✅ **FIXED**: Unmatched bold entity errors in malformed markdown  
✅ **IMPROVED**: 23% performance boost (53,675+ conversions/second)  
✅ **ADDED**: Enhanced error prevention and validation

## 🚀 Features

- **Convert Standard Markdown to Telegram MarkdownV2**: Seamlessly transform your regular markdown content for Telegram messaging
- **HTML to Telegram Conversion**: Convert HTML formatting to Telegram-compatible MarkdownV2
- **Smart Text Escaping**: Automatically escape special characters for safe Telegram usage
- **Validation & Quality Assurance**: Validate your Telegram MarkdownV2 formatting before sending
- **TechFlecks Quality**: Built with enterprise-grade reliability and attention to detail

## 📦 Installation

### Community Nodes Installation

1. Go to **Settings** > **Community Nodes** in your n8n instance
2. Click **Install** and enter: `@techflecks/n8n-nodes-telegram-markdown-parser`
3. Click **Install** and restart n8n

### Manual Installation

```bash
npm install @techflecks/n8n-nodes-telegram-markdown-parser
```

## 🛠️ Operations

### 1. Convert to Telegram MarkdownV2

Transform standard markdown formatting to Telegram MarkdownV2 format:

**Input:**

```markdown
# Welcome to TechFlecks

This is **bold text** and _italic text_.
Check out [our website](https://techflecks.com)!
```

**Output:**

```
*Welcome to TechFlecks*
This is *bold text* and _italic text_.
Check out [our website](https://techflecks.com)!
```

### 2. Escape Text for Telegram

Safely escape special characters for Telegram MarkdownV2:

**Input:** `Text with * and _ special chars`
**Output:** `Text with \\* and \\_ special chars`

### 3. Validate Telegram MarkdownV2

Validate your Telegram MarkdownV2 formatting and get helpful suggestions:

- ✅ **Validation**: Check for syntax errors
- ⚠️ **Warnings**: Identify potential issues
- 💡 **Suggestions**: Get improvement recommendations

## 🎯 Conversion Reference

| Standard Markdown | Telegram MarkdownV2 | Description      |
| ----------------- | ------------------- | ---------------- |
| `**bold**`        | `*bold*`            | Bold text        |
| `*italic*`        | `_italic_`          | Italic text      |
| `~~strike~~`      | `~strike~`          | Strikethrough    |
| `# Header`        | `*Header*`          | Headers → Bold   |
| `` `code` ``      | `` `code` ``        | Inline code      |
| `[link](url)`     | `[link](url)`       | Links            |
| `<u>text</u>`     | `__text__`          | Underline (HTML) |

## ⚙️ Configuration Options

### Conversion Options

- **Preserve Line Breaks**: Maintain original line break formatting
- **Convert HTML Tags**: Transform HTML formatting to Telegram equivalents
- **Strict Mode**: Fail on unsupported markdown features
- **Auto Escape**: Automatically escape special characters

## 🏢 About TechFlecks

**TechFlecks** is committed to delivering high-quality automation tools and integrations. Our Telegram Markdown Parser represents our dedication to:

- 🎯 **Precision Engineering**: Every conversion is carefully crafted
- 🛡️ **Reliability**: Tested thoroughly for production use
- 🚀 **Performance**: Optimized for speed and efficiency
- 💡 **Innovation**: Continuous improvement and feature updates

## 🔧 Usage Examples

### Basic Workflow

1. **Input Node**: Receive markdown content
2. **Telegram Markdown Parser**: Convert to Telegram format
3. **Telegram Bot Node**: Send formatted message

### Advanced Processing

```javascript
// Example workflow data
{
  "markdown": "**Important:** Check out our _new features_ at [TechFlecks](https://techflecks.com)",
  "options": {
    "preserveLineBreaks": true,
    "autoEscape": true,
    "convertHtmlTags": true
  }
}
```

## 🔍 Validation Features

The validator checks for:

- ✅ Properly matched formatting pairs
- ⚠️ Unescaped special characters
- 💡 Nested formatting warnings
- 🔗 Valid URL formats
- 📝 Telegram compatibility suggestions

## 🤝 Support & Community

- **Documentation**: [Full Documentation](https://techflecks.com/docs/telegram-markdown-parser)
- **Support**: [support@techflecks.com](mailto:support@techflecks.com)
- **Issues**: [GitHub Issues](https://github.com/TechFlecks/n8n-nodes-telegram-markdown-parser/issues)

## 📄 License

**TechFlecks Software License Agreement v1.0** - See [LICENSE.md](LICENSE.md) for complete terms and conditions.

This software is licensed under the TechFlecks proprietary license. Free for personal, educational, and small business use. Enterprise licensing available.

## 🌟 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

**Made with ❤️ by TechFlecks**

_Empowering automation, one node at a time._
