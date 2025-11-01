---
name: variation-generator
description: Generate 3-5 variations of existing assessment items by changing numbers, contexts, and scenarios while preserving the same mathematical skill and difficulty level
version: 1.0.0
author: Derek Lomas
usage: |
  Use this skill to expand your item bank efficiently:
  - Create variations of proven, high-quality items
  - Change numbers, names, and contexts while preserving mathematical structure
  - Maintain consistent difficulty levels across variations
  - Generate multiple parallel forms for assessment

  Examples:
  - "Create 5 variations of this linear equation problem"
  - "Generate parallel versions of this assessment item"
  - "Change the context of these word problems while keeping the math the same"
---

# Variation Generation Skill

## Overview
This skill efficiently expands your item bank by creating high-quality variations of proven assessment items. It's a **low-risk expansion strategy** that maintains mathematical integrity while providing fresh contexts and scenarios.

## Core Philosophy
**Better to vary what works than create from scratch.** Variation generation preserves the mathematical structure and cognitive demand while updating surface features to create fresh assessment opportunities.

## Capabilities

### Mathematical Structure Preservation
- **Core Concept Retention**: Maintain the exact mathematical skill being assessed
- **Solution Strategy Consistency**: Preserve problem-solving approaches
- **Difficulty Level Stability**: Keep cognitive demand constant across variations
- **Complexity Control**: Ensure variations don't accidentally increase/decrease difficulty

### Surface Feature Variation
- **Numerical Changes**: Modify numbers while preserving mathematical relationships
- **Context Substitution**: Replace scenarios with equivalent real-world situations
- **Name/Character Updates**: Use diverse, inclusive names and settings
- **Unit Conversions**: Change measurement systems (metric/imperial) appropriately

### Template Generation
- **Parameter Identification**: Identify what elements can be varied safely
- **Constraint Definition**: Establish rules for acceptable variations
- **Validation Framework**: Check that variations remain mathematically sound
- **Quality Assurance**: Ensure all variations meet quality standards

### Parallel Form Creation
- **Assessment Equating**: Create equivalent forms for testing purposes
- **Answer Key Alignment**: Generate corresponding answer keys for all variations
- **Scoring Consistency**: Maintain identical scoring rubrics across variations
- **Statistical Equivalence**: Aim for similar statistical properties

## Input Requirements
- **Source Item**: High-quality, validated assessment item
- **Variation Parameters**: What elements should be changed
- **Quantity**: Number of variations desired (3-5 recommended)
- **Constraints**: Any restrictions on changes (grade level, content restrictions)

## Output Schema
```json
{
  "source_item": {
    "id": "original_item_123",
    "stem": "A car rental company charges $30 per day plus $0.20 per mile. If a customer rents a car for 2 days and drives 150 miles, what is the total cost?",
    "type": "free_response",
    "solution": "Total cost = 30(2) + 0.20(150) = 60 + 30 = $90",
    "subskill": "HSA.CED.A.1.1"
  },
  "variation_template": {
    "variable_elements": [
      "base_rate_daily",
      "rate_per_unit",
      "time_quantity",
      "usage_quantity"
    ],
    "constraints": {
      "total_cost_range": [20, 200],
      "number_types": "whole_numbers_or_decimals",
      "context_categories": ["transportation", "services", "rentals"]
    }
  },
  "variations": [
    {
      "id": "variation_123_1",
      "stem": "A bike rental service charges $15 per hour plus $0.05 per minute over the first hour. If someone rents a bike for 3 hours and uses it for 180 minutes total, what is the total cost?",
      "solution": "Total cost = 15(3) + 0.05(180-60) = 45 + 6 = $51",
      "parameters": {
        "base_rate_daily": 15,
        "rate_per_unit": 0.05,
        "time_quantity": 3,
        "usage_quantity": 180
      },
      "validation": {
        "mathematical_equivalence": true,
        "difficulty_match": true,
        "solution_verification": "correct"
      }
    },
    {
      "id": "variation_123_2",
      "stem": "A gym membership costs $40 per month plus $2 per fitness class. If a member signs up for 3 months and attends 8 classes each month, what is the total cost?",
      "solution": "Total cost = 40(3) + 2(8×3) = 120 + 48 = $168",
      "parameters": {
        "base_rate_daily": 40,
        "rate_per_unit": 2,
        "time_quantity": 3,
        "usage_quantity": 24
      }
    }
  ],
  "quality_metrics": {
    "mathematical_consistency": 0.98,
    "difficulty_variance": 0.12,
    "context_diversity": 0.85,
    "validation_passed": true
  }
}
```

## Variation Strategies

### 1. Numerical Variation
**When to use**: Items where specific numbers aren't critical to understanding
**Approach**:
- Maintain proportional relationships
- Preserve number types (whole numbers, fractions, decimals)
- Keep within grade-appropriate ranges
- Avoid creating awkward or unrealistic results

### 2. Context Substitution
**When to use**: Word problems with real-world scenarios
**Approach**:
- Preserve the mathematical relationship structure
- Use diverse, inclusive scenarios
- Maintain age-appropriate contexts
- Ensure cultural relevance and authenticity

### 3. Unit Conversion
**When to use**: Measurement problems or real-world applications
**Approach**:
- Convert between metric and imperial units
- Adjust numbers appropriately for the new units
- Maintain the same level of computational difficulty
- Ensure unit conversions are accurate

### 4. Variable Re-parameterization
**When to use**: Algebraic expressions or equation solving
**Approach**:
- Change coefficients while preserving solution methods
- Maintain similar equation structure
- Keep domain/range considerations appropriate
- Preserve the complexity of solving process

## Quality Control Framework

### Mathematical Equivalence Checks
- [ ] Solution method remains identical
- [ ] Steps required are the same
- [ ] Mathematical concepts tested unchanged
- [ ] Answer format is consistent

### Difficulty Consistency Verification
- [ ] Cognitive demand level maintained
- [ ] Number of solution steps unchanged
- [ ] Prior knowledge requirements identical
- [ ] Working memory demands similar

### Context Appropriateness Review
- [ ] Scenarios are age-appropriate
- [ ] Contexts are mathematically meaningful
- [ ] Cultural references are inclusive
- [ ] Real-world authenticity maintained

### Technical Accuracy Validation
- [ ] All calculations are correct
- [ ] Answer keys match variations
- [ ] Mathematical notation is proper
- [ ] Solutions are complete and clear

## Specialized Variation Types

### Linear Equation Variations
**Preserve**: Relationship structure, solution method
**Vary**: Coefficients, contexts, variable representations
**Example**: Cost problems, rate problems, mixture problems

### Geometric Variations
**Preserve**: Geometric relationships, proof structures
**Vary**: Specific measurements, orientations, applications
**Example**: Area/volume calculations, similarity problems

### Statistical Variations
**Preserve**: Statistical concepts, analysis methods
**Vary**: Data sets, contexts, specific values
**Example**: Mean/median calculations, probability scenarios

### Function Variations
**Preserve**: Function properties, transformation types
**Vary**: Specific functions, domains, applications
**Example**: Quadratic analysis, graph transformations

## Integration with Other Skills

### Input Dependencies
- **Metadata Tagger**: Provides subskill alignment to preserve
- **Item Bank Construction**: Supplies source items to vary

### Output Benefits
- **Assessment Creation**: Enables creation of parallel test forms
- **Differentiation**: Provides multiple practice opportunities
- **Gap Filling**: Quickly increases item counts for specific subskills

## Usage Examples

**Basic Variation:**
```
Create 4 variations of this linear equation word problem, changing the context to different real-world scenarios while keeping the same mathematical structure and difficulty level.
```

**Targeted Expansion:**
```
I need 5 more items for subskill HSA.CED.A.1.2. Take these 2 high-quality items and generate variations to fill the gap.
```

**Parallel Form Creation:**
```
Create 3 equivalent versions of this assessment item for different test forms. Ensure they have the same difficulty level and solution method.
```

## Advanced Features

### Constraint-Based Generation
- Define acceptable ranges for numerical values
- Specify required context categories
- Set difficulty maintenance parameters
- Establish quality thresholds

### Batch Processing
- Process multiple items simultaneously
- Maintain variety across generated variations
- Track which source items generated which variations
- Generate comprehensive coverage reports

### Validation Pipeline
- Automated mathematical equivalence checking
- Difficulty prediction and comparison
- Quality scoring and ranking
- Flag for human review when confidence is low

## Best Practices

### Source Item Selection
- Choose only validated, high-quality items
- Prefer items with clear solution methods
- Avoid items with ambiguous language
- Select items appropriate for the target grade level

### Variation Planning
- Plan variation strategy before generating
- Consider how many variations are actually needed
- Think about context diversity and inclusivity
- Plan for validation and review time

### Quality Assurance
- Always validate mathematical equivalence
- Check difficulty consistency manually
- Review solutions for clarity and completeness
- Test variations with sample student responses

## Quality Metrics
- Mathematical equivalence accuracy: >95%
- Difficulty consistency score: >90%
- Context diversity rating: >85%
- Teacher acceptance rate: >90%