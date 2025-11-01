# Math Item Bank Generator

A comprehensive K12 math item bank generator that creates assessment items based on educational standards. This system parses standard mappings, generates diverse math problems, and exports them in various formats suitable for educational platforms.

## Features

- 📊 **Standard Parsing**: Parse and organize K12 math standards from CSV files
- 🔧 **Item Generation**: Generate diverse math items (multiple choice, short answer, etc.)
- 📈 **Multiple Domains**: Supports Algebra, Geometry, Functions, Statistics, and more
- 🎯 **Difficulty Levels**: Beginning, Developing, Proficient, and Advanced items
- 💾 **Export Formats**: JSON, CSV, QTI, Moodle XML
- 🔍 **Filtering & Search**: Filter items by grade, domain, difficulty, type, and keywords
- 📝 **Rich Metadata**: Include timing, calculator requirements, and educational metadata

## Quick Start

### Prerequisites

- Node.js 16+
- TypeScript

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd math-item-bank

# Install dependencies
npm install

# Build the project
npm run build
```

### Basic Usage

```typescript
import { ItemBankManager } from './lib/item-bank';
import { ExportManager } from './lib/export-manager';

// Initialize the item bank
const itemBank = new ItemBankManager();

// Load standards from CSV
await itemBank.initializeFromCSV('./path/to/standards.csv');

// Generate items for specific standards
await itemBank.generateItemsForGrades(['9', '10'], {
  itemsPerStandard: 5,
  itemTypes: ['multiple_choice', 'short_answer'],
  difficulties: ['developing', 'proficient']
});

// Export to various formats
const itemBankData = itemBank.getItemBank();
const jsonExport = ExportManager.exportToJSON(itemBankData, {
  format: 'json',
  includeAnswers: true,
  includeMetadata: true
});

// Save to file
await ExportManager.saveToFile(jsonExport, 'item-bank.json');
```

### Running the Sample

```bash
# Run the sample generation script
npm run generate
```

This will:
1. Load standards from the CSV file
2. Generate sample items across different domains
3. Export items in multiple formats
4. Display statistics and examples

## Project Structure

```
src/
├── types/                 # TypeScript type definitions
│   └── index.ts          # Core type definitions
├── lib/                  # Core library modules
│   ├── standards-parser.ts    # CSV parsing and standard organization
│   ├── item-generator.ts      # Item generation logic
│   ├── item-bank.ts          # Main item bank manager
│   └── export-manager.ts     # Export functionality
├── examples/             # Example scripts and usage
│   └── sample-generation.ts  # Sample generation demo
└── index.ts             # Main entry point
```

## Supported Standards Format

The system expects CSV files with the following columns:
- `root_std_name`: Standard code/identifier
- `parent_standard_description`: Parent category/domain
- `standard_description`: Detailed standard description

## Item Types

- **Multiple Choice**: Questions with 4 options (1 correct, 3 distractors)
- **True/False**: Boolean questions
- **Short Answer**: Open-ended responses
- **Extended Response**: Longer written responses with rubrics
- **Performance Tasks**: Complex problem-solving scenarios

## Export Formats

### JSON
Complete item bank with all metadata:
```json
{
  "metadata": { ... },
  "standards": [ ... ],
  "items": [ ... ]
}
```

### CSV
Tabular format suitable for spreadsheet applications:
```csv
ID,Standard ID,Type,Difficulty,Title,Question,Correct Answer,Explanation,...
```

### QTI
Question and Test Interoperability format for LMS integration.

### Moodle XML
Format for importing into Moodle learning management system.

## Configuration

### Item Generation Options

```typescript
const options = {
  count: 5,                    // Number of items per standard
  itemTypes: ['multiple_choice', 'short_answer'],
  difficulties: ['developing', 'proficient'],
  useAI: false                 // Enable AI-powered generation (future)
};
```

### Filtering Options

```typescript
const filter = {
  gradeLevels: ['9', '10'],
  domains: ['Algebra', 'Geometry'],
  difficulties: ['proficient'],
  itemTypes: ['multiple_choice'],
  keywords: ['equation', 'linear'],
  calculatorAllowed: true,
  maxTime: 10  // minutes
};
```

## API Reference

### ItemBankManager

Main class for managing the item bank:

- `initializeFromCSV(filePath)`: Load standards from CSV
- `generateItemsForGrades(grades, options)`: Generate items for specific grades
- `generateItemsForDomains(domains, options)`: Generate items for specific domains
- `getFilteredItems(filter)`: Get items matching filter criteria
- `getStatistics()`: Get item bank statistics
- `addItem(item)`: Add custom item
- `updateItem(id, updates)`: Update existing item

### ExportManager

Handle exports in various formats:

- `exportToJSON(itemBank, options)`: Export to JSON format
- `exportToCSV(items, options)`: Export to CSV format
- `exportToQTI(items, options)`: Export to QTI format
- `exportToMoodleXML(items, options)`: Export to Moodle XML
- `exportStandardsToCSV(standards)`: Export standards to CSV

### StandardsParser

Parse and organize standards:

- `parseCSV(csvContent)`: Parse CSV content into standards
- `groupByGrade(standards)`: Group standards by grade level
- `groupByDomain(standards)`: Group standards by domain
- `searchStandards(standards, query)`: Search standards by keywords

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Future Enhancements

- 🤖 AI-powered item generation using GPT/Claude
- 🌐 Web interface for browsing and managing items
- 📊 Advanced analytics and reporting
- 🔗 Integration with popular LMS platforms
- 🎨 Rich media support (images, videos, interactive elements)
- 📱 Mobile-responsive preview interface
- 🔐 Role-based access and collaboration features