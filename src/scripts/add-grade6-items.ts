#!/usr/bin/env ts-node

/**
 * Add some Grade 6 items manually to the existing item bank
 */

import { ClaudeClient } from '../lib/claude-client';
import { promises as fs } from 'fs';

interface Grade6Item {
  question: string;
  type: 'multiple_choice' | 'short_answer';
  correctAnswer: string;
  explanation: string;
  difficulty: 'beginning' | 'developing' | 'proficient' | 'advanced';
  domain: string;
  topic: string;
}

async function addGrade6Items() {
  console.log('🎓 Adding Grade 6 Math Items');
  console.log('===========================\n');

  try {
    // Initialize Claude AI
    console.log('🤖 Setting up Claude AI...');
    const claudeClient = ClaudeClient.getInstance();

    try {
      claudeClient.loadFromEnvironment();
      console.log('✅ Claude API loaded from environment');
    } catch (error) {
      console.log('❌ Failed to load Claude API:', error instanceof Error ? error.message : 'Unknown error');
      process.exit(1);
    }

    // Test connection
    const testResult = await claudeClient.testConnection();
    if (!testResult.success) {
      console.log('❌ Claude API test failed:', testResult.error);
      process.exit(1);
    }
    console.log(`✅ Claude API connected (${testResult.model})`);

    // Load current item bank
    console.log('\n📁 Loading current item bank...');
    const currentItemBank = JSON.parse(await fs.readFile('enhanced-item-bank.json', 'utf-8'));
    console.log(`✅ Loaded current item bank with ${currentItemBank.items.length} items`);

    // Generate Grade 6 items using Claude
    console.log('\n🚀 Generating Grade 6 math items with Claude AI...');

    const grade6Topics = [
      { domain: 'Ratios & Proportional Relationships', topic: 'Ratio and Rate Reasoning' },
      { domain: 'Ratios & Proportional Relationships', topic: 'Unit Rates' },
      { domain: 'The Number System', topic: 'Fraction Division' },
      { domain: 'The Number System', topic: 'Decimal Operations' },
      { domain: 'The Number System', topic: 'Negative Numbers' },
      { domain: 'The Number System', topic: 'Coordinate Plane' },
      { domain: 'Expressions & Equations', topic: 'Algebraic Expressions' },
      { domain: 'Expressions & Equations', topic: 'One-Variable Equations' },
      { domain: 'Geometry', topic: 'Area and Volume' },
      { domain: 'Geometry', topic: 'Coordinate Geometry' },
      { domain: 'Statistics & Probability', topic: 'Statistical Questions' },
      { domain: 'Statistics & Probability', topic: 'Data Distributions' }
    ];

    for (let i = 0; i < grade6Topics.length; i++) {
      const { domain, topic } = grade6Topics[i];
      console.log(`📝 [${i + 1}/${grade6Topics.length}] Generating items for: ${domain} - ${topic}`);

      const prompt = `
Create 2 age-appropriate math assessment items for 6th grade students (age 11-12) on the topic: ${topic} in ${domain}.

Requirements:
- Make the questions relatable to 6th grade students' daily lives (school, sports, shopping, hobbies, etc.)
- Include one multiple choice question and one short answer question
- Ensure questions are clear, unambiguous, and test understanding of the concept
- Provide the correct answer and a clear explanation
- Set appropriate difficulty level (beginning, developing, proficient, or advanced)

Return your response as a JSON array with this structure:
[
  {
    "question": "question text",
    "type": "multiple_choice" or "short_answer",
    "correctAnswer": "the correct answer",
    "explanation": "explanation of the answer",
    "difficulty": "beginning|developing|proficient|advanced",
    "domain": "${domain}",
    "topic": "${topic}"
  }
]
`;

      try {
        const response = await claudeClient.generateJSON<Grade6Item[]>(prompt, {
          type: 'object',
          properties: {
            items: {
              type: 'array',
              items: {
            type: 'object',
            properties: {
              question: { type: 'string' },
              type: { type: 'string', enum: ['multiple_choice', 'short_answer'] },
              correctAnswer: { type: 'string' },
              explanation: { type: 'string' },
              difficulty: { type: 'string', enum: ['beginning', 'developing', 'proficient', 'advanced'] },
              domain: { type: 'string' },
              topic: { type: 'string' }
            },
            required: ['question', 'type', 'correctAnswer', 'explanation', 'difficulty', 'domain', 'topic']
          }
            }
          }
        });

        // Convert to MathItem format
        const newItems = response.map((item, index) => ({
          id: `grade6_${domain.toLowerCase().replace(/\s+/g, '-')}_${topic.toLowerCase().replace(/\s+/g, '-')}_${i}_${index + 1}`,
          standardId: 'std_6_grade6', // Generic ID for Grade 6
          subskillIds: [`subskill_grade6_${i + 1}`],
          type: item.type,
          difficulty: item.difficulty,
          title: `Grade 6: ${topic}`,
          question: item.question,
          correctAnswer: item.correctAnswer,
          explanation: item.explanation,
          hints: [],
          metadata: {
            estimatedTimeMinutes: item.type === 'multiple_choice' ? 2 : 5,
            calculatorAllowed: domain !== 'Expressions & Equations', // Generally allow calculators except for algebra
            keywords: [topic.toLowerCase(), domain.toLowerCase(), 'grade 6', 'mathematics'],
            realWorldContext: true,
            context: 'real-world',
            format: item.type === 'multiple_choice' ? 'multiple-choice' : 'open-ended',
            depthOfKnowledge: 2,
            bloomsTaxonomy: 'understand',
            commonMisconceptions: [
              'Mixing up ratio concepts',
              'Forgetting to simplify fractions',
              'Confusing coordinates (x, y) order'
            ],
            relatedStandards: [],
            generatedBy: 'ai',
            reviewStatus: 'draft',
            author: 'MathItemBank Generator',
            created: new Date().toISOString(),
            lastModified: new Date().toISOString()
          }
        }));

        // Add to item bank
        currentItemBank.items.push(...newItems);
        currentItemBank.metadata.totalItems = currentItemBank.items.length;

        console.log(`   ✅ Generated ${newItems.length} items for ${topic}`);

      } catch (error) {
        console.log(`   ⚠️  Failed to generate items for ${topic}:`, error instanceof Error ? error.message : 'Unknown error');
      }

      // Small delay to prevent overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Save updated item bank
    console.log('\n💾 Saving updated item bank...');
    await fs.writeFile('enhanced-item-bank.json', JSON.stringify(currentItemBank, null, 2));
    console.log('✅ Updated enhanced-item-bank.json');

    // Update metadata to reflect Grade 6 focus
    currentItemBank.metadata.gradeLevel = "6";
    currentItemBank.metadata.exportedAt = new Date().toISOString();
    await fs.writeFile('enhanced-item-bank.json', JSON.stringify(currentItemBank, null, 2));
    console.log('✅ Updated metadata to reflect Grade 6 focus');

    console.log('\n📊 Generation Summary:');
    console.log(`   Total items in item bank: ${currentItemBank.items.length}`);
    console.log(`   Newly generated Grade 6 items: ${currentItemBank.items.length - 6} (removed previous items)`);
    console.log(`   Domains covered: ${grade6Topics.length} domains`);

    // Count items by domain
    const domainCounts = new Map();
    currentItemBank.items.forEach((item: any) => {
      const domain = item.metadata?.domain || 'Unknown';
      domainCounts.set(domain, (domainCounts.get(domain) || 0) + 1);
    });

    console.log('\n📈 Items by Domain:');
    domainCounts.forEach((count, domain) => {
      console.log(`   ${domain}: ${count} items`);
    });

    console.log('\n🎉 Grade 6 items added successfully!');
    console.log('\n📋 Next steps:');
    console.log('• Organize the data: npm run organize');
    console.log('• View your items at http://localhost:3001');
    console.log('• Deploy to Vercel: vercel --prod --yes');

  } catch (error) {
    console.error('❌ Failed to add Grade 6 items:', error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}

// Run generation if this file is executed directly
if (require.main === module) {
  addGrade6Items().catch(error => {
    console.error('Failed to add Grade 6 items:', error);
    process.exit(1);
  });
}

export { addGrade6Items };