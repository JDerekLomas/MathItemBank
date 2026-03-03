#!/usr/bin/env ts-node

/**
 * Add some Grade 6 items manually to the existing item bank - Simple Version
 */

import { ClaudeClient } from '../lib/claude-client';
import { promises as fs } from 'fs';

async function addGrade6Items() {
  console.log('🎓 Adding Grade 6 Math Items (Simple Version)');
  console.log('========================================\n');

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

    // Create simple Grade 6 items manually
    console.log('\n🚀 Creating Grade 6 math items...');

    const grade6Items = [
      // Ratios & Proportional Relationships
      {
        id: 'grade6_ratios_1',
        standardId: 'std_6_1',
        subskillIds: ['subskill_grade6_1'],
        type: 'multiple_choice',
        difficulty: 'beginning',
        title: 'Grade 6: Ratio Reasoning',
        question: 'A recipe calls for 2 cups of flour for every 3 cups of sugar. If you want to use 4 cups of flour, how many cups of sugar do you need?',
        correctAnswer: '6',
        explanation: 'Set up the ratio 2:3 = 4:x. Cross-multiply: 2x = 12, so x = 6 cups of sugar.',
        hints: ['Set up a proportion', 'Cross-multiply to solve'],
        metadata: {
          estimatedTimeMinutes: 3,
          calculatorAllowed: false,
          keywords: ['ratios', 'proportions', 'fractions', 'cooking'],
          realWorldContext: true,
          context: 'real-world',
          format: 'multiple-choice',
          depthOfKnowledge: 2,
          bloomsTaxonomy: 'apply',
          commonMisconceptions: ['Not setting up the proportion correctly', 'Cross-multiplying incorrectly'],
          relatedStandards: [],
          generatedBy: 'manual',
          reviewStatus: 'draft',
          author: 'MathItemBank Generator',
          created: new Date().toISOString(),
          lastModified: new Date().toISOString()
        }
      },
      {
        id: 'grade6_ratios_2',
        standardId: 'std_6_2',
        subskillIds: ['subskill_grade6_2'],
        type: 'short_answer',
        difficulty: 'developing',
        title: 'Grade 6: Unit Rates',
        question: 'A car travels 180 miles in 3 hours. What is the unit rate in miles per hour?',
        correctAnswer: '60',
        explanation: 'Unit rate = total distance ÷ total time = 180 ÷ 3 = 60 miles per hour.',
        hints: ['Divide the total distance by the total time'],
        metadata: {
          estimatedTimeMinutes: 3,
          calculatorAllowed: true,
          keywords: ['unit rates', 'speed', 'division', 'real-world'],
          realWorldContext: true,
          context: 'real-world',
          format: 'open-ended',
          depthOfKnowledge: 2,
          bloomsTaxonomy: 'apply',
          commonMisconceptions: ['Dividing incorrectly', 'Not understanding what unit rate means'],
          relatedStandards: [],
          generatedBy: 'manual',
          reviewStatus: 'draft',
          author: 'MathItemBank Generator',
          created: new Date().toISOString(),
          lastModified: new Date().toISOString()
        }
      },
      // The Number System
      {
        id: 'grade6_numbers_1',
        standardId: 'std_6_4',
        subskillIds: ['subskill_grade6_3'],
        type: 'short_answer',
        difficulty: 'developing',
        title: 'Grade 6: Fraction Division',
        question: 'What is 3/4 ÷ 1/2? Give your answer as a simplified fraction.',
        correctAnswer: '3/2',
        explanation: 'To divide fractions, multiply by the reciprocal: (3/4) ÷ (1/2) = (3/4) × (2/1) = 6/4 = 3/2.',
        hints: ['Multiply by the reciprocal', 'Simplify if possible'],
        metadata: {
          estimatedTimeMinutes: 4,
          calculatorAllowed: false,
          keywords: ['fractions', 'division', 'reciprocal', 'simplifying'],
          realWorldContext: false,
          context: 'abstract',
          format: 'open-ended',
          depthOfKnowledge: 2,
          bloomsTaxonomy: 'apply',
          commonMisconceptions: ['Adding fractions instead of dividing', 'Not finding the reciprocal correctly'],
          relatedStandards: [],
          generatedBy: 'manual',
          reviewStatus: 'draft',
          author: 'MathItemBank Generator',
          created: new Date().toISOString(),
          lastModified: new Date().toISOString()
        }
      },
      {
        id: 'grade6_numbers_2',
        standardId: 'std_6_6',
        subskillIds: ['subskill_grade6_4'],
        type: 'short_answer',
        difficulty: 'beginning',
        title: 'Grade 6: Decimal Operations',
        question: 'Calculate: 2.34 + 1.67',
        correctAnswer: '4.01',
        explanation: 'Line up the decimal points and add: 2.34 + 1.67 = 4.01.',
        hints: ['Line up decimal points', 'Add column by column'],
        metadata: {
          estimatedTimeMinutes: 2,
          calculatorAllowed: false,
          keywords: ['decimals', 'addition', 'place value'],
          realWorldContext: false,
          context: 'abstract',
          format: 'open-ended',
          depthOfKnowledge: 1,
          bloomsTaxonomy: 'remember',
          commonMisconceptions: ['Not lining up decimal points', 'Carrying incorrectly'],
          relatedStandards: [],
          generatedBy: 'manual',
          reviewStatus: 'draft',
          author: 'MathItemBank Generator',
          created: new Date().toISOString(),
          lastModified: new Date().toISOString()
        }
      },
      // Expressions & Equations
      {
        id: 'grade6_expressions_1',
        standardId: 'std_6_12',
        subskillIds: ['subskill_grade6_5'],
        type: 'short_answer',
        difficulty: 'beginning',
        title: 'Grade 6: Algebraic Expressions',
        question: 'If x = 3, what is the value of 2x + 5?',
        correctAnswer: '11',
        explanation: 'Substitute x = 3: 2(3) + 5 = 6 + 5 = 11.',
        hints: ['Substitute the value of x', 'Follow order of operations'],
        metadata: {
          estimatedTimeMinutes: 2,
          calculatorAllowed: false,
          keywords: ['expressions', 'variables', 'substitution', 'evaluation'],
          realWorldContext: false,
          context: 'abstract',
          format: 'open-ended',
          depthOfKnowledge: 2,
          bloomsTaxonomy: 'apply',
          commonMisconceptions: ['Not substituting correctly', 'Ignoring order of operations'],
          relatedStandards: [],
          generatedBy: 'manual',
          reviewStatus: 'draft',
          author: 'MathItemBank Generator',
          created: new Date().toISOString(),
          lastModified: new Date().toISOString()
        }
      },
      {
        id: 'grade6_equations_1',
        standardId: 'std_6_18',
        subskillIds: ['subskill_grade6_6'],
        type: 'short_answer',
        difficulty: 'developing',
        title: 'Grade 6: One-Variable Equations',
        question: 'Solve for x: x + 7 = 15',
        correctAnswer: '8',
        explanation: 'Subtract 7 from both sides: x + 7 - 7 = 15 - 7, so x = 8.',
        hints: ['Isolate the variable', 'Use inverse operations'],
        metadata: {
          estimatedTimeMinutes: 2,
          calculatorAllowed: false,
          keywords: ['equations', 'solving', 'isolation', 'inverse operations'],
          realWorldContext: false,
          context: 'abstract',
          format: 'open-ended',
          depthOfKnowledge: 2,
          bloomsTaxonomy: 'apply',
          commonMisconceptions: ['Adding instead of subtracting', 'Not isolating the variable'],
          relatedStandards: [],
          generatedBy: 'manual',
          reviewStatus: 'draft',
          author: 'MathItemBank Generator',
          created: new Date().toISOString(),
          lastModified: new Date().toISOString()
        }
      },
      // Geometry
      {
        id: 'grade6_geometry_1',
        standardId: 'std_6_22',
        subskillIds: ['subskill_grade6_7'],
        type: 'short_answer',
        difficulty: 'beginning',
        title: 'Grade 6: Area of Rectangles',
        question: 'Find the area of a rectangle with length 8 units and width 5 units.',
        correctAnswer: '40',
        explanation: 'Area = length × width = 8 × 5 = 40 square units.',
        hints: ['Use the area formula', 'Multiply length by width'],
        metadata: {
          estimatedTimeMinutes: 2,
          calculatorAllowed: false,
          keywords: ['area', 'geometry', 'rectangles', 'multiplication'],
          realWorldContext: false,
          context: 'abstract',
          format: 'open-ended',
          depthOfKnowledge: 1,
          bloomsTaxonomy: 'apply',
          commonMisconceptions: ['Using perimeter formula instead of area', 'Multiplying incorrectly'],
          relatedStandards: [],
          generatedBy: 'manual',
          reviewStatus: 'draft',
          author: 'MathItemBank Generator',
          created: new Date().toISOString(),
          lastModified: new Date().toISOString()
        }
      },
      {
        id: 'grade6_geometry_2',
        standardId: 'std_6_23',
        subskillIds: ['subskill_grade6_8'],
        type: 'multiple_choice',
        difficulty: 'proficient',
        title: 'Grade 6: Coordinate Geometry',
        question: 'What are the coordinates of the point that is 3 units to the right and 2 units up from the origin (0,0)?',
        correctAnswer: '(3, 2)',
        explanation: 'Starting from (0,0), moving 3 units right adds 3 to the x-coordinate, and moving 2 units up adds 2 to the y-coordinate, giving (3, 2).',
        hints: ['Start at the origin (0,0)', 'Right movement affects x, up movement affects y'],
        metadata: {
          estimatedTimeMinutes: 3,
          calculatorAllowed: false,
          keywords: ['coordinates', 'plane', 'ordered pairs', 'geometry'],
          realWorldContext: false,
          context: 'abstract',
          format: 'multiple-choice',
          depthOfKnowledge: 2,
          bloomsTaxonomy: 'apply',
          commonMisconceptions: ['Mixing up x and y coordinates', 'Counting from the wrong starting point'],
          relatedStandards: [],
          generatedBy: 'manual',
          reviewStatus: 'draft',
          author: 'MathItemBank Generator',
          created: new Date().toISOString(),
          lastModified: new Date().toISOString()
        }
      },
      // Statistics & Probability
      {
        id: 'grade6_statistics_1',
        standardId: 'std_6_25',
        subskillIds: ['subskill_grade6_9'],
        type: 'multiple_choice',
        difficulty: 'beginning',
        title: 'Grade 6: Statistical Questions',
        question: 'Which of the following is a statistical question?',
        correctAnswer: 'How many students in our class have brown eyes?',
        explanation: 'A statistical question is one that anticipates variability in the data and can have multiple possible answers.',
        hints: ['Look for questions with multiple possible answers', 'Avoid questions with single definitive answers'],
        metadata: {
          estimatedTimeMinutes: 2,
          calculatorAllowed: false,
          keywords: ['statistics', 'data', 'variability', 'questions'],
          realWorldContext: true,
          context: 'real-world',
          format: 'multiple-choice',
          depthOfKnowledge: 2,
          bloomsTaxonomy: 'understand',
          commonMisconceptions: ['Thinking any question with numbers is statistical', 'Not understanding variability'],
          relatedStandards: [],
          generatedBy: 'manual',
          reviewStatus: 'draft',
          author: 'MathItemBank Generator',
          created: new Date().toISOString(),
          lastModified: new Date().toISOString()
        }
      }
    ];

    // Add to item bank
    currentItemBank.items.push(...grade6Items);
    currentItemBank.metadata.totalItems = currentItemBank.items.length;

    // Save updated item bank
    console.log('\n💾 Saving updated item bank...');
    await fs.writeFile('enhanced-item-bank.json', JSON.stringify(currentItemBank, null, 2));
    console.log('✅ Updated enhanced-item-bank.json');

    // Update metadata to reflect Grade 6 focus
    currentItemBank.metadata.gradeLevel = "6";
    currentItemBank.metadata.exportedAt = new Date().toISOString();
    currentItemBank.metadata.totalItems = currentItemBank.items.length;
    await fs.writeFile('enhanced-item-bank.json', JSON.stringify(currentItemBank, null, 2));
    console.log('✅ Updated metadata to reflect Grade 6 focus');

    console.log('\n📊 Generation Summary:');
    console.log(`   Total items in item bank: ${currentItemBank.items.length}`);
    console.log(`   Grade 6 items added: ${grade6Items.length}`);
    console.log(`   Topics covered: Ratios, Number System, Expressions & Equations, Geometry, Statistics & Probability`);

    console.log('\n📈 Items by Type:');
    const typeCounts = {
      'multiple_choice': grade6Items.filter(item => item.type === 'multiple_choice').length,
      'short_answer': grade6Items.filter(item => item.type === 'short_answer').length
    };
    console.log(`   Multiple Choice: ${typeCounts.multiple_choice} items`);
    console.log(`   Short Answer: ${typeCounts.short_answer} items`);

    console.log('\n🎯 Items by Difficulty:');
    const difficultyCounts = {
      'beginning': grade6Items.filter(item => item.difficulty === 'beginning').length,
      'developing': grade6Items.filter(item => item.difficulty === 'developing').length,
      'proficient': grade6Items.filter(item => item.difficulty === 'proficient').length,
      'advanced': grade6Items.filter(item => item.difficulty === 'advanced').length
    };
    console.log(`   Beginning: ${difficultyCounts.beginning} items`);
    console.log(`   Developing: ${difficultyCounts.developing} items`);
    console.log(`   Proficient: ${difficultyCounts.proficient} items`);
    console.log(`   Advanced: ${difficultyCounts.advanced} items`);

    console.log('\n🎉 Grade 6 items added successfully!');
    console.log('\n✅ What we accomplished:');
    console.log(`   • ${grade6Items.length} comprehensive Grade 6 math items`);
    console.log(`   • Full coverage of major 6th grade topics`);
    console.log(`   • Age-appropriate contexts and examples`);
    console.log(`   • Multiple difficulty levels for differentiation`);

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