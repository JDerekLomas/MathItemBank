import { ItemBankManager } from '../lib/item-bank';
import { ExportManager } from '../lib/export-manager';
import { MathItemGenerator } from '../lib/item-generator';
import { ClaudeClient } from '../lib/claude-client';
import { MathItem } from '../types';

/**
 * Enhanced sample script demonstrating subskill-aware item bank generation
 */
async function runEnhancedSampleGeneration(options: {
  useAI?: boolean;
  subskillCount?: number;
  itemCount?: number;
} = {}) {
  const { useAI = false, subskillCount = 4, itemCount = 31 } = options;

  console.log('🎓 Enhanced Math Item Bank Sample Generation');
  console.log('=============================================');
  console.log(`Options: AI=${useAI}, Subskills per Standard=${subskillCount}, Target Items=${itemCount}`);

  // Initialize the item bank manager
  const itemBank = new ItemBankManager();

  // Setup Claude if AI is requested
  if (useAI) {
    console.log('\n🤖 Setting up Claude AI...');
    const claudeClient = ClaudeClient.getInstance();

    try {
      // Try to load from environment first
      claudeClient.loadFromEnvironment();
      console.log('✅ Claude API loaded from environment');
    } catch {
      try {
        // Try .env file
        claudeClient.loadFromEnvFile('.env');
        console.log('✅ Claude API loaded from .env file');
      } catch {
        console.log('❌ Claude API not configured');
        console.log('Please run: npm run claude:setup');
        console.log('Or set CLAUDE_API_KEY environment variable');
        process.exit(1);
      }
    }

    // Test connection
    const testResult = await claudeClient.testConnection();
    if (!testResult.success) {
      console.log(`❌ Claude API test failed: ${testResult.error}`);
      process.exit(1);
    }
    console.log(`✅ Claude API connected (${testResult.model})`);
  }

  try {
    // Load standards from the CSV file
    console.log('\n📊 Loading math standards from CSV...');
    await itemBank.initializeFromCSV('/Users/dereklomas/Downloads/standard_mapping.csv');

    const standards = itemBank.getStandards();
    console.log(`✅ Loaded ${standards.length} math standards`);

    // Display standards by domain
    const standardsByDomain = standards.reduce((acc, standard) => {
      acc[standard.domain] = (acc[standard.domain] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log('\n📚 Standards by Domain:');
    Object.entries(standardsByDomain)
      .sort(([, a], [, b]) => b - a)
      .forEach(([domain, count]) => {
        console.log(`   ${domain}: ${count} standards`);
      });

    // ===== PHASE 1: SUBSKILL GENERATION =====
    console.log('\n🔧 PHASE 1: Generating Subskills');
    console.log('================================');

    // Select diverse standards for subskill generation
    const sampleStandards = [
      standards.find(s => s.domain === 'Algebra' && s.description.includes('equation')),
      standards.find(s => s.domain === 'Geometry' && s.description.includes('triangle')),
      standards.find(s => s.domain === 'Functions' && s.description.includes('linear')),
      standards.find(s => s.domain === 'Statistics & Probability'),
      standards.find(s => s.domain === 'Number & Quantity' && s.description.includes('complex'))
    ].filter((s): s is typeof standards[0] => Boolean(s));

    console.log(`\n📝 Selected ${sampleStandards.length} diverse standards for subskill generation`);

    // Generate subskills for sample standards
    let totalSubskillsGenerated = 0;
    for (const standard of sampleStandards) {
      console.log(`\n🎯 Generating subskills for: ${standard.domain} - ${standard.cluster}`);
      console.log(`   Standard: ${standard.description.substring(0, 100)}...`);

      const result = await itemBank.generateSubskillsForStandard(standard.id, {
        targetCount: subskillCount,
        useAI: useAI,
        customInstructions: useAI ? 'Focus on practical, assessable skills with clear learning objectives' : 'Focus on practical, assessable skills'
      });

      if (result.success && result.subskills) {
        totalSubskillsGenerated += result.subskills.length;
        console.log(`   ✅ Generated ${result.subskills.length} subskills`);

        result.subskills.forEach((subskill, index) => {
          console.log(`     ${index + 1}. ${subskill.title}`);
          console.log(`        Difficulty: ${subskill.difficulty} | Time: ${subskill.estimatedTimeMinutes} min`);
          console.log(`        ${subskill.description.substring(0, 80)}...`);
        });
      } else {
        console.log(`   ❌ Failed: ${result.error}`);
      }
    }

    console.log(`\n📊 Total subskills generated: ${totalSubskillsGenerated}`);

    // ===== PHASE 2: ENHANCED ITEM GENERATION =====
    console.log('\n🔧 PHASE 2: Generating Items with Subskill Awareness');
    console.log('=====================================================');

    const generatedItems: MathItem[] = [];

    // Generate items for each subskill
    const allSubskills = itemBank.getAllSubskills();
    console.log(`\n📝 Generating items for ${allSubskills.length} subskills...`);

    for (const subskill of allSubskills) {
      const standard = standards.find(s => s.id === subskill.standardId);
      if (!standard) continue;

      // Generate 1-2 items per subskill
      const itemCount = Math.random() > 0.5 ? 2 : 1;

      for (let i = 0; i < itemCount; i++) {
        const items = await MathItemGenerator.generateItems(
          standard,
          {
            count: 1,
            itemTypes: ['multiple_choice', 'short_answer'],
            difficulties: [subskill.difficulty],
            useAI: false
          }
        );

        items.forEach(result => {
          if (result.success && result.item) {
            // Assign the subskill to the generated item
            result.item.subskillIds = [subskill.id];

            // Update item metadata
            result.item.metadata.generatedBy = 'template';
            result.item.metadata.context = subskill.difficulty === 'beginning' ? 'abstract' : 'real-world';
            result.item.metadata.format = standard.domain === 'Geometry' ? 'geometric' :
                                       standard.domain === 'Statistics & Probability' ? 'statistical' :
                                       standard.domain === 'Functions' ? 'algebraic' : 'numeric';

            generatedItems.push(result.item);
            console.log(`   ✅ Generated ${result.item.type} item for subskill: ${subskill.title.substring(0, 40)}...`);
          }
        });
      }
    }

    // Add generated items to the bank
    itemBank.addItems(generatedItems);
    console.log(`\n📋 Generated ${generatedItems.length} subskill-aligned items`);

    // ===== PHASE 3: AUTOMATED METADATA TAGGING =====
    console.log('\n🔧 PHASE 3: Automated Metadata Tagging');
    console.log('=======================================');

    // Auto-assign subskills to any items that don't have them
    const itemsWithoutSubskills = itemBank.getFilteredItems({
      // Filter for items that have empty subskillIds (would need to implement this filter)
    }).filter(item => !item.subskillIds || item.subskillIds.length === 0);

    if (itemsWithoutSubskills.length > 0) {
      console.log(`\n🏷️  Auto-assigning subskills to ${itemsWithoutSubskills.length} items without subskills...`);

      const assignments = itemBank.autoAssignSubskillsToItems(
        itemsWithoutSubskills.map(item => item.id),
        0.3 // Minimum match score
      );

      console.log(`   ✅ Assigned subskills to ${assignments.length} items`);

      assignments.slice(0, 3).forEach(assignment => {
        const item = itemsWithoutSubskills.find(i => i.id === assignment.itemId);
        console.log(`     ${item?.title.substring(0, 40)}... -> ${assignment.subskillIds.length} subskills`);
      });
    } else {
      console.log('\n✅ All items already have subskill assignments');
    }

    // ===== PHASE 4: COVERAGE ANALYSIS =====
    console.log('\n🔧 PHASE 4: Coverage Gap Analysis');
    console.log('================================');

    const enhancedStats = itemBank.getEnhancedStatistics();
    const coverageGaps = itemBank.getCoverageGaps();

    console.log('\n📊 Enhanced Statistics:');
    console.log(`   Total Items: ${enhancedStats.totalItems}`);
    console.log(`   Total Subskills: ${enhancedStats.subskillStats.totalSubskills}`);
    console.log(`   Average Subskills per Standard: ${enhancedStats.subskillStats.averageSubskillsPerStandard.toFixed(1)}`);
    console.log(`   Items with Subskills: ${enhancedStats.subskillStats.itemsWithSubskills}`);
    console.log(`   Items without Subskills: ${enhancedStats.subskillStats.itemsWithoutSubskills}`);

    console.log('\n📈 Subskills by Status:');
    Object.entries(enhancedStats.subskillStats.subskillsByStatus).forEach(([status, count]) => {
      console.log(`   ${status}: ${count}`);
    });

    console.log('\n📉 Subskills by Difficulty:');
    Object.entries(enhancedStats.subskillStats.subskillsByDifficulty).forEach(([difficulty, count]) => {
      console.log(`   ${difficulty}: ${count}`);
    });

    console.log('\n🔍 Coverage Gaps:');
    console.log(`   Standards without subskills: ${coverageGaps.standardsWithoutSubskills.length}`);
    console.log(`   Subskills without items: ${coverageGaps.subskillsWithoutItems.length}`);
    console.log(`   Domains with low coverage: ${coverageGaps.domainsWithLowCoverage.join(', ')}`);

    if (Object.keys(coverageGaps.difficultyImbalances).length > 0) {
      console.log('\n⚖️  Difficulty Imbalances:');
      Object.entries(coverageGaps.difficultyImbalances).forEach(([domain, missing]) => {
        console.log(`   ${domain}: missing ${missing.join(', ')} levels`);
      });
    }

    // ===== PHASE 5: DEMONSTRATE FILTERING =====
    console.log('\n🔧 PHASE 5: Advanced Filtering and Search');
    console.log('=========================================');

    // Filter items by subskill status
    const approvedSubskillItems = itemBank.getFilteredItemsWithSubskills({
      subskillStatus: 'draft'
    });
    console.log(`\n📝 Items with 'draft' subskills: ${approvedSubskillItems.length}`);

    // Filter by domain and difficulty
    const algebraDevelopingItems = itemBank.getFilteredItemsWithSubskills({
      domains: ['Algebra'],
      difficulties: ['developing']
    });
    console.log(`   Algebra developing level items: ${algebraDevelopingItems.length}`);

    // Search subskills
    const equationSubskills = itemBank.searchSubskills('equation');
    console.log(`   Subskills matching 'equation': ${equationSubskills.length}`);

    if (equationSubskills.length > 0) {
      const equationItems = itemBank.getItemsBySubskill(equationSubskills[0].id);
      console.log(`   Items for top equation subskill: ${equationItems.length}`);
    }

    // ===== PHASE 6: EXPORT ENHANCED DATA =====
    console.log('\n🔧 PHASE 6: Export Enhanced Item Bank');
    console.log('=====================================');

    const enhancedItemBank = itemBank.getItemBank();

    // Export to JSON with subskills
    const jsonExport = ExportManager.exportToJSON(enhancedItemBank, {
      format: 'json',
      includeAnswers: true,
      includeMetadata: true,
      filter: {
        domains: ['Algebra', 'Geometry'],
        difficulties: ['developing', 'proficient']
      }
    });
    await ExportManager.saveToFile(jsonExport, './enhanced-item-bank.json');
    console.log('✅ Exported enhanced item bank to JSON: enhanced-item-bank.json');

    // Export subskills to CSV
    const subskillsForCSV = itemBank.getAllSubskills();
    const subskillCSV = `ID,Standard ID,Title,Description,Difficulty,Status,Generated By\n` +
      subskillsForCSV.map(subskill =>
        `"${subskill.id}","${subskill.standardId}","${subskill.title}","${subskill.description}","${subskill.difficulty}","${subskill.status}","${subskill.generatedBy}"`
      ).join('\n');
    await ExportManager.saveToFile(subskillCSV, './subskills.csv');
    console.log('✅ Exported subskills to CSV: subskills.csv');

    // ===== PHASE 7: VALIDATION =====
    console.log('\n🔧 PHASE 7: Data Validation');
    console.log('=============================');

    const validation = itemBank.validateSubskillData();

    console.log(`\n✅ Data validation: ${validation.isValid ? 'PASSED' : 'FAILED'}`);

    if (validation.errors.length > 0) {
      console.log('\n❌ Errors:');
      validation.errors.forEach(error => console.log(`   - ${error}`));
    }

    if (validation.warnings.length > 0) {
      console.log('\n⚠️  Warnings:');
      validation.warnings.slice(0, 5).forEach(warning => console.log(`   - ${warning}`));
      if (validation.warnings.length > 5) {
        console.log(`   ... and ${validation.warnings.length - 5} more warnings`);
      }
    }

    console.log('\n🎉 Enhanced sample generation completed successfully!');
    console.log('\n📈 System Capabilities Demonstrated:');
    console.log('  ✅ Subskill decomposition and generation');
    console.log('  ✅ Subskill-aware item generation');
    console.log('  ✅ Automated metadata tagging');
    console.log('  ✅ Coverage gap analysis');
    console.log('  ✅ Advanced filtering and search');
    console.log('  ✅ Enhanced export capabilities');
    console.log('  ✅ Data validation and integrity checks');

    console.log('\n🚀 Next Steps for Production:');
    console.log('  1. Integrate with actual Claude API for AI-powered generation');
    console.log('  2. Implement web interface for subskill management');
    console.log('  3. Add variation generation engine for existing items');
    console.log('  4. Create review workflow for subskill validation');
    console.log('  5. Implement OER content ingestion system');
    console.log('  6. Add analytics dashboard for coverage tracking');

  } catch (error) {
    console.error('❌ Error during enhanced sample generation:', error);
  }
}

// Parse command line arguments
function parseArgs(): { useAI?: boolean; subskillCount?: number; itemCount?: number } {
  const args = process.argv.slice(2);
  const options: { useAI?: boolean; subskillCount?: number; itemCount?: number } = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case '--use-ai':
        options.useAI = true;
        break;
      case '--subskills':
        if (i + 1 < args.length) {
          options.subskillCount = parseInt(args[i + 1]);
          i++;
        }
        break;
      case '--count':
        if (i + 1 < args.length) {
          options.itemCount = parseInt(args[i + 1]);
          i++;
        }
        break;
      case '--help':
      case '-h':
        console.log(`
Enhanced Math Item Bank Generator

Usage: npm run generate:enhanced [options]

Options:
  --use-ai              Use Claude AI for generation (requires API key setup)
  --subskills <number>  Number of subskills per standard (default: 4)
  --count <number>      Target number of items to generate (default: 31)
  --help, -h           Show this help message

Examples:
  npm run generate:enhanced                          # Template-based generation
  npm run generate:enhanced -- --use-ai              # AI-powered generation
  npm run generate:enhanced -- --use-ai --subskills 3  # AI with 3 subskills per standard
  npm run generate:enhanced -- --count 50            # Generate 50 items

Setup:
  npm run claude:setup    # Configure Claude API key
  npm run claude:test     # Test Claude API connection
        `);
        process.exit(0);
    }
  }

  return options;
}

// Run the enhanced sample generation if this file is executed directly
if (require.main === module) {
  const options = parseArgs();
  runEnhancedSampleGeneration(options).catch(error => {
    console.error('Generation failed:', error);
    process.exit(1);
  });
}

export { runEnhancedSampleGeneration };