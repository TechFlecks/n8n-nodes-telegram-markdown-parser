# Usage Examples

<!--
TechFlecks Telegram Markdown Parser - Usage Examples
Copyright © 2025 TechFlecks Technologies
Licensed under TechFlecks Software License Agreement v1.0
For license terms, see ../LICENSE.md
-->

This directory contains examples of how to use the TechFlecks n8n Telegram Markdown V2 Parser.

## Basic Usage Examples

### Example 1: Parse Markdown V2 to HTML

**Input:**

```
*Hello* _world_! Visit our [website](https://techflecks.com) for more info.
```

**n8n Node Configuration:**

- Operation: "Parse to HTML"
- Input Text: `*Hello* _world_! Visit our [website](https://techflecks.com) for more info.`

**Output:**

```json
{
	"originalText": "*Hello* _world_! Visit our [website](https://techflecks.com) for more info.",
	"htmlText": "<strong>Hello</strong> <em>world</em>! Visit our <a href=\"https://techflecks.com\">website</a> for more info.",
	"operation": "parseToHtml"
}
```

### Example 2: Escape Text for Safe Usage

**Input:**

```
Price: $10.99 (includes * special characters)
```

**n8n Node Configuration:**

- Operation: "Escape for Markdown V2"
- Input Text: `Price: $10.99 (includes * special characters)`

**Output:**

```json
{
	"originalText": "Price: $10.99 (includes * special characters)",
	"escapedText": "Price: \\$10\\.99 \\(includes \\* special characters\\)",
	"operation": "escapeMarkdown"
}
```

### Example 3: Validate Markdown V2 Syntax

**Input:**

```
*Bold text with `code` and [link](url)
```

**n8n Node Configuration:**

- Operation: "Validate Markdown V2"
- Input Text: `*Bold text with \`code\` and [link](url)`

**Output:**

```json
{
	"originalText": "*Bold text with `code` and [link](url)",
	"isValid": false,
	"errors": ["Unclosed bold (single asterisk) formatting: *Bold text with `code` and [link](url)"],
	"warnings": [],
	"operation": "validateMarkdown"
}
```

### Example 4: Complex Formatting

**Input:**

````
*Welcome* to __TechFlecks__!

Here's what we offer:
- ~~Old pricing~~ `New pricing: $9.99`
- ||Secret feature|| coming soon
- Contact us at [support](mailto:support@techflecks.com)

Use code: ```javascript
console.log('Hello Make by You!');
````

````

**n8n Node Configuration:**
- Operation: "Parse to HTML"
- Additional Options:
  - Preserve Whitespace: true
  - Strip Invalid Tags: true

**Output:**
```json
{
  "originalText": "*Welcome* to __TechFlecks__! \n\nHere's what we offer:\n- ~~Old pricing~~ `New pricing: $9.99`\n- ||Secret feature|| coming soon\n- Contact us at [support](mailto:support@techflecks.com)\n\nUse code: ```javascript\nconsole.log('Hello Make by You!');\n```",
  "htmlText": "<strong>Welcome</strong> to <em>TechFlecks</em>! \n\nHere's what we offer:\n- <s>Old pricing</s> <code>New pricing: $9.99</code>\n- <span class=\"spoiler\">Secret feature</span> coming soon\n- Contact us at <a href=\"mailto:support@techflecks.com\">support</a>\n\nUse code: <pre><code class=\"language-javascript\">console.log('Hello Make by You!');</code></pre>",
  "operation": "parseToHtml"
}
````

## Workflow Examples

### Example Workflow: Telegram Message Processor

1. **HTTP Request** - Receive webhook from Telegram
2. **Set** - Extract message text
3. **TechFlecks Markdown V2 Parser** - Parse to HTML
4. **HTML to Text** - Convert for database storage
5. **Database** - Store processed message

### Example Workflow: Content Validation

1. **Spreadsheet** - Read content list
2. **TechFlecks Markdown V2 Parser** - Validate each entry
3. **IF** - Check if valid
4. **Slack** - Send notifications for invalid content
5. **Google Sheets** - Update validation status

## Advanced Configuration

### Custom Entity Mapping

```json
{
	"customEntityMapping": {
		"mapping": [
			{
				"from": "\\*\\*BRAND\\*\\*",
				"to": "<span class=\"brand\">TechFlecks</span>"
			},
			{
				"from": "\\{\\{price\\}\\}",
				"to": "<span class=\"price\">$9.99</span>"
			}
		]
	}
}
```

This would transform:

- `**BRAND**` → `<span class="brand">TechFlecks</span>`
- `{{price}}` → `<span class="price">$9.99</span>`

## Error Handling

The node supports n8n's "Continue on Fail" mode. When errors occur:

```json
{
	"error": "Detailed error message explaining what went wrong"
}
```

Common error scenarios:

- Invalid Markdown V2 syntax
- Malformed custom entity mappings
- Network issues (for link validation if enabled)

## Best Practices

1. **Always validate** critical content before processing
2. **Use escaping** when dealing with user-generated content
3. **Test custom mappings** with sample data first
4. **Enable "Continue on Fail"** for batch processing workflows
5. **Monitor validation warnings** for content quality issues
