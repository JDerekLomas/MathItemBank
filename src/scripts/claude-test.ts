#!/usr/bin/env ts-node

/**
 * Claude API Test Script
 * Tests the Claude API connection and basic functionality
 */

import { ClaudeClient } from '../lib/claude-client';

async function testClaudeAPI() {
  console.log('🧪 Claude API Test');
  console.log('==================\n');

  const claudeClient = ClaudeClient.getInstance();

  // Try to load configuration
  try {
    // First try environment variables
    try {
      claudeClient.loadFromEnvironment();
      console.log('✅ Loaded configuration from environment variables');
    } catch {
      // Then try .env file
      claudeClient.loadFromEnvFile('.env');
      console.log('✅ Loaded configuration from .env file');
    }

    // Show configuration (without API key)
    const config = claudeClient.getConfig();
    if (config) {
      console.log(`Model: ${config.model}`);
      console.log(`Max Tokens: ${config.maxTokens}`);
      console.log(`Temperature: ${config.temperature}`);
      console.log(`Timeout: ${config.timeout}ms`);
    }

  } catch (error) {
    console.log('❌ Failed to load configuration:', error instanceof Error ? error.message : 'Unknown error');
    console.log('\nPlease set up your API key first:');
    console.log('npm run claude:setup');
    process.exit(1);
  }

  // Test basic connection
  console.log('\n🔍 Testing basic connection...');
  const testResult = await claudeClient.testConnection();

  if (testResult.success) {
    console.log(`✅ Connection successful! Model: ${testResult.model}`);
  } else {
    console.log(`❌ Connection failed: ${testResult.error}`);
    process.exit(1);
  }

  // Test text generation
  console.log('\n📝 Testing text generation...');
  try {
    const textResponse = await claudeClient.generateText(
      'What is 2 + 2? Respond with just the number.',
      'You are a helpful math assistant. Be concise and accurate.'
    );
    console.log(`✅ Text generation: "${textResponse.trim()}"`);
  } catch (error) {
    console.log(`❌ Text generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  // Test JSON generation
  console.log('\n📋 Testing JSON generation...');
  try {
    const jsonResponse = await claudeClient.generateJSON<{
      problem: string;
      solution: number;
      steps: string[];
    }>(
      'Create a simple math problem with steps. Include the problem statement, numerical solution, and step-by-step solution.',
      {
        type: 'object',
        properties: {
          problem: { type: 'string' },
          solution: { type: 'number' },
          steps: { type: 'array', items: { type: 'string' } }
        },
        required: ['problem', 'solution', 'steps']
      }
    );

    console.log('✅ JSON generation successful:');
    console.log(`   Problem: ${jsonResponse.problem}`);
    console.log(`   Solution: ${jsonResponse.solution}`);
    console.log(`   Steps: ${jsonResponse.steps.length} steps`);
  } catch (error) {
    console.log(`❌ JSON generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  // Test subskill generation prompt
  console.log('\n🎯 Testing subskill generation...');
  try {
    const subskillPrompt = `
Standard: "Solve linear equations in one variable"
Grade Level: "9"
Domain: "Algebra"

Generate 2 subskills for this standard. Return as JSON with subskills array containing title, description, difficulty, estimatedTimeMinutes, prerequisites, and keywords.
`;

    const subskillResponse = await claudeClient.generateJSON<{
      subskills: Array<{
        title: string;
        description: string;
        difficulty: string;
        estimatedTimeMinutes: number;
        prerequisites: string[];
        keywords: string[];
      }>;
    }>(subskillPrompt, {
      type: 'object',
      properties: {
        subskills: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              description: { type: 'string' },
              difficulty: { type: 'string' },
              estimatedTimeMinutes: { type: 'number' },
              prerequisites: { type: 'array', items: { type: 'string' } },
              keywords: { type: 'array', items: { type: 'string' } }
            }
          }
        }
      }
    });

    console.log(`✅ Subskill generation successful: ${subskillResponse.subskills.length} subskills generated`);
    subskillResponse.subskills.forEach((subskill, index) => {
      console.log(`   ${index + 1}. ${subskill.title} (${subskill.difficulty})`);
    });
  } catch (error) {
    console.log(`❌ Subskill generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  console.log('\n🎉 All tests completed!');
  console.log('Your Claude API is ready for use with the Math Item Bank.');
  console.log('\nNext steps:');
  console.log('• Generate subskills: npm run generate:enhanced -- --use-ai');
  console.log('• Generate items: npm run generate:enhanced -- --use-ai --count 10');
}

// Run test if this file is executed directly
if (require.main === module) {
  testClaudeAPI().catch(error => {
    console.error('Test failed:', error);
    process.exit(1);
  });
}

export { testClaudeAPI };