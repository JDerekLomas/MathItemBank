#!/usr/bin/env ts-node

/**
 * Generate comprehensive Grade 6 math items using AI
 */

import { StandardsParser } from '../lib/standards-parser';
import { SubskillGenerator } from '../lib/subskill-generator';
import { MathItemGenerator } from '../lib/item-generator';
import { ExportManager } from '../lib/export-manager';
import { ClaudeClient } from '../lib/claude-client';
import { MathStandard, Subskill, MathItem } from '../types';

async function generateGrade6Items() {
  console.log('🎓 Grade 6 Math Item Bank Generation');
  console.log('====================================\n');

  try {
    // Initialize Claude AI
    console.log('🤖 Setting up Claude AI...');
    const claudeClient = ClaudeClient.getInstance();

    try {
      claudeClient.loadFromEnvironment();
      console.log('✅ Claude API loaded from environment');
    } catch (error) {
      console.log('❌ Failed to load Claude API:', error instanceof Error ? error.message : 'Unknown error');
      console.log('Please set up your API key first: npm run claude:setup');
      process.exit(1);
    }

    // Test connection
    const testResult = await claudeClient.testConnection();
    if (!testResult.success) {
      console.log('❌ Claude API test failed:', testResult.error);
      process.exit(1);
    }
    console.log(`✅ Claude API connected (${testResult.model})`);

    // Load Grade 6 standards
    console.log('\n📚 Loading Grade 6 standards...');
    const parser = new StandardsParser();

    let standards: MathStandard[];
    try {
      standards = await StandardsParser.parseCSV('grade6-standards.csv');
      console.log(`✅ Loaded ${standards.length} Grade 6 standards`);
    } catch (error) {
      console.log('❌ Failed to load Grade 6 standards:', error instanceof Error ? error.message : 'Unknown error');
      process.exit(1);
    }

    // Display standards breakdown
    const domains = [...new Set(standards.map((s: MathStandard) => s.domain))];
    console.log('\n📊 Grade 6 Standards by Domain:');
    domains.forEach(domain => {
      const domainStandards = standards.filter((s: MathStandard) => s.domain === domain);
      console.log(`   ${domain}: ${domainStandards.length} standards`);
    });

    // Generate subskills for all Grade 6 standards
    console.log('\n🔧 Generating subskills for Grade 6 standards...');

    const allSubskills: Subskill[] = [];
    let totalSubskillsGenerated = 0;

    for (let i = 0; i < standards.length; i++) {
      const standard = standards[i];
      console.log(`📝 [${i + 1}/${standards.length}] Generating subskills for: ${standard.domain} - ${standard.description.substring(0, 80)}...`);

      const subskillRequest = {
        standardId: standard.id,
        gradeLevel: standard.gradeLevel,
        domain: standard.domain,
        cluster: standard.cluster,
        standardDescription: standard.description,
        targetSubskillCount: 4,
        customInstructions: `Focus on 6th grade level concepts. Ensure subskills are developmentally appropriate for 11-12 year old students. Include practical applications and real-world examples relevant to middle school students.`
      };

      const subskillResult = await SubskillGenerator.generateSubskills(subskillRequest, true);

      if (subskillResult.success && subskillResult.subskills) {
        allSubskills.push(...subskillResult.subskills);
        totalSubskillsGenerated += subskillResult.subskills.length;
        console.log(`   ✅ Generated ${subskillResult.subskills.length} subskills (Quality: ${Math.round((subskillResult.qualityScore || 0) * 100)}%)`);
      } else {
        console.log(`   ⚠️  Failed to generate subskills: ${subskillResult.error}`);
      }

      // Small delay to prevent overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log(`\n📋 Total subskills generated: ${totalSubskillsGenerated}`);

    // Generate items for subskills
    console.log('\n🎯 Generating items for Grade 6 subskills...');

    const allItems: MathItem[] = [];
    let totalItemsGenerated = 0;

    for (let i = 0; i < allSubskills.length; i++) {
      const subskill = allSubskills[i];
      console.log(`📝 [${i + 1}/${allSubskills.length}] Generating items for subskill: ${subskill.title.substring(0, 60)}...`);

      const itemRequest = {
        subskill,
        targetItemCount: 3, // Generate 3 items per subskill
        customInstructions: `Create age-appropriate assessment items for 6th grade students. Use real-world contexts that 11-12 year olds can relate to (school, hobbies, sports, shopping, etc.). Include a mix of difficulty levels within the subskill.`
      };

      const itemResult = await MathItemGenerator.generateItems(itemRequest, true);

      if (itemResult.success && itemResult.items) {
        allItems.push(...itemResult.items);
        totalItemsGenerated += itemResult.items.length;
        console.log(`   ✅ Generated ${itemResult.items.length} items`);
      } else {
        console.log(`   ⚠️  Failed to generate items: ${itemResult.error}`);
      }

      // Small delay to prevent overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    console.log(`\n📋 Total items generated: ${totalItemsGenerated}`);

    // Create enhanced item bank with Grade 6 data
    console.log('\n🏗️  Creating Grade 6 item bank...');

    const grade6ItemBank = {
      metadata: {
        exportedAt: new Date().toISOString(),
        version: "1.0",
        totalItems: allItems.length,
        totalStandards: standards.length,
        totalSubskills: allSubskills.length,
        gradeLevel: "6",
        includeAnswers: true,
        includeMetadata: true
      },
      standards: standards.map((standard: MathStandard) => ({
        ...standard,
        subskillIds: allSubskills
          .filter(subskill => subskill.standardId === standard.id)
          .map(subskill => subskill.id),
        complexity: 0.7,
        relatedStandards: []
      })),
      subskills: allSubskills,
      items: allItems,
      statistics: {
        totalItems: allItems.length,
        totalStandards: standards.length,
        totalSubskills: allSubskills.length,
        averageItemsPerStandard: Math.round(allItems.length / standards.length * 10) / 10,
        averageSubskillsPerStandard: Math.round(allSubskills.length / standards.length * 10) / 10
      }
    };

    // Export the data
    console.log('\n📤 Exporting Grade 6 data...');

    // Save as enhanced-item-bank.json (this will overwrite the existing one)
    await ExportManager.exportToJSON(grade6ItemBank, 'enhanced-item-bank.json');
    console.log('✅ Exported to enhanced-item-bank.json');

    // Save subskills to CSV (simple implementation)
    const subskillCSV = [
      'ID,Standard ID,Title,Description,Difficulty,Status,Generated By',
      ...allSubskills.map(subskill =>
        `"${subskill.id}","${subskill.standardId}","${subskill.title}","${subskill.description}","${subskill.difficulty}","${subskill.status}","${subskill.generatedBy}"`
      )
    ].join('\n');

    const { writeFileSync } = require('fs');
    writeFileSync('subskills.csv', subskillCSV);
    console.log('✅ Exported subskills to subskills.csv');

    // Save backup with grade-specific name
    await ExportManager.exportToJSON(grade6ItemBank, 'grade6-item-bank.json');
    console.log('✅ Exported backup to grade6-item-bank.json');

    // Generate statistics
    console.log('\n📊 Grade 6 Generation Statistics:');
    console.log(`   Standards: ${standards.length}`);
    console.log(`   Subskills: ${allSubskills.length}`);
    console.log(`   Items: ${allItems.length}`);

    const domainStats = new Map();
    allItems.forEach((item: MathItem) => {
      const itemDomain = item.metadata?.domain || 'Unknown';
      if (!domainStats.has(itemDomain)) {
        domainStats.set(itemDomain, { items: 0, subskills: new Set() });
      }
      domainStats.get(itemDomain).items++;
      item.subskillIds.forEach((subskillId: string) => {
        const subskill = allSubskills.find(s => s.id === subskillId);
        if (subskill) {
          domainStats.get(itemDomain).subskills.add(subskill.domain);
        }
      });
    });

    console.log('\n📈 Items by Domain:');
    domainStats.forEach((stats, domain) => {
      console.log(`   ${domain}: ${stats.items} items`);
    });

    // Difficulty distribution
    const difficultyStats = {
      beginning: allItems.filter(item => item.difficulty === 'beginning').length,
      developing: allItems.filter(item => item.difficulty === 'developing').length,
      proficient: allItems.filter(item => item.difficulty === 'proficient').length,
      advanced: allItems.filter(item => item.difficulty === 'advanced').length
    };

    console.log('\n🎯 Difficulty Distribution:');
    console.log(`   Beginning: ${difficultyStats.beginning} items`);
    console.log(`   Developing: ${difficultyStats.developing} items`);
    console.log(`   Proficient: ${difficultyStats.proficient} items`);
    console.log(`   Advanced: ${difficultyStats.advanced} items`);

    console.log('\n🎉 Grade 6 item bank generation completed successfully!');
    console.log('\nNext steps:');
    console.log('• Organize the data: npm run organize');
    console.log('• Start the web viewer: npm run dev');
    console.log('• View your Grade 6 items at http://localhost:3000');
    console.log('• Deploy to Vercel: vercel --prod --yes');

  } catch (error) {
    console.error('❌ Generation failed:', error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}

// Run generation if this file is executed directly
if (require.main === module) {
  generateGrade6Items().catch(error => {
    console.error('Generation failed:', error);
    process.exit(1);
  });
}

export { generateGrade6Items };