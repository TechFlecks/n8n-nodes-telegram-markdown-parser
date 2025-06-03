# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2025-06-03

### Fixed

- **CRITICAL**: Fixed parentheses escaping error that caused Telegram API "Character '(' is reserved and must be escaped" errors (GitHub Issue #1)
- **CRITICAL**: Fixed unmatched bold entity error that caused "Can't find end of Bold entity at byte offset" errors (GitHub Issue #2)
- Added missing question mark (?) escaping to special character handling
- Enhanced preprocessing logic to detect and fix malformed markdown before processing

### Added

- New `preProcessText()` method for proactive error prevention
- Smart link protection that preserves valid markdown links while escaping other parentheses
- 5 new GitHub issue-specific test cases
- Enhanced validation logic for unmatched formatting markers

### Improved

- Performance increase: 53,675+ conversions/second (23% improvement from v1.0.1)
- Test coverage expanded from 28 to 33 unit tests
- More robust regex patterns for markdown pair detection
- Better error messaging for validation failures

## [1.0.1] - 2025-06-02

### Added

- NPM package publication and distribution
- Automated CI/CD pipeline with GitHub Actions
- Enhanced documentation and examples

### Fixed

- Minor package configuration issues
- Improved error handling for edge cases

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
