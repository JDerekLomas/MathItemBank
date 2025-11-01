#!/usr/bin/env ts-node

/**
 * Organize existing item bank data into hierarchical structure
 */

import { promises as fs } from 'fs';
import { ItemBankOrganizer } from '../lib/item-bank-organizer';
import { MathStandard, MathItem, Subskill } from '../types';

async function organizeData() {
  console.log('🗂️  Organizing Item Bank Data');
  console.log('=============================\n');

  try {
    // Read existing data files
    console.log('📁 Reading data files...');

    let itemBankData: any = null;
    let standards: MathStandard[] = [];
    let items: MathItem[] = [];
    let subskills: Subskill[] = [];

    // Try to read enhanced item bank
    try {
      const itemBankContent = await fs.readFile('enhanced-item-bank.json', 'utf-8');
      itemBankData = JSON.parse(itemBankContent);
      standards = itemBankData.standards || [];
      items = itemBankData.items || [];
      console.log(`✅ Loaded enhanced item bank: ${standards.length} standards, ${items.length} items`);
    } catch (error) {
      console.log('⚠️  Enhanced item bank not found, checking sample data...');

      // Fallback to sample data
      try {
        const sampleContent = await fs.readFile('sample-item-bank.json', 'utf-8');
        itemBankData = JSON.parse(sampleContent);
        standards = itemBankData.standards || [];
        items = itemBankData.items || [];
        console.log(`✅ Loaded sample item bank: ${standards.length} standards, ${items.length} items`);
      } catch (sampleError) {
        console.log('❌ No item bank data found');
        return;
      }
    }

    // Read subskills from CSV
    try {
      const subskillsContent = await fs.readFile('subskills.csv', 'utf-8');
      const lines = subskillsContent.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());

      subskills = lines.slice(1)
        .filter(line => line.trim())
        .map((line, index) => {
          const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
          const subskill: any = {};

          headers.forEach((header, headerIndex) => {
            let value = values[headerIndex] || '';

            // Convert specific fields to proper types
            switch (header) {
              case 'sequence':
                subskill[header] = parseInt(value) || index + 1;
                break;
              case 'estimatedTimeMinutes':
                subskill[header] = parseInt(value) || 20;
                break;
              case 'exemplarIds':
              case 'prerequisites':
              case 'relatedSubskills':
              case 'keywords':
                subskill[header] = value ? value.split(';').map(v => v.trim()).filter(v => v) : [];
                break;
              default:
                subskill[header] = value;
            }
          });

          // Set default values for required fields
          if (!subskill.exemplarIds) subskill.exemplarIds = [];
          if (!subskill.prerequisites) subskill.prerequisites = [];
          if (!subskill.relatedSubskills) subskill.relatedSubskills = [];
          if (!subskill.keywords) subskill.keywords = [];
          if (!subskill.generatedBy) subskill.generatedBy = 'template';
          if (!subskill.status) subskill.status = 'draft';

          return subskill as Subskill;
        });

      console.log(`✅ Loaded ${subskills.length} subskills from CSV`);
    } catch (error) {
      console.log('⚠️  Subskills CSV not found, creating empty subskills array');
      subskills = [];
    }

    // Organize data hierarchically
    console.log('\n🏗️  Organizing data by grade level...');
    const hierarchy = ItemBankOrganizer.organizeByGrade(standards, items, subskills);

    console.log(`📊 Organization Results:`);
    console.log(`   Grades: ${hierarchy.metadata.totalGrades}`);
    console.log(`   Standards: ${hierarchy.metadata.totalStandards}`);
    console.log(`   Items: ${hierarchy.metadata.totalItems}`);
    console.log(`   Subskills: ${hierarchy.metadata.totalSubskills}`);
    console.log(`   Grade Levels: ${hierarchy.metadata.gradeLevels.join(', ')}`);
    console.log(`   Domains: ${hierarchy.metadata.domains.join(', ')}`);

    // Get coverage statistics
    console.log('\n📈 Coverage Analysis:');
    const stats = ItemBankOrganizer.getCoverageStatistics(hierarchy);
    console.log(`   Overall Coverage: ${stats.overallCoverage}%`);

    console.log('\n   By Grade Level:');
    stats.gradeLevelCoverage.forEach(({ grade, coverage }) => {
      console.log(`     Grade ${grade}: ${coverage}%`);
    });

    console.log('\n   By Domain:');
    stats.domainCoverage.forEach(({ domain, coverage }) => {
      console.log(`     ${domain}: ${coverage}%`);
    });

    console.log('\n   Difficulty Distribution:');
    console.log(`     Beginning: ${stats.difficultyDistribution.beginning} items`);
    console.log(`     Developing: ${stats.difficultyDistribution.developing} items`);
    console.log(`     Proficient: ${stats.difficultyDistribution.proficient} items`);
    console.log(`     Advanced: ${stats.difficultyDistribution.advanced} items`);

    // Save organized data
    console.log('\n💾 Saving organized data...');

    const organizedData = {
      hierarchy,
      statistics: stats,
      metadata: {
        ...hierarchy.metadata,
        organizedAt: new Date().toISOString(),
        sourceFiles: [
          'enhanced-item-bank.json',
          'subskills.csv'
        ]
      }
    };

    await fs.writeFile('organized-item-bank.json', JSON.stringify(organizedData, null, 2));
    console.log('✅ Saved organized data to organized-item-bank.json');

    // Generate summary report
    console.log('\n📋 Generating summary report...');
    const report = generateSummaryReport(hierarchy, stats);
    await fs.writeFile('organization-report.md', report);
    console.log('✅ Saved summary report to organization-report.md');

    console.log('\n🎉 Data organization completed successfully!');
    console.log('\nNext steps:');
    console.log('• Start the web viewer: npm run dev');
    console.log('• View the organized data at http://localhost:3000');
    console.log('• Check the organization report for detailed analysis');

  } catch (error) {
    console.error('❌ Organization failed:', error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}

function generateSummaryReport(hierarchy: any, stats: any): string {
  let report = `# Math Item Bank Organization Report\n\n`;
  report += `Generated on: ${new Date().toLocaleString()}\n\n`;

  report += `## Overview\n\n`;
  report += `- **Total Grades**: ${hierarchy.metadata.totalGrades}\n`;
  report += `- **Total Standards**: ${hierarchy.metadata.totalStandards}\n`;
  report += `- **Total Items**: ${hierarchy.metadata.totalItems}\n`;
  report += `- **Total Subskills**: ${hierarchy.metadata.totalSubskills}\n`;
  report += `- **Overall Coverage**: ${stats.overallCoverage}%\n\n`;

  report += `## Grade Level Breakdown\n\n`;
  report += `| Grade | Standards | Items | Subskills | Coverage |\n`;
  report += `|-------|-----------|-------|-----------|----------|\n`;

  hierarchy.grades.forEach((grade: any) => {
    const coverage = stats.gradeLevelCoverage.find((c: any) => c.grade === grade.grade)?.coverage || 0;
    report += `| ${grade.grade} | ${grade.totalStandards} | ${grade.totalItems} | ${grade.totalSubskills} | ${coverage}% |\n`;
  });

  report += `\n## Domain Coverage\n\n`;
  report += `| Domain | Standards | Items | Subskills | Coverage |\n`;
  report += `|--------|-----------|-------|-----------|----------|\n`;

  const domainStats = new Map();
  hierarchy.grades.forEach((grade: any) => {
    grade.domains.forEach((domain: any) => {
      if (!domainStats.has(domain.domain)) {
        domainStats.set(domain.domain, {
          standards: 0,
          items: 0,
          subskills: 0
        });
      }
      const stats = domainStats.get(domain.domain);
      stats.standards += domain.totalStandards;
      stats.items += domain.totalItems;
      stats.subskills += domain.totalSubskills;
    });
  });

  domainStats.forEach((stats: any, domain: string) => {
    const coverage = stats.domainCoverage?.find((c: any) => c.domain === domain)?.coverage || 0;
    report += `| ${domain} | ${stats.standards} | ${stats.items} | ${stats.subskills} | ${coverage}% |\n`;
  });

  report += `\n## Difficulty Distribution\n\n`;
  report += `- **Beginning**: ${stats.difficultyDistribution.beginning} items\n`;
  report += `- **Developing**: ${stats.difficultyDistribution.developing} items\n`;
  report += `- **Proficient**: ${stats.difficultyDistribution.proficient} items\n`;
  report += `- **Advanced**: ${stats.difficultyDistribution.advanced} items\n\n`;

  report += `## Recommendations\n\n`;

  if (stats.overallCoverage < 80) {
    report += `- **Overall coverage is below 80%**. Consider generating more items for subskills without items.\n\n`;
  }

  stats.gradeLevelCoverage.forEach((gradeStat: any) => {
    if (gradeStat.coverage < 60) {
      report += `- **Grade ${gradeStat.grade} has low coverage (${gradeStat.coverage}%)**. Focus on this grade level.\n`;
    }
  });

  stats.domainCoverage.forEach((domainStat: any) => {
    if (domainStat.coverage < 60) {
      report += `- **${domainStat.domain} domain has low coverage (${domainStat.coverage}%)**. Consider generating more items for this domain.\n`;
    }
  });

  const difficultyValues = Object.values(stats.difficultyDistribution) as number[];
  const totalItems = difficultyValues.reduce((sum: number, count: number) => sum + count, 0);
  const beginnerRatio = (stats.difficultyDistribution.beginning / totalItems) * 100;
  const advancedRatio = (stats.difficultyDistribution.advanced / totalItems) * 100;

  if (beginnerRatio > 40) {
    report += `- **High proportion of beginning-level items (${beginnerRatio.toFixed(1)}%)**. Consider developing more challenging items.\n`;
  }

  if (advancedRatio < 10) {
    report += `- **Low proportion of advanced-level items (${advancedRatio.toFixed(1)}%)**. Consider developing more advanced assessments.\n`;
  }

  return report;
}

// Run organization if this file is executed directly
if (require.main === module) {
  organizeData().catch(error => {
    console.error('Organization failed:', error);
    process.exit(1);
  });
}

export { organizeData };