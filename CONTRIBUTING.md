# Contributing to TechFlecks n8n Telegram Markdown V2 Parser

Thank you for your interest in contributing to our n8n Telegram Markdown V2 Parser! This document provides guidelines and information for contributors.

## 🌟 How to Contribute

### Reporting Bugs

1. **Check existing issues** first to avoid duplicates
2. **Use the bug report template** when creating new issues
3. **Provide detailed information** including:
   - Node.js and n8n versions
   - Input text that caused the issue
   - Expected vs actual behavior
   - Steps to reproduce

### Suggesting Features

1. **Check existing feature requests** to avoid duplicates
2. **Use the feature request template**
3. **Explain the use case** and why it would be valuable
4. **Consider backward compatibility**

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch** from `main`
3. **Follow the development setup** below
4. **Write tests** for your changes
5. **Ensure all tests pass**
6. **Follow the code style guidelines**
7. **Submit a pull request**

## 🛠️ Development Setup

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/n8n-nodes-telegram-markdownv2-parser.git
cd n8n-nodes-telegram-markdownv2-parser

# Install dependencies
npm install

# Start development mode
npm run dev

# Run tests
npm test

# Run linting
npm run lint
```

## 📝 Code Style Guidelines

### TypeScript

- Use **strict TypeScript** with proper type definitions
- Add **JSDoc comments** for all public methods
- Use **meaningful variable and function names**
- Follow the **existing code structure and patterns**

### Formatting

- Use **Prettier** for code formatting
- Use **ESLint** for code quality
- Run `npm run format` before committing

### Testing

- Write **unit tests** for all new functionality
- Maintain **test coverage** above 80%
- Use **descriptive test names**
- Test **edge cases and error conditions**

## 🧪 Testing Guidelines

### Test Structure

```typescript
describe('Feature Name', () => {
	describe('specific functionality', () => {
		test('should do something specific', () => {
			// Test implementation
		});
	});
});
```

### What to Test

- All parsing operations
- Error handling
- Edge cases with special characters
- Validation logic
- Escaping functionality

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📋 Pull Request Guidelines

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Tests are written and passing
- [ ] Documentation is updated
- [ ] Changelog is updated (if applicable)
- [ ] No linting errors

### PR Title Format

Use one of these prefixes:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `test:` for test-related changes
- `refactor:` for code refactoring
- `chore:` for maintenance tasks

### PR Description

Include:

- **What changed** and **why**
- **Testing performed**
- **Screenshots** (if UI changes)
- **Breaking changes** (if any)
- **Related issues** (use `Fixes #123`)

## 🏗️ Architecture Guidelines

### Node Structure

Follow n8n community node conventions:

```typescript
export class NodeName implements INodeType {
	description: INodeTypeDescription = {
		// Node configuration
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		// Node execution logic
	}
}
```

### Error Handling

- Use `NodeOperationError` for n8n-specific errors
- Provide **meaningful error messages**
- Support **continueOnFail** mode
- Log errors appropriately

### Performance

- **Optimize parsing algorithms**
- **Avoid unnecessary string operations**
- **Handle large text inputs efficiently**
- **Use caching where appropriate**

## 🔍 Review Process

1. **Automated checks** run on all PRs
2. **Maintainer review** required before merge
3. **CI/CD pipeline** must pass
4. **At least one approval** required

## 📚 Resources

- [n8n Community Node Development](https://docs.n8n.io/integrations/community-nodes/creating-community-nodes/)
- [Telegram Bot API - Markdown V2](https://core.telegram.org/bots/api#markdownv2-style)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)

## 📞 Getting Help

- **GitHub Discussions** for questions and ideas
- **GitHub Issues** for bugs and feature requests
- **Email**: support@techflecks.com for private inquiries

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to the TechFlecks Make by You ecosystem! 🚀
