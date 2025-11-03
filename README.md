# Math Item Bank

🚀 **AI-Powered Comprehensive K-12 Mathematics Assessment Generation Platform**

A sophisticated system for generating, evaluating, and managing high-quality mathematics assessment items aligned with educational standards. Built with TypeScript/Next.js and enhanced with Claude Code skills for professional-grade item development.

## 🎯 Vision

Transform mathematics assessment creation through AI-powered workflows that:
- **Ingest** existing OER content (OpenStax, CK-12, etc.)
- **Decompose** standards into assessable subskills
- **Generate** high-quality items with variation capabilities
- **Evaluate** using research-backed quality frameworks
- **Ensure** accessibility, equity, and standards alignment

## ✨ Key Features

### 🔄 AI-Powered Workflow System
Five interconnected Claude Code skills guide the complete item development lifecycle:

1. **[Item Bank Construction](.claude/skills/item-bank-builder/)** – OER content ingestion and extraction
2. **[Subskill Decomposition](.claude/skills/subskill-decomposer/)** – Standards analysis and framework creation
3. **[Metadata Tagging](.claude/skills/metadata-tagger/)** – Organization and searchability enhancement
4. **[Variation Generation](.claude/skills/variation-generator/)** – Efficient item expansion through proven patterns
5. **[New Item Generation](.claude/skills/new-item-generator/)** – Novel item creation for coverage gaps

### 🔍 Professional Evaluation Suite
Research-backed evaluation skills ensuring assessment quality:

- **[Item Quality Evaluation](.claude/skills/item-evaluator/)** – AERA/APA/NCME standards with Evidence-Centered Design
- **[Distractor Analysis](.claude/skills/distractor-analysis/)** – IRT-based statistical analysis with misconception targeting
- **[Alignment Validation](.claude/skills/alignment-validator/)** – Webb's alignment methodology and DOK analysis
- **[Accessibility Checking](.claude/skills/formatting-checker/)** – WCAG 2.1 compliance and mathematical accessibility
- **[Equity Evaluation](.claude/skills/equity-evaluator/)** – Cultural bias analysis and differential impact assessment

### 🛠 Core Capabilities
- **Standards-Based Design** – Full alignment with CCSS, state standards, and custom frameworks
- **Multiple Item Types** – Multiple choice, free response, performance tasks, technology-enhanced
- **Quality Assurance** – Multi-dimensional evaluation with statistical validation
- **Accessibility First** – WCAG 2.1 AA compliance with mathematical notation support
- **Equity Focused** – Cultural responsiveness and bias prevention frameworks
- **Export Flexibility** – JSON, CSV, QTI, Moodle formats for seamless integration

## 🚀 Getting Started

### Prerequisites
- Node.js 16.0.0+
- Claude Code (for AI skill capabilities)

### Installation
```bash
git clone https://github.com/JDerekLomas/MathItemBank.git
cd MathItemBank
npm install
```

### Development
```bash
# Start development server
npm run dev

# Generate sample items
npm run generate

# Enhanced generation with evaluation
npm run generate:enhanced

# Type checking
npm run type-check

# Linting
npm run lint
```

### Claude Code Skills Setup
The AI skills are automatically available in `.claude/skills/`. Each skill includes comprehensive documentation and usage examples.

### Sample Usage
```typescript
import { generateItem, evaluateItem } from './lib/item-generator';

// Generate a new assessment item
const result = await generateItem({
  standard: mathStandard,
  itemType: 'multiple_choice',
  difficulty: 'proficient',
  context: 'real-world application'
});

// Evaluate item quality
const evaluation = await evaluateItem(result.item);
```

### Traditional Usage (Library Mode)
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
```

### Running Examples
```bash
# Run the sample generation script
npm run generate
```

This will:
1. Load standards from the CSV file
2. Generate sample items across different domains
3. Export items in multiple formats
4. Display statistics and examples

## 🏗 Architecture

### Data Model
```typescript
interface MathItem {
  id: string;
  standardId: string;
  subskillIds: string[];
  type: ItemType;
  difficulty: Difficulty;
  title: string;
  question: string;
  correctAnswer: string | number;
  distractors?: (string | number)[];
  explanation: string;
  hints: string[];
  metadata: ItemMetadata;
}
```

### Project Structure
```
MathItemBank/
├── .claude/skills/               # 🤖 Claude Code AI Skills
│   ├── item-bank-builder/        # OER content ingestion
│   ├── subskill-decomposer/      # Standards analysis
│   ├── metadata-tagger/          # Organization enhancement
│   ├── variation-generator/      # Item expansion
│   ├── new-item-generator/       # Novel creation
│   ├── item-evaluator/           # Quality assessment
│   ├── distractor-analysis/      # Statistical analysis
│   ├── alignment-validator/      # Standards alignment
│   ├── formatting-checker/       # Accessibility compliance
│   └── equity-evaluator/         # Bias analysis
├── src/
│   ├── types/                    # TypeScript type definitions
│   │   └── index.ts              # Core type definitions
│   ├── lib/                      # Core library modules
│   │   ├── standards-parser.ts   # CSV parsing and organization
│   │   ├── item-generator.ts     # Item generation logic
│   │   ├── item-bank.ts          # Main item bank manager
│   │   └── export-manager.ts     # Export functionality
│   ├── app/                      # Next.js app router pages
│   ├── examples/                 # Example scripts and usage
│   │   ├── sample-generation.ts  # Basic generation demo
│   │   └── enhanced-sample-generation.ts # Advanced demo
│   └── scripts/                  # Utility scripts
└── temp_clone/                   # Cloned repository content
```

### Item Generation Pipeline
1. **Standard Analysis** → Subskill decomposition
2. **Content Creation** → AI generation with exemplar guidance
3. **Quality Evaluation** → Multi-dimensional assessment
4. **Accessibility Review** → WCAG compliance checking
5. **Equity Validation** → Bias and fairness analysis
6. **Metadata Enhancement** → Searchability and organization

## 📊 Supported Standards

### Mathematics Standards
- **Common Core State Standards (CCSS)** – K-12 Mathematics
- **State Standards** – Customizable framework support
- **International Standards** – Adaptable to various curricula

### Grade Levels
- **Elementary** (K-5) – Foundations and conceptual understanding
- **Middle School** (6-8) – Procedural fluency and application
- **High School** (9-12) – Advanced mathematical reasoning

### Content Domains
- **Numbers & Operations** – Arithmetic, number theory
- **Algebra** – Equations, functions, mathematical modeling
- **Geometry** – Spatial reasoning, measurement, proof
- **Statistics & Probability** – Data analysis, probability theory
- **Mathematical Practices** – Problem solving, reasoning, communication

## 📈 Item Types

### Traditional Formats
- **Multiple Choice** – Standard 4-5 option items
- **True/False** – Binary response items
- **Short Answer** – Brief constructed responses
- **Extended Response** – Detailed explanations and proofs

### Enhanced Formats
- **Performance Tasks** – Multi-step problem solving
- **Drag & Drop** – Interactive categorization and ordering
- **Graphing** – Coordinate plane and function visualization
- **Equation Editor** – Mathematical expression input

### Technology-Enhanced
- **Dynamic Geometry** – Interactive geometric constructions
- **Simulations** – Mathematical modeling environments
- **Adaptive Items** – Response-based branching scenarios

## 🔬 Quality Frameworks

### Assessment Standards
- **AERA/APA/NCME Standards** – Educational testing validity
- **Webb's Alignment Methodology** – Standards alignment criteria
- **Depth of Knowledge (DOK)** – Cognitive demand analysis
- **Evidence-Centered Design** – Validity argument framework

### Accessibility Standards
- **WCAG 2.1 AA** – Web accessibility compliance
- **Mathematical Accessibility** – LaTeX/MathML screen reader support
- **Universal Design for Learning** – Multiple means of representation

### Equity Frameworks
- **Culturally Responsive Pedagogy** – Inclusive content development
- **Differential Item Functioning** – Statistical fairness analysis
- **Bias Detection** – Cultural and socioeconomic equity evaluation

## 💾 Export Formats

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

## 🎓 Educational Impact

### For Teachers
- **Time Savings** – Rapid generation of high-quality items
- **Standards Alignment** – Guaranteed curriculum coverage
- **Differentiation** – Items at multiple difficulty levels
- **Assessment Design** – Professional-quality test creation

### For Students
- **Fair Assessment** – Bias-free, accessible evaluation
- **Relevant Context** – Culturally responsive problems
- **Clear Expectations** – Well-constructed, unambiguous items
- **Learning Support** – Integrated hints and explanations

### For Administrators
- **Quality Assurance** – Research-backed item validation
- **Equity Compliance** – Documentation of fairness measures
- **Data Integration** – Export to major assessment platforms
- **Cost Efficiency** – Reduced dependence on publishers

## 🔧 Technical Stack

### Frontend
- **Next.js 14** – React framework with App Router
- **TypeScript** – Type safety and developer experience
- **Tailwind CSS** – Utility-first styling
- **Lucide React** – Modern icon library

### AI/ML Integration
- **Claude Code Skills** – Modular AI capabilities
- **Natural Language Processing** – Content analysis and generation
- **Statistical Analysis** – IRT and psychometric modeling

### Accessibility
- **MathJax** – Mathematical notation rendering
- **WCAG Compliance** – Screen reader and keyboard navigation
- **Responsive Design** – Mobile and cross-platform compatibility

## 🤝 Contributing

We welcome contributions to enhance the Math Item Bank platform:

### Development Areas
- **AI Skills** – New evaluation and generation capabilities
- **Standard Frameworks** – Additional state and international standards
- **Item Types** – New interactive and adaptive formats
- **Accessibility** – Enhanced support for diverse learners
- **Research** – Validation studies and effectiveness metrics

### Contribution Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Quality Standards
- **TypeScript** – Strong typing for all components
- **Testing** – Comprehensive test coverage
- **Documentation** – Clear API documentation
- **Accessibility** – WCAG compliance for all features

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

### Research Foundations
- **AERA, APA, NCME** – Standards for Educational and Psychological Testing
- **Norman Webb** – Alignment methodology and Depth of Knowledge framework
- **James Pellegrino** – Evidence-centered design principles
- **Gloria Ladson-Billings** – Culturally responsive pedagogy research

### Open Source Inspiration
- **OpenStax** – High-quality OER mathematics content
- **Khan Academy** – Mathematical practice and assessment approaches
- **Desmos** – Interactive mathematical visualization
- **MathJax Consortium** – Mathematical accessibility standards

## 📞 Contact & Support

- **GitHub Issues** – [Report bugs and request features](https://github.com/JDerekLomas/MathItemBank/issues)
- **Discussions** – [Community questions and ideas](https://github.com/JDerekLomas/MathItemBank/discussions)
- **Documentation** – [Detailed guides and API reference](https://github.com/JDerekLomas/MathItemBank/wiki)

---

🎓 **Transforming Mathematics Assessment Through AI-Powered Excellence**

Built with ❤️ for educators, students, and the mathematics education community.