import { ItemBankManager } from '../lib/item-bank';
import { ExportManager } from '../lib/export-manager';
import { MathItemGenerator } from '../lib/item-generator';
import { MathItem } from '../types';

/**
 * Sample script demonstrating how to use the Math Item Bank
 */
async function runSampleGeneration() {
  console.log('🎓 Math Item Bank Sample Generation');
  console.log('=====================================');

  // Initialize the item bank manager
  const itemBank = new ItemBankManager();

  try {
    // Load standards from the CSV file
    console.log('\n📊 Loading math standards from CSV...');
    await itemBank.initializeFromCSV('/Users/dereklomas/Downloads/standard_mapping.csv');

    // Display statistics about loaded standards
    const standards = itemBank.getStandards();
    console.log(`✅ Loaded ${standards.length} math standards`);

    // Group standards by grade level
    const standardsByGrade = standards.reduce((acc, standard) => {
      acc[standard.gradeLevel] = (acc[standard.gradeLevel] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log('\n📈 Standards by Grade Level:');
    Object.entries(standardsByGrade)
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .forEach(([grade, count]) => {
        console.log(`   Grade ${grade}: ${count} standards`);
      });

    // Group standards by domain
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

    // Generate sample items for a few standards
    console.log('\n🔧 Generating sample math items...');

    // Select a few diverse standards
    const sampleStandards = [
      standards.find(s => s.domain === 'Algebra' && s.description.includes('equation')),
      standards.find(s => s.domain === 'Geometry' && s.description.includes('triangle')),
      standards.find(s => s.domain === 'Functions' && s.description.includes('linear')),
      standards.find(s => s.domain === 'Statistics & Probability'),
      standards.find(s => s.domain === 'Number & Quantity' && s.description.includes('complex'))
    ].filter((s): s is typeof standards[0] => Boolean(s));

    console.log(`\n📝 Selected ${sampleStandards.length} diverse standards for item generation`);

    // Generate items for sample standards
    const generatedItems: MathItem[] = [];
    for (const standard of sampleStandards) {
      console.log(`\n🎯 Generating items for: ${standard.domain} - ${standard.cluster}`);
      console.log(`   Standard: ${standard.description.substring(0, 100)}...`);

      const items = await MathItemGenerator.generateItems(
        standard,
        {
          count: 2,
          itemTypes: ['multiple_choice', 'short_answer'],
          difficulties: ['developing', 'proficient'],
          useAI: false // Use template generation for this demo
        }
      );

      items.forEach(result => {
        if (result.success && result.item) {
          generatedItems.push(result.item);
          console.log(`   ✅ Generated ${result.item.type} item (Difficulty: ${result.item.difficulty})`);
        } else {
          console.log(`   ❌ Failed: ${result.error}`);
        }
      });
    }

    // Add generated items to the bank
    itemBank.addItems(generatedItems);

    // Display generated items
    console.log('\n📋 Generated Sample Items:');
    console.log('===========================');
    generatedItems.forEach((item, index) => {
      console.log(`\n${index + 1}. ${item.title}`);
      console.log(`   Type: ${item.type} | Difficulty: ${item.difficulty} | Time: ${item.metadata.estimatedTimeMinutes} min`);
      console.log(`   Question: ${item.question}`);
      console.log(`   Answer: ${item.correctAnswer}`);
      console.log(`   Explanation: ${item.explanation}`);
      console.log(`   Keywords: ${item.metadata.keywords.join(', ')}`);
    });

    // Get item bank statistics
    const stats = itemBank.getStatistics();
    console.log('\n📊 Item Bank Statistics:');
    console.log('========================');
    console.log(`Total Items: ${stats.totalItems}`);
    console.log('Items by Difficulty:');
    Object.entries(stats.itemsByDifficulty).forEach(([difficulty, count]) => {
      console.log(`   ${difficulty}: ${count}`);
    });
    console.log('Items by Type:');
    Object.entries(stats.itemsByType).forEach(([type, count]) => {
      console.log(`   ${type}: ${count}`);
    });

    // Export sample items in different formats
    console.log('\n💾 Exporting sample items...');
    const sampleItemBank = itemBank.getItemBank();

    // Export to JSON
    const jsonExport = ExportManager.exportToJSON(sampleItemBank, {
      format: 'json',
      includeAnswers: true,
      includeMetadata: true
    });
    await ExportManager.saveToFile(jsonExport, './sample-item-bank.json');
    console.log('✅ Exported to JSON: sample-item-bank.json');

    // Export to CSV
    const csvExport = ExportManager.exportToCSV(generatedItems, {
      format: 'csv',
      includeAnswers: true,
      includeMetadata: true
    });
    await ExportManager.saveToFile(csvExport, './sample-items.csv');
    console.log('✅ Exported to CSV: sample-items.csv');

    // Export standards to CSV
    const standardsExport = ExportManager.exportStandardsToCSV(standards.slice(0, 50)); // Export first 50 standards
    await ExportManager.saveToFile(standardsExport, './sample-standards.csv');
    console.log('✅ Exported 50 standards to CSV: sample-standards.csv');

    // Example of filtering items
    console.log('\n🔍 Filtering Examples:');
    console.log('=====================');

    const algebraItems = itemBank.getFilteredItems({
      domains: ['Algebra']
    });
    console.log(`Algebra items: ${algebraItems.length}`);

    const developingItems = itemBank.getFilteredItems({
      difficulties: ['developing']
    });
    console.log(`Developing level items: ${developingItems.length}`);

    const multipleChoiceItems = itemBank.getFilteredItems({
      itemTypes: ['multiple_choice']
    });
    console.log(`Multiple choice items: ${multipleChoiceItems.length}`);

    const keywordItems = itemBank.getFilteredItems({
      keywords: ['equation']
    });
    console.log(`Items with 'equation' keyword: ${keywordItems.length}`);

    console.log('\n🎉 Sample generation completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Review generated items in the exported files');
    console.log('2. Customize item generation parameters');
    console.log('3. Add AI integration for more sophisticated item generation');
    console.log('4. Implement web interface for browsing and managing items');
    console.log('5. Add assessment creation and scoring functionality');

  } catch (error) {
    console.error('❌ Error during sample generation:', error);
  }
}

// Run the sample generation if this file is executed directly
if (require.main === module) {
  runSampleGeneration();
}

export { runSampleGeneration };