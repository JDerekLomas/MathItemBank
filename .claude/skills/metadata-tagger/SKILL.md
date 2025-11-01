---
name: metadata-tagger
description: Tag assessment items with metadata for subskill, difficulty, format, and context to make existing items searchable and usable
version: 1.0.0
author: Derek Lomas
usage: |
  Use this skill to organize and enhance existing assessment items:
  - Tag items by subskill alignment
  - Assess difficulty levels and cognitive demand
  - Categorize by format and context
  - Identify coverage gaps in the item bank
  - Make items searchable and filterable

  Examples:
  - "Tag these algebra items by subskill and difficulty"
  - "Organize this item bank by standard and format"
  - "Analyze coverage gaps in my assessment items"
---

# Metadata Tagging Skill

## Overview
This skill transforms raw assessment items into organized, searchable, and usable resources by applying comprehensive metadata tagging. It makes existing items discoverable and helps identify curriculum coverage gaps.

## Core Purpose
- **Organization**: Transform raw items into structured, searchable content
- **Usability**: Enable teachers to find exactly the items they need
- **Gap Analysis**: Identify where curriculum coverage is weak or missing
- **Quality Control**: Assess and tag item quality indicators

## Capabilities

### Subskill Alignment Tagging
- **Precise Matching**: Align items to specific subskills from your framework
- **Multiple Alignment**: Handle items addressing multiple subskills
- **Confidence Scoring**: Rate accuracy of each alignment (0-1 scale)
- **Evidence Tags**: Document why an item matches a subskill

### Difficulty Assessment
- **Cognitive Demand**: Assess using Depth of Knowledge (DOK) levels
- **Mathematical Complexity**: Evaluate procedural vs. conceptual difficulty
- **Success Rate Prediction**: Estimate student success probabilities
- **Differentiation Potential**: Identify scaffolding opportunities

### Format Classification
- **Item Type**: Multiple choice, free response, performance task, etc.
- **Response Format**: Selected response, constructed response, explanation
- **Technology Enhanced**: Calculator, graphing tool, dynamic geometry
- **Accommodation Friendly**: Accessibility features and modifications

### Context Analysis
- **Real-World Application**: Identify authentic contexts vs. abstract
- **Cultural Relevance**: Assess inclusivity and relevance
- **Interdisciplinary Connections**: Note connections to other subjects
- **Mathematical Practices**: Identify which practices are engaged

### Quality Metrics
- **Content Accuracy**: Mathematical correctness verification
- **Clarity Score**: Readability and ambiguity assessment
- **Solution Quality**: Completeness and clarity of provided solutions
- **Bias Screening**: Cultural, gender, and socioeconomic bias detection

## Input Formats
- Raw assessment items from Item Bank Construction
- Teacher-created items
- Publisher item banks
- Legacy assessment databases
- JSON/CSV files with item content

## Output Schema
```json
{
  "item_id": "unique_identifier",
  "metadata": {
    "subskills": [
      {
        "subskill_id": "HSA.CED.A.1.1",
        "subskill_title": "Translate Word Problems to Equations",
        "alignment_confidence": 0.92,
        "primary_focus": true,
        "evidence": "Item requires translating a rental car scenario into algebraic equation"
      }
    ],
    "difficulty": {
      "dok_level": 2,
      "complexity_score": 0.65,
      "estimated_success_rate": 0.74,
      "reasoning": "Requires translation and equation setup, but routine procedures"
    },
    "format": {
      "item_type": "multiple_choice",
      "response_type": "selected_response",
      "options_count": 4,
      "technology_required": "none",
      "estimated_time": 2
    },
    "context": {
      "setting": "real_world",
      "theme": "transportation",
      "cultural_relevance": "high",
      "authenticity": "moderate"
    },
    "practices": [
      "MP1: Make sense of problems",
      "MP2: Reason abstractly",
      "MP4: Model with mathematics"
    ],
    "quality": {
      "accuracy_score": 1.0,
      "clarity_score": 0.85,
      "solution_quality": 0.90,
      "bias_flagged": false
    }
  },
  "usage_data": {
    "times_used": 0,
    "average_performance": null,
    "teacher_rating": null,
    "student_feedback": null
  },
  "tags": [
    "linear_equations",
    "word_problems",
    "real_world_context",
    "algebraic_modeling"
  ],
  "search_keywords": [
    "car rental",
    "cost equation",
    "variable identification",
    "real-world math"
  ]
}
```

## Tagging Process

### 1. Content Analysis
- **Mathematical Content Extraction**: Identify core concepts and procedures
- **Language Processing**: Analyze question stems and options
- **Solution Analysis**: Examine provided solutions for depth
- **Notation Review**: Check mathematical symbols and formatting

### 2. Subskill Matching
- **Pattern Recognition**: Identify indicators of each subskill
- **Keyword Analysis**: Match vocabulary to subskill definitions
- **Cognitive Demand**: Assess what thinking the item requires
- **Context Evaluation**: Consider how mathematics is applied

### 3. Difficulty Assessment
- **Procedural Complexity**: Count steps and complexity of operations
- **Conceptual Depth**: Evaluate level of abstract reasoning required
- **Cognitive Load**: Assess working memory demands
- **Prior Knowledge**: Identify prerequisite skills needed

### 4. Format Classification
- **Structure Analysis**: Identify item format and components
- **Response Requirements**: Determine what students must produce
- **Interface Needs**: Assess technology or material requirements
- **Scoring Implications**: Consider evaluation methods

### 5. Quality Assurance
- **Accuracy Verification**: Check mathematical correctness
- **Clarity Assessment**: Evaluate readability and ambiguity
- **Bias Screening**: Look for cultural or demographic biases
- **Solution Validation**: Ensure solutions are complete and correct

## Coverage Gap Analysis

### Frequency Analysis
```json
{
  "subskill_coverage": {
    "HSA.CED.A.1.1": {
      "item_count": 15,
      "adequate": true,
      "difficulty_distribution": {
        "easy": 3,
        "medium": 8,
        "hard": 4
      }
    },
    "HSA.CED.A.1.2": {
      "item_count": 2,
      "adequate": false,
      "recommended_additions": 8
    }
  },
  "format_distribution": {
    "multiple_choice": 0.65,
    "free_response": 0.25,
    "performance_task": 0.10
  },
  "context_analysis": {
    "real_world": 0.40,
    "abstract": 0.35,
    "pure_math": 0.25
  }
}
```

### Gap Identification
- **Insufficient Items**: Flag subskills with fewer than 5 items
- **Difficulty Imbalance**: Identify over/under-representation of difficulty levels
- **Format Limitations**: Highlight reliance on single item types
- **Context Gaps**: Find missing themes or applications

## Integration with Other Skills

### Input Dependencies
- **Item Bank Construction**: Provides raw items for tagging
- **Subskill Decomposer**: Supplies subskill framework for alignment

### Output Benefits
- **Variation Generator**: Identifies which items need more variations
- **New Item Generation**: Pinpoints exact gaps to fill
- **Search and Discovery**: Enables precise item retrieval

## Quality Assurance Protocols

### Validation Checks
- [ ] All items have at least one subskill alignment
- [ ] Difficulty scores are consistent across similar items
- [ ] Format classifications match actual item structure
- [ ] Quality metrics meet minimum thresholds
- [ ] No bias flags remain unresolved

### Review Workflow
1. **Automated Tagging**: Initial AI-based metadata assignment
2. **Confidence Scoring**: Flag low-confidence alignments for review
3. **Human Validation**: Expert review of uncertain classifications
4. **Feedback Integration**: Use validation results to improve tagging accuracy

## Usage Examples

**Batch Tagging:**
```
Tag these 50 algebra items with subskill alignments, difficulty levels, and format classifications. Focus on identifying coverage gaps.
```

**Targeted Analysis:**
```
Analyze these geometry items for DOK levels and mathematical practices emphasized. Create a coverage report for transformation standards.
```

**Quality Enhancement:**
```
Review these word problems for cultural relevance and authenticity. Suggest improvements to increase student engagement.
```

## Search and Discovery

Once tagged, items become searchable by:
- **Subskill**: Find all items for specific learning targets
- **Difficulty**: Locate items at appropriate challenge levels
- **Format**: Filter by assessment method preferences
- **Context**: Find relevant, engaging applications
- **Quality**: Select high-quality, validated items
- **Gaps**: Identify what's missing from the collection

## Quality Metrics
- Tagging accuracy: >90%
- Subskill alignment confidence: >85%
- Gap identification precision: >80%
- Teacher usability rating: >4.0/5.0
- Search relevance: >90%