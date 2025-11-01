# Claude API Setup Guide

This guide shows you how to configure Claude AI for the Math Item Bank system.

## 🔑 Getting Your API Key

1. **Visit the Anthropic Console**: Go to https://console.anthropic.com/
2. **Sign up or log in** to your Anthropic account
3. **Navigate to API Keys** in the sidebar
4. **Create a new API key** by clicking "Create Key"
5. **Copy the API key** - it will start with `sk-ant-`

## ⚙️ Configuration Options

### Option 1: Interactive Setup (Recommended)
```bash
npm run claude:setup
```
This guided setup will:
- Prompt you for your API key
- Validate the key format
- Test the API connection
- Optionally save to a `.env` file

### Option 2: Environment Variables
```bash
export CLAUDE_API_KEY="sk-ant-your-api-key-here"
```

### Option 3: .env File
Create a `.env` file in your project root:
```env
CLAUDE_API_KEY=sk-ant-your-api-key-here
CLAUDE_MODEL=claude-3-sonnet-20240229
CLAUDE_MAX_TOKENS=4000
CLAUDE_TEMPERATURE=0.3
```

## 🧪 Test Your Configuration

```bash
npm run claude:test
```

This will test:
- API key loading
- Connection to Claude
- Text generation
- JSON generation
- Subskill generation

## 🚀 Using AI-Powered Generation

### Basic AI Generation
```bash
npm run generate:enhanced -- --use-ai
```

### Custom Configuration
```bash
npm run generate:enhanced -- --use-ai --subskills 3 --count 50
```

### Available Options
- `--use-ai`: Enable Claude AI generation
- `--subskills <number>`: Subskills per standard (default: 4)
- `--count <number>`: Target item count (default: 31)
- `--help`: Show all options

## 📋 Model Options

- **claude-3-opus-20240229**: Highest quality, slower, more expensive
- **claude-3-sonnet-20240229**: Balanced quality and speed (recommended)
- **claude-3-haiku-20240307**: Fastest, less expensive, good for simple tasks

## 🔒 Security Best Practices

1. **Never share your API key** or commit it to version control
2. **Use environment variables** in production
3. **Monitor your usage** in the Anthropic console
4. **Set appropriate limits** for your use case
5. **Rotate keys regularly** if needed

## 🛠️ Troubleshooting

### API Key Not Found
```
Error: CLAUDE_API_KEY environment variable not found
```
**Solution**: Run `npm run claude:setup` or set the environment variable

### Invalid API Key
```
Error: API key should start with "sk-ant-"
```
**Solution**: Ensure you're using the correct API key format from Anthropic

### Connection Failed
```
Error: Claude API error: invalid_request - Invalid API key
```
**Solution**: Verify your API key is correct and active

### Rate Limits
```
Error: Claude API error: rate_limit_error
```
**Solution**: Wait a moment and try again, or upgrade your plan

## 💡 Tips for Best Results

1. **Start with Claude Sonnet** for balanced quality and cost
2. **Use appropriate temperature settings** (0.3-0.5 for structured outputs)
3. **Provide clear, specific prompts** for better results
4. **Monitor token usage** to control costs
5. **Test with small batches** before large-scale generation

## 📊 Usage Examples

### Generate Subskills with AI
```bash
npm run generate:enhanced -- --use-ai --subskills 5
```

### Generate Many Items
```bash
npm run generate:enhanced -- --use-ai --count 100
```

### Test Different Models
```bash
# Edit .env file to change model, then:
npm run claude:test
```

## 🆘 Support

If you encounter issues:

1. Check the [Anthropic API documentation](https://docs.anthropic.com/claude/reference)
2. Verify your API key in the console
3. Check your internet connection
4. Try the test command: `npm run claude:test`

For issues specific to the Math Item Bank, please check the main README or open an issue.