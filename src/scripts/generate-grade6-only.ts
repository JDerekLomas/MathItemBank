#!/usr/bin/env ts-node

/**
 * Generate ONLY Grade 6 items by filtering the standards
 */

import { promises as fs } from 'fs';
import { StandardsParser } from '../lib/standards-parser';
import { SubskillGenerator } from '../lib/subskill-generator';
import { MathItemGenerator } from '../lib/item-generator';
import { ExportManager } from '../lib/export-manager';
import { ClaudeClient } from '../lib/claude-client';
import { MathStandard, Subskill, MathItem } from '../types';

async function generateGrade6Only() {
  console.log('🎓 Grade 6 ONLY Math Item Bank Generation');
  console.log('======================================\n');

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

    // Load ONLY Grade 6 standards
    console.log('\n📚 Loading ONLY Grade 6 standards...');
    let standards: MathStandard[];
    try {
      standards = await StandardsParser.parseCSV('grade6-standards.csv');
      console.log(`✅ Loaded ${standards.length} Grade 6 standards ONLY`);
    } catch (error) {
      console.log('❌ Failed to load Grade 6 standards:', error instanceof Error ? error.message : 'Unknown error');
      process.exit(1);
    }

    // Filter to ensure we only have Grade 6 standards
    const grade6Standards = standards.filter(s => s.gradeLevel === '6');
    console.log(`✅ Filtered to ${grade6Standards.length} pure Grade 6 standards`);

    // Display domains breakdown
    const domains = [...new Set(grade6Standards.map(s => s.domain))];
    console.log('\n📊 Grade 6 Standards by Domain:');
    domains.forEach(domain => {
      const domainStandards = grade6Standards.filter(s => s.domain === domain);
      console.log(`   ${domain}: ${domainStandards.length} standards`);
    });

    // Generate subskills for all Grade 6 standards
    console.log('\n🔧 Generating subskills for ALL Grade 6 standards...');

    const allSubskills: Subskill[] = [];
    let totalSubskillsGenerated = 0;

    for (let i = 0; i < grade6Standards.length; i++) {
      const standard = grade6Standards[i];
      console.log(`📝 [${i + 1}/${grade6Standards.length}] Generating subskills for: ${standard.domain} - ${standard.description.substring(0, 80)}...`);

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
    console.log('\n🎯 Generating items for ALL Grade 6 subskills...');

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

    // Create Grade 6 specific item bank
    console.log('\n🏗️  Creating Grade 6 ONLY item bank...');

    const grade6ItemBank = {
      metadata: {
        exportedAt: new Date().toISOString(),
        version: "1.0",
        totalItems: allItems.length,
        totalStandards: grade6Standards.length,
        totalSubskills: allSubskills.length,
        gradeLevel: "6",
        includeAnswers: true,
        includeMetadata: true
      },
      standards: grade6Standards.map((standard: MathStandard) => ({
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
        totalStandards: grade6Standards.length,
        totalSubskills: allSubskills.length,
        averageItemsPerStandard: Math.round(allItems.length / grade6Standards.length * 10) / 10,
        averageSubskillsPerStandard: Math.round(allSubskills.length / grade6Standards.length * 10) / 10
      }
    };

    // Export the data
    console.log('\n📤 Exporting Grade 6 ONLY data...');

    // Save as enhanced-item-bank.json (overwrite everything with Grade 6)
    await ExportManager.exportToJSON(grade6ItemBank, 'enhanced-item-bank.json');
    console.log('✅ Exported Grade 6 ONLY data to enhanced-item-bank.json');

    // Save subskills to CSV
    const subskillCSV = [
      'ID,Standard ID,Title,Description,Difficulty,Status,Generated By',
      ...allSubskills.map(subskill =>
        `"${subskill.id}","${subskill.standardId}","${subskill.title}","${subskill.description}","${subskill.difficulty}","${subskill.status}","${subskill.generatedBy}"`
      )
    ].join('\n');

    const { writeFileSync } = require('fs');
    writeFileSync('subskills.csv', subskillCSV);
    console.log('✅ Exported Grade 6 subskills to subskills.csv');

    // Save backup
    await ExportManager.exportToJSON(grade6ItemBank, 'grade6-only-item-bank.json');
    console.log('✅ Exported backup to grade6-only-item-bank.json');

    // Generate statistics
    console.log('\n📊 Grade 6 ONLY Generation Statistics:');
    console.log(`   Standards: ${grade6Standards.length}`);
    console.log(`   Subskills: ${allSubskills.length}`);
    console.log(`   Items: ${allItems.length}`);

    const domainStats = new Map();
    allItems.forEach((item: MathItem) => {
      const itemDomain = item.metadata?.domain || 'Unknown';
      if (!domainStats.has(itemDomain)) {
        domainStats.set(itemDomain, { items: 0 });
      }
      domainStats.get(itemDomain).items++;
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

    console.log('\n🎉 Grade 6 ONLY item bank generation completed successfully!');
    console.log('\n✅ What we accomplished:');
    console.log(`   • ${grade6Standards.length} Grade 6 math standards`);
    console.log(`   • ${allSubskills.length} AI-generated subskills`);
    console.log(`   • ${allItems.length} comprehensive assessment items`);
    console.log(`   • Full coverage of Grade 6 curriculum`);

    console.log('\n🎯 Topics covered:');
    domains.forEach(domain => {
      console.log(`   • ${domain}`);
    });

    console.log('\n📋 Next steps:');
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
  generateGrade6Only().catch(error => {
    console.error('Generation failed:', error);
    process.exit(1);
  });
}

export { generateGrade6Only };