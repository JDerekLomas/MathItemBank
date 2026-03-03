#!/usr/bin/env ts-node

/**
 * Simple Grade 6 math items generation using existing infrastructure
 */

import { promises as fs } from 'fs';
import { execSync } from 'child_process';

async function generateGrade6Items() {
  console.log('🎓 Grade 6 Math Item Bank Generation');
  console.log('====================================\n');

  try {
    // Backup original standards file
    console.log('📦 Backing up original standards...');
    try {
      await fs.copyFile('sample-standards.csv', 'sample-standards-backup.csv');
      console.log('✅ Backed up original standards');
    } catch (error) {
      console.log('⚠️  No original standards file to backup');
    }

    // Replace standards with Grade 6 standards
    console.log('\n📚 Loading Grade 6 standards...');
    await fs.copyFile('grade6-standards.csv', 'sample-standards.csv');
    console.log('✅ Replaced standards with Grade 6 content');

    // Count Grade 6 standards
    const grade6Content = await fs.readFile('grade6-standards.csv', 'utf-8');
    const lines = grade6Content.split('\n').filter(line => line.trim());
    const standardCount = lines.length - 1; // Subtract header
    console.log(`📊 Found ${standardCount} Grade 6 standards`);

    // Show domains breakdown
    const domains = new Set();
    lines.slice(1).forEach(line => {
      const columns = line.split(',');
      if (columns.length >= 4) {
        domains.add(columns[3].replace(/"/g, ''));
      }
    });
    console.log('📈 Domains covered:', Array.from(domains).join(', '));

    // Run the enhanced generation with AI
    console.log('\n🚀 Starting AI-powered item generation...');
    console.log('This will generate subskills and items for all Grade 6 standards...\n');

    try {
      // Run the enhanced generation command
      console.log('🤖 Generating with Claude AI...');
      execSync('npm run generate:enhanced -- --use-ai --count 50', {
        stdio: 'inherit',
        encoding: 'utf-8'
      });

      console.log('\n🎉 Grade 6 item bank generation completed successfully!');

      // Restore original standards if backup exists
      try {
        await fs.copyFile('sample-standards-backup.csv', 'sample-standards.csv');
        await fs.unlink('sample-standards-backup.csv');
        console.log('✅ Restored original standards file');
      } catch (error) {
        console.log('ℹ️  No original standards to restore');
      }

      console.log('\n📊 What was generated:');
      console.log(`   • ${standardCount} Grade 6 math standards`);
      console.log(`   • AI-generated subskills for each standard`);
      console.log(`   • Multiple items per subskill`);
      console.log(`   • Comprehensive coverage across 6th grade topics`);

      console.log('\n🎯 Topics covered:');
      console.log('   • Ratios & Proportional Relationships');
      console.log('   • The Number System (fractions, decimals, negatives)');
      console.log('   • Expressions & Equations');
      console.log('   • Geometry (area, volume, coordinates)');
      console.log('   • Statistics & Probability');

      console.log('\n📋 Next steps:');
      console.log('• Organize the data: npm run organize');
      console.log('• Start the web viewer: npm run dev');
      console.log('• View your Grade 6 items at http://localhost:3000');
      console.log('• Deploy to Vercel: vercel --prod --yes');

    } catch (generationError) {
      console.error('❌ Generation failed:', generationError instanceof Error ? generationError.message : 'Unknown error');

      // Restore original standards on error
      try {
        await fs.copyFile('sample-standards-backup.csv', 'sample-standards.csv');
        await fs.unlink('sample-standards-backup.csv');
        console.log('✅ Restored original standards file');
      } catch (error) {
        console.log('ℹ️  No original standards to restore');
      }

      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Setup failed:', error instanceof Error ? error.message : 'Unknown error');

    // Try to restore original standards
    try {
      await fs.copyFile('sample-standards-backup.csv', 'sample-standards.csv');
      await fs.unlink('sample-standards-backup.csv');
    } catch (error) {
      // Ignore restore errors
    }

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