# 🤖 TechFlecks GitHub Workflows

This directory contains automated workflows for the **TechFlecks Telegram Markdown Parser** project.

## 📋 Available Workflows

### 1. 📦 NPM Publishing (`npm-publish.yml`)

**Purpose:** Automatically publishes the package to npm registry

**Triggers:**
- 🏷️ New GitHub releases
- 🚀 Version tags (v*.*.*)
- 🎯 Manual workflow dispatch

**Features:**
- ✅ Comprehensive quality checks (tests, linting, license validation)
- 🏷️ Automatic version bumping (for manual triggers)
- 📦 Safe npm publication with conflict detection
- 🏷️ GitHub release creation
- 📊 Post-publication verification

**Required Secrets:**
- `NPM_TOKEN` - npm authentication token
- `GITHUB_TOKEN` - GitHub authentication (auto-provided)

### 2. 🧪 Continuous Integration (`ci.yml`)

**Purpose:** Ensures code quality on every push and pull request

**Triggers:**
- Push to main/master/develop branches
- Pull requests to main/master/develop branches
- Excludes documentation-only changes

**Features:**
- 🧪 Multi-version Node.js testing (20.15, 21.x, 22.x)
- 🔒 Security audits
- 🔨 Build verification
- 🌐 Cross-platform testing (Linux, Windows, macOS)
- 📜 TechFlecks license compliance

### 3. 🔄 Dependency Updates (`dependencies.yml`)

**Purpose:** Automated dependency management and security monitoring

**Triggers:**
- 📅 Scheduled: Every Monday at 9:00 AM UTC
- 🎯 Manual workflow dispatch

**Features:**
- 🔄 Automatic dependency updates
- 🧪 Testing with updated dependencies
- 🚀 Automated pull request creation
- 🔒 Security vulnerability monitoring
- 📊 Detailed update summaries

## 🚀 Setup Instructions

### 1. NPM Token Configuration

1. Go to [npmjs.com](https://www.npmjs.com) and log in
2. Generate an access token with publish permissions
3. Add the token to GitHub Secrets as `NPM_TOKEN`

### 2. Repository Settings

Ensure the following permissions are enabled:
- ✅ **Actions** → Read and write permissions
- ✅ **Contents** → Write permissions (for releases)
- ✅ **Pull requests** → Write permissions (for dependency updates)
- ✅ **Issues** → Write permissions (for security alerts)

### 3. Branch Protection Rules

Recommended settings for main branch:
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging
- ✅ Include administrators in restrictions

## 📊 Workflow Status

You can monitor workflow status in the **Actions** tab of your GitHub repository.

### Expected Workflow Results:

#### ✅ Successful Workflows
- All tests pass (28/28)
- Build completes successfully
- TechFlecks license validation passes
- Security audit shows no critical issues

#### ⚠️ Common Issues
- **NPM_TOKEN missing** → Configure npm token in secrets
- **Version already exists** → Workflow skips duplicate publications
- **Test failures** → Fix code issues before publishing
- **License validation fails** → Ensure proper TechFlecks headers

## 🔧 Manual Workflow Triggers

### Publishing a New Version

1. **Via GitHub Release:**
   - Create a new release with tag `v1.x.x`
   - Workflow automatically publishes to npm

2. **Via Manual Dispatch:**
   - Go to Actions → "📦 Publish to NPM"
   - Click "Run workflow"
   - Select version bump type (patch/minor/major)

### Updating Dependencies

1. Go to Actions → "🔄 Dependency Updates"
2. Click "Run workflow"
3. Select update type (patch/minor/major/all)
4. Workflow creates PR with updates

## 📝 Workflow Logs

Each workflow provides detailed logs including:
- 📊 Test results and coverage
- 🔍 Code quality metrics
- 📦 Build verification
- 🔒 Security audit results
- 📜 License compliance status

## 🛠️ Customization

### Modifying Triggers

Edit the `on:` section in each workflow file:

```yaml
on:
  push:
    branches: [main, master, develop]  # Add/remove branches
  schedule:
    - cron: '0 9 * * 1'  # Modify schedule
```

### Adding New Checks

Add steps to the workflow jobs:

```yaml
- name: 🔍 Custom Check
  run: |
    echo "Running custom validation..."
    # Your custom commands here
```

### Environment Variables

Add to the `env:` section:

```yaml
env:
  NODE_VERSION: '20.15'
  CUSTOM_VAR: 'value'
```

## 📞 Support

For workflow issues or questions:

- 📧 **Email:** support@techflecks.com
- 🐛 **Issues:** [GitHub Issues](https://github.com/TechFlecks/n8n-nodes-telegram-markdown-parser/issues)
- 🌐 **Website:** [TechFlecks.com](https://www.techflecks.com)

---

**Built with ❤️ by TechFlecks**

*These workflows ensure the highest quality standards for the TechFlecks Telegram Markdown Parser while automating routine maintenance tasks.*
