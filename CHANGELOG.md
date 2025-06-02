# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-06-02

### Added

- Initial release of TechFlecks n8n Telegram Markdown V2 Parser
- Parse Telegram Markdown V2 to HTML functionality
- Parse Telegram Markdown V2 to plain text functionality
- Escape text for safe Markdown V2 usage functionality
- Validate Markdown V2 syntax with detailed error reporting
- Support for all Telegram formatting elements:
  - Bold text (`*bold*` or `**bold**`)
  - Italic text (`_italic_` or `__italic__`)
  - Underline (`~underline~`)
  - Strikethrough (`~~strikethrough~~`)
  - Inline code (`` `code` ``)
  - Code blocks (` ```language\ncode\n``` `)
  - Links (`[text](url)`)
  - User mentions (`[text](tg://user?id=123)`)
  - Spoilers (`||spoiler||`)
  - Escaped characters (`\*`, `\_`, etc.)
- Custom entity mapping support
- Comprehensive test suite with 80%+ coverage
- TypeScript support with strict type checking
- ESLint and Prettier configuration
- Complete documentation and examples
- MIT license

### Features

- **High Performance**: Optimized parsing algorithms
- **Flexible Options**: Configurable whitespace handling and tag stripping
- **Error Handling**: Robust error handling with meaningful messages
- **Validation**: Syntax validation with detailed error and warning reporting
- **Extensible**: Custom entity mapping for specialized use cases

### Technical Details

- Built with TypeScript 5.2+
- Compatible with n8n 1.11.0+
- Requires Node.js 18+
- Full Jest test coverage
- ESLint + Prettier code quality tools
- Follows n8n community node standards
