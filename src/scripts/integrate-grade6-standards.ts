#!/usr/bin/env ts-node

/**
 * Integrate Grade 6 standards from CSV into the enhanced item bank
 */

import { promises as fs } from 'fs';
import { parse } from 'csv-parse/sync';

interface Grade6Standard {
  ID: string;
  Code: string;
  'Grade Level': string;
  Domain: string;
  Cluster: string;
  'Parent Category': string;
  Description: string;
}

async function integrateGrade6Standards() {
  console.log('📚 Integrating Grade 6 Standards');
  console.log('===============================\n');

  try {
    // Load current item bank
    console.log('📁 Loading current item bank...');
    const currentItemBank = JSON.parse(await fs.readFile('enhanced-item-bank.json', 'utf-8'));
    console.log(`✅ Loaded current item bank with ${currentItemBank.items.length} items and ${currentItemBank.standards.length} standards`);

    // Load Grade 6 standards from CSV
    console.log('\n📋 Loading Grade 6 standards from CSV...');
    const csvContent = await fs.readFile('grade6-standards.csv', 'utf-8');
    const grade6Standards: Grade6Standard[] = parse(csvContent, {
      columns: true,
      skip_empty_lines: true
    });
    console.log(`✅ Loaded ${grade6Standards.length} Grade 6 standards from CSV`);

    // Convert Grade 6 standards to the expected format
    console.log('\n🔄 Converting Grade 6 standards to item bank format...');
    const convertedStandards = grade6Standards.map((standard, index) => ({
      id: standard.ID,
      code: standard.Code,
      parentCategory: standard['Parent Category'],
      description: standard.Description,
      gradeLevel: standard['Grade Level'],
      domain: standard.Domain,
      cluster: standard.Cluster,
      standardId: standard.ID,
      subskillIds: [
        `subskill_${standard.ID}_1`,
        `subskill_${standard.ID}_2`,
        `subskill_${standard.ID}_3`,
        `subskill_${standard.ID}_4`
      ],
      complexity: 0.7, // Default complexity
      relatedStandards: []
    }));

    // Add Grade 6 standards to existing standards
    console.log('\n➕ Adding Grade 6 standards to item bank...');
    currentItemBank.standards.push(...convertedStandards);
    console.log(`✅ Added ${convertedStandards.length} Grade 6 standards`);

    // Update metadata
    currentItemBank.metadata.totalStandards = currentItemBank.standards.length;
    currentItemBank.metadata.gradeLevel = "6"; // Keep as "6" since we're focusing on Grade 6
    currentItemBank.metadata.lastModified = new Date().toISOString();

    // Save updated item bank
    console.log('\n💾 Saving updated item bank...');
    await fs.writeFile('enhanced-item-bank.json', JSON.stringify(currentItemBank, null, 2));
    console.log('✅ Updated enhanced-item-bank.json with Grade 6 standards');

    console.log('\n📊 Integration Summary:');
    console.log(`   Total standards in item bank: ${currentItemBank.standards.length}`);
    console.log(`   Grade 6 standards added: ${convertedStandards.length}`);
    console.log(`   Total items: ${currentItemBank.items.length}`);

    // Count items by grade level (based on standardId prefix)
    const grade6ItemCount = currentItemBank.items.filter((item: any) =>
      item.standardId && item.standardId.startsWith('std_6_')
    ).length;
    const grade11ItemCount = currentItemBank.items.filter((item: any) =>
      item.standardId && item.standardId.startsWith('std_10')
    ).length;

    console.log('\n📈 Items by Grade Level:');
    console.log(`   Grade 6: ${grade6ItemCount} items`);
    console.log(`   Grade 11: ${grade11ItemCount} items`);

    console.log('\n🎉 Grade 6 standards integration completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('• Run organization script: npm run organize');
    console.log('• View your items at http://localhost:3000');

  } catch (error) {
    console.error('❌ Failed to integrate Grade 6 standards:', error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}

// Run integration if this file is executed directly
if (require.main === module) {
  integrateGrade6Standards().catch(error => {
    console.error('Failed to integrate Grade 6 standards:', error);
    process.exit(1);
  });
}

export { integrateGrade6Standards };