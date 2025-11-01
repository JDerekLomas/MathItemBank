---
name: item-bank-builder
description: Ingest OER content (OpenStax, CK-12, etc.) and extract assessment items with proper licensing attribution
version: 1.0.0
author: Derek Lomas
usage: |
  Use this skill to build the foundational item bank by:
  - Extracting assessment items from PDFs and websites
  - Aligning items to educational standards
  - Tracking licensing and attribution
  - Creating a structured database of exemplar items

  Examples:
  - "Extract math problems from this OpenStax PDF"
  - "Build an item bank from these CK-12 exercises"
  - "Process these assessment items with standard alignment"
---

# Item Bank Construction Skill

## Overview
This skill handles the foundational workflow of building a comprehensive mathematics assessment item bank from Open Educational Resources (OER).

## Capabilities

### Content Ingestion
- **PDF Processing**: Extract assessment items from PDF textbooks and workbooks
- **Web Scraping**: Pull items from educational websites and online resources
- **Structured Data**: Handle existing CSV/JSON datasets with assessment content
- **Multi-format Support**: Work with various OER formats (OpenStax, CK-12, etc.)

### Item Extraction & Classification
- **Problem Identification**: Automatically detect assessment items within content
- **Solution Extraction**: Pull corresponding solutions and explanations
- **Item Type Classification**: Categorize by question type (multiple choice, free response, etc.)
- **Difficulty Estimation**: Initial assessment of item complexity

### Standards Alignment
- **Standard Matching**: Align items to educational standards from your CSV files
- **Grade Level Assignment**: Determine appropriate grade levels
- **Topic Tagging**: Initial categorization by mathematical topics
- **Prerequisite Mapping**: Identify prerequisite knowledge

### Licensing & Attribution
- **License Detection**: Identify and record content licenses
- **Source Tracking**: Maintain complete provenance for each item
- **Attribution Generation**: Create proper attribution statements
- **Copyright Compliance**: Ensure all usage rights are respected

## Input Formats
- PDF files from OER publishers
- Web URLs of educational resources
- CSV files with standards/competencies
- Existing assessment databases
- JSON files with structured content

## Output Schema
```json
{
  "id": "unique_identifier",
  "source": {
    "publisher": "OpenStax",
    "title": "Algebra and Trigonometry",
    "url": "source_url",
    "license": "CC BY 4.0",
    "attribution": "© OpenStax"
  },
  "item": {
    "type": "multiple_choice|free_response|true_false|fill_in_blank",
    "stem": "Question text",
    "options": ["A) option1", "B) option2", ...],
    "correct_answer": "B",
    "solution": "Explanation text",
    "hints": ["hint1", "hint2"]
  },
  "alignment": {
    "standards": ["CCSS.MATH.CONTENT.HSA.CED.A.1"],
    "grade_level": "9-12",
    "topics": ["linear_equations", "word_problems"],
    "difficulty_estimate": "medium"
  },
  "metadata": {
    "extracted_date": "2024-01-15",
    "confidence_score": 0.85,
    "review_status": "pending"
  }
}
```

## Workflow Process

### 1. Content Analysis
- Analyze document structure and identify assessment sections
- Extract questions, answers, and explanatory content
- Parse mathematical notation and formatting

### 2. Item Structuring
- Convert extracted content into standardized JSON format
- Separate question stems from options and solutions
- Preserve mathematical formatting and notation

### 3. Standards Alignment
- Match item content against your standards database
- Assign appropriate grade levels and topics
- Calculate confidence scores for alignments

### 4. Quality Assurance
- Validate extracted items for completeness
- Check for mathematical accuracy
- Flag items requiring human review

### 5. Database Integration
- Add processed items to your item bank database
- Update indexes and search capabilities
- Generate reports on coverage gaps

## Best Practices

### Content Selection
- Prioritize high-quality, well-structured OER content
- Focus on items with clear solutions and explanations
- Ensure content matches your target standards

### Quality Standards
- Maintain high accuracy in extraction (aim for >90% confidence)
- Preserve mathematical notation precisely
- Include complete solutions and explanations

### Licensing Compliance
- Always track source and license information
- Generate proper attribution statements
- Respect usage restrictions and requirements

## Integration with Other Skills
This skill provides the foundation for:
- **Subskill Decomposer**: Uses standards-aligned items as examples
- **Metadata Tagger**: Enhances the initial metadata generated here
- **Variation Generator**: Uses extracted items as templates
- **New Item Generator**: Leverages extracted items as exemplars

## Usage Examples

**Basic Extraction:**
```
Extract all assessment items from this OpenStax Algebra PDF and align them to the high school standards in my CSV file.
```

**Batch Processing:**
```
Process these 5 OER PDFs, extract all mathematics assessment items, and create an initial item bank with proper licensing attribution.
```

**Targeted Collection:**
```
Find all linear equation problems from these sources that align to CCSS.MATH.CONTENT.HSA.CED.A.1 and extract them with solutions.
```

## Quality Metrics
- Extraction accuracy: >90%
- Standards alignment confidence: >80%
- Complete attribution information: 100%
- Mathematical notation preservation: >95%