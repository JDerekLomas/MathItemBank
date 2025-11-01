#!/usr/bin/env ts-node

/**
 * Claude API Setup Script
 * Helps users configure their Claude API key
 */

import { ClaudeClient, ClaudeConfigManager } from '../lib/claude-client';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query: string): Promise<string> {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setupClaudeAPI() {
  console.log('🔑 Claude API Setup for Math Item Bank');
  console.log('=====================================\n');

  // Check if already configured
  const claudeClient = ClaudeClient.getInstance();

  // Try to load from environment first
  try {
    claudeClient.loadFromEnvironment();
    console.log('✅ Claude API configuration found in environment variables');
    const config = claudeClient.getConfig();

    if (config) {
      console.log(`Base URL: ${config.baseURL || 'https://api.anthropic.com'}`);
      console.log(`Model: ${config.model}`);
    }

    const testResult = await claudeClient.testConnection();

    if (testResult.success) {
      console.log(`✅ API connection successful using model: ${testResult.model}`);
      console.log('\nYou can now use AI-powered generation with:');
      console.log('npm run generate:enhanced -- --use-ai');
      rl.close();
      return;
    } else {
      console.log(`❌ API test failed: ${testResult.error}`);
      console.log('Let\'s reconfigure your API key...\n');
    }
  } catch (error) {
    console.log('⚠️  No API configuration found in environment variables');
    console.log('Let\'s set up your Claude API configuration...\n');
  }

  // Show setup instructions
  ClaudeConfigManager.showSetupInstructions();

  // Get API key from user
  const apiKey = await askQuestion('\nEnter your API key (sk-ant-... for Anthropic, or ZAI token): ');

  // Validate API key
  const validation = ClaudeConfigManager.validateApiKey(apiKey);
  if (!validation.valid) {
    console.log(`❌ Invalid API key: ${validation.error}`);
    rl.close();
    process.exit(1);
  }

  console.log('✅ API key format is valid');

  // Test the API key
  console.log('🔍 Testing API connection...');
  claudeClient.configure({ apiKey });

  const testResult = await claudeClient.testConnection();
  if (!testResult.success) {
    console.log(`❌ API test failed: ${testResult.error}`);
    console.log('Please check your API key and try again.');
    rl.close();
    process.exit(1);
  }

  console.log(`✅ API connection successful using model: ${testResult.model}`);

  // Ask about saving to .env file
  const saveToEnv = await askQuestion('\nWould you like to save your API configuration to a .env file? (y/n): ');

  if (saveToEnv.toLowerCase() === 'y' || saveToEnv.toLowerCase() === 'yes') {
    const envPath = await askQuestion('Enter .env file path (default: .env): ') || '.env';

    try {
      ClaudeConfigManager.createEnvFile(envPath);

      // Update the .env file with the API key
      let envContent = '';
      if (existsSync(envPath)) {
        envContent = readFileSync(envPath, 'utf-8');
      }

      // Update or add API key (support both formats)
      let configLine;
      if (apiKey.startsWith('sk-ant-')) {
        configLine = `CLAUDE_API_KEY=${apiKey}`;
      } else {
        configLine = `ANTHROPIC_AUTH_TOKEN=${apiKey}`;
      }

      if (envContent.includes('CLAUDE_API_KEY=') || envContent.includes('ANTHROPIC_AUTH_TOKEN=')) {
        envContent = envContent.replace(/(CLAUDE_API_KEY|ANTHROPIC_AUTH_TOKEN)=.*/, configLine);
      } else {
        envContent += `\n${configLine}\n`;
      }

      writeFileSync(envPath, envContent);
      console.log(`✅ API configuration saved to: ${envPath}`);
      console.log('\nTo use the API key in future sessions, run:');
      console.log(`export $(cat ${envPath} | xargs)`);
      console.log('or load it automatically using dotenv in your application.');
    } catch (error) {
      console.log(`❌ Failed to save .env file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Show usage instructions
  console.log('\n🚀 Setup Complete!');
  console.log('==================');
  console.log('\nYou can now use AI-powered generation:');
  console.log('• With environment variable: npm run generate:enhanced -- --use-ai');
  console.log('• Test connection: npm run claude:test');
  console.log('• Generate items: npm run generate:enhanced -- --use-ai --count 10');

  console.log('\n💡 Tips:');
  console.log('• Keep your API key secure and never share it');
  console.log('• Monitor your API usage in the Anthropic console');
  console.log('• Use different models for different tasks (opus for quality, sonnet for balance, haiku for speed)');

  rl.close();
}

// Run setup if this file is executed directly
if (require.main === module) {
  setupClaudeAPI().catch(error => {
    console.error('Setup failed:', error);
    rl.close();
    process.exit(1);
  });
}

export { setupClaudeAPI };