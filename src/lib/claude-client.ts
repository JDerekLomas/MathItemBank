/**
 * Claude AI Client for Math Item Bank
 * Handles secure API key management and Claude API integration
 */

export interface ClaudeConfig {
  apiKey: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
  timeout?: number;
  baseURL?: string;
  authHeader?: string;
  authToken?: string;
}

export interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ClaudeResponse {
  content: Array<{ type: 'text'; text: string }>;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
  model: string;
}

export interface ClaudeError {
  type: string;
  message: string;
}

/**
 * Claude API Client with secure key management
 */
export class ClaudeClient {
  private static instance: ClaudeClient;
  private config: ClaudeConfig | null = null;
  private static readonly DEFAULT_CONFIG: Partial<ClaudeConfig> = {
    model: 'claude-3-sonnet-20240229',
    maxTokens: 4000,
    temperature: 0.3,
    timeout: 60000, // 60 seconds
    baseURL: 'https://api.anthropic.com',
    authHeader: 'x-api-key'
  };

  private constructor() {}

  /**
   * Get singleton instance
   */
  static getInstance(): ClaudeClient {
    if (!ClaudeClient.instance) {
      ClaudeClient.instance = new ClaudeClient();
    }
    return ClaudeClient.instance;
  }

  /**
   * Configure Claude API
   */
  configure(config: ClaudeConfig): void {
    this.config = {
      ...ClaudeClient.DEFAULT_CONFIG,
      ...config
    };

    // Validate required fields
    if (!this.config.apiKey) {
      throw new Error('Claude API key is required');
    }

    // Mask API key in logs
    console.log('Claude client configured with model:', this.config.model);
  }

  /**
   * Load configuration from environment variables
   */
  loadFromEnvironment(): void {
    // Support both standard Anthropic and ZAI configuration
    const apiKey = process.env.CLAUDE_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN;
    if (!apiKey) {
      throw new Error('Neither CLAUDE_API_KEY nor ANTHROPIC_AUTH_TOKEN environment variable found');
    }

    const config: ClaudeConfig = {
      apiKey,
      model: process.env.CLAUDE_MODEL || 'claude-3-sonnet-20240229',
      maxTokens: parseInt(process.env.CLAUDE_MAX_TOKENS || process.env.API_TIMEOUT_MS || '4000'),
      temperature: parseFloat(process.env.CLAUDE_TEMPERATURE || '0.3'),
      timeout: parseInt(process.env.CLAUDE_TIMEOUT || process.env.API_TIMEOUT_MS || '60000'),
      baseURL: process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com',
      authHeader: 'x-api-key' // ZAI uses the same header
    };

    // Only add authToken if it exists (for ZAI)
    if (process.env.ANTHROPIC_AUTH_TOKEN) {
      config.authToken = process.env.ANTHROPIC_AUTH_TOKEN;
    }

    this.configure(config);
  }

  /**
   * Load configuration from .env file
   */
  loadFromEnvFile(envPath: string = '.env'): void {
    try {
      const fs = require('fs');
      const path = require('path');
      const envFile = path.resolve(envPath);

      if (fs.existsSync(envFile)) {
        const envContent = fs.readFileSync(envFile, 'utf-8');
        const envLines = envContent.split('\n');

        envLines.forEach((line: string) => {
          const trimmedLine = line.trim();
          if (trimmedLine && !trimmedLine.startsWith('#')) {
            const [key, ...valueParts] = trimmedLine.split('=');
            const value = valueParts.join('=');
            if (key && value) {
              process.env[key.trim()] = value.trim().replace(/^["']|["']$/g, '');
            }
          }
        });

        this.loadFromEnvironment();
      } else {
        throw new Error(`Environment file not found: ${envFile}`);
      }
    } catch (error) {
      throw new Error(`Failed to load .env file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Check if Claude client is configured
   */
  isConfigured(): boolean {
    return this.config !== null && this.config!.apiKey.length > 0;
  }

  /**
   * Get current configuration (without API key)
   */
  getConfig(): Omit<ClaudeConfig, 'apiKey'> | null {
    if (!this.config) return null;

    const { apiKey, ...safeConfig } = this.config;
    return safeConfig;
  }

  /**
   * Make API call to Claude
   */
  async generateResponse(messages: ClaudeMessage[]): Promise<ClaudeResponse> {
    if (!this.isConfigured()) {
      throw new Error('Claude client not configured. Please set API key first.');
    }

    const config = this.config!;
    const baseURL = config.baseURL || ClaudeClient.DEFAULT_CONFIG.baseURL!;
    const authToken = config.authToken || config.apiKey;

    const response = await fetch(`${baseURL}/v1/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [config.authHeader || 'x-api-key']: authToken,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: config.model,
        max_tokens: config.maxTokens,
        temperature: config.temperature,
        messages: messages
      }),
      signal: AbortSignal.timeout(config.timeout!)
    });

    if (!response.ok) {
      const errorData = await response.json() as ClaudeError;
      throw new Error(`Claude API error: ${errorData.type} - ${errorData.message}`);
    }

    return await response.json() as ClaudeResponse;
  }

  /**
   * Generate text response from Claude
   */
  async generateText(prompt: string, systemPrompt?: string): Promise<string> {
    const messages: ClaudeMessage[] = [];

    if (systemPrompt) {
      messages.push({ role: 'user', content: `System: ${systemPrompt}\n\nUser: ${prompt}` });
    } else {
      messages.push({ role: 'user', content: prompt });
    }

    const response = await this.generateResponse(messages);
    return response.content[0]?.text || '';
  }

  /**
   * Generate JSON response from Claude
   */
  async generateJSON<T>(prompt: string, schema?: {
    type: 'object';
    properties: Record<string, any>;
    required?: string[];
  }): Promise<T> {
    const systemPrompt = `You are a helpful assistant that always responds with valid JSON. ${schema ? `Your response must conform to this JSON schema: ${JSON.stringify(schema, null, 2)}` : ''} Do not include any markdown formatting or explanations outside the JSON structure.`;

    const response = await this.generateText(prompt, systemPrompt);

    try {
      // Try to parse as JSON
      const cleanedResponse = response.replace(/```json\n?|\n?```/g, '').trim();
      return JSON.parse(cleanedResponse) as T;
    } catch (error) {
      // If parsing fails, try to extract JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]) as T;
      }
      throw new Error(`Failed to parse JSON response: ${response}`);
    }
  }

  /**
   * Test Claude API connection
   */
  async testConnection(): Promise<{ success: boolean; error?: string; model?: string }> {
    try {
      if (!this.isConfigured()) {
        return { success: false, error: 'Claude client not configured' };
      }

      const response = await this.generateText('Hello! Please respond with just "Connection successful" to test the API.');
      const success = response.toLowerCase().includes('successful');

      const result: { success: boolean; error?: string; model?: string } = {
        success
      };
      if (success && this.config!.model) result.model = this.config!.model;
      else result.error = 'Unexpected response from Claude';
      return result;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

/**
 * Configuration helper functions
 */
export class ClaudeConfigManager {
  /**
   * Create .env file template
   */
  static createEnvTemplate(): string {
    return `# Claude AI Configuration for Math Item Bank
# Supports both direct Anthropic API and ZAI proxy service

# Option 1: Direct Anthropic API Key
# Get your API key from: https://console.anthropic.com/
CLAUDE_API_KEY=your_sk-ant-api-key-here

# Option 2: ZAI Proxy Service Configuration
# Use your ZAI authentication token
ANTHROPIC_AUTH_TOKEN=your_zai_token_here
ANTHROPIC_BASE_URL=https://api.z.ai/api/anthropic

# Optional: Model selection (default: claude-3-sonnet-20240229)
# Options: claude-3-opus-20240229, claude-3-sonnet-20240229, claude-3-haiku-20240307
CLAUDE_MODEL=claude-3-sonnet-20240229

# Optional: Maximum tokens per response (default: 4000)
CLAUDE_MAX_TOKENS=4000

# Optional: Temperature for creativity (0.0-1.0, default: 0.3)
CLAUDE_TEMPERATURE=0.3

# Optional: Request timeout in milliseconds (default: 60000)
CLAUDE_TIMEOUT=60000

# Optional: API timeout for ZAI (default: 3000000 = 50 minutes)
API_TIMEOUT_MS=3000000
`;
  }

  /**
   * Create .env file
   */
  static createEnvFile(filePath: string = '.env'): void {
    const fs = require('fs');
    const path = require('path');
    const envPath = path.resolve(filePath);

    if (!fs.existsSync(envPath)) {
      fs.writeFileSync(envPath, this.createEnvTemplate());
      console.log(`Created .env file at: ${envPath}`);
      console.log('Please edit the file and add your Claude API key.');
    } else {
      console.log(`Environment file already exists at: ${envPath}`);
    }
  }

  /**
   * Show setup instructions
   */
  static showSetupInstructions(): void {
    console.log(`
🔑 Claude API Setup Instructions
================================

1. Get your API key:
   • Visit https://console.anthropic.com/
   • Sign up or log in to your Anthropic account
   • Navigate to API Keys section
   • Create a new API key

2. Configure the API key in ONE of these ways:

   Option A - Environment Variables (Recommended):
   export CLAUDE_API_KEY="your_api_key_here"

   Option B - .env File:
   Create a .env file with:
   CLAUDE_API_KEY=your_api_key_here

   Option C - Direct Configuration:
   claudeClient.configure({ apiKey: "your_api_key_here" })

3. Test the connection:
   npm run claude:test

4. Start generating items with AI:
   npm run generate:enhanced -- --use-ai
`);
  }

  /**
   * Validate API key format
   */
  static validateApiKey(apiKey: string): { valid: boolean; error?: string } {
    if (!apiKey) {
      return { valid: false, error: 'API key cannot be empty' };
    }

    // Support both direct Anthropic keys and ZAI tokens
    if (apiKey.length < 20) {
      return { valid: false, error: 'API key appears to be too short' };
    }

    // Check for Anthropic format
    if (apiKey.startsWith('sk-ant-')) {
      return { valid: true };
    }

    // Check for ZAI token format (longer, more complex)
    if (apiKey.length > 30 && /^[a-zA-Z0-9_-]+$/.test(apiKey)) {
      return { valid: true };
    }

    return { valid: false, error: 'API key should start with "sk-ant-" or be a valid ZAI token' };
  }
}