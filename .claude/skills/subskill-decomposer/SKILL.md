---
name: subskill-decomposer
description: Decompose educational standards into 3-5 specific subskills with detailed descriptions to create assessment frameworks
version: 1.0.0
author: Derek Lomas
usage: |
  Use this skill to break down broad standards into teachable, assessable subskills:
  - Analyze standard language and identify core components
  - Generate 3-5 specific, measurable subskills
  - Create detailed descriptions for each subskill
  - Establish prerequisite relationships between subskills

  Examples:
  - "Break down this algebra standard into subskills"
  - "Decompose these geometry standards for middle school"
  - "Create subskill frameworks for these CCSS standards"
---

# Subskill Decomposition Skill

## Overview
This skill transforms broad educational standards into specific, assessable subskills that form the foundation for targeted assessment design and instruction.

## Core Purpose
Creates the **framework schema** that enables:
- Precise assessment item tagging
- Targeted intervention design
- Learning progression mapping
- Gap analysis in curriculum coverage

## Capabilities

### Standard Analysis
- **Language Parsing**: Break down complex standard language into components
- **Verb Identification**: Extract cognitive verbs (evaluate, analyze, create, etc.)
- **Content Mapping**: Identify mathematical concepts and procedures
- **Context Analysis**: Understand problem contexts and applications

### Subskill Generation
- **Decomposition**: Break standards into 3-5 manageable subskills
- **Specificity**: Create concrete, measurable learning objectives
- **Progression**: Order subskills logically (prerequisite → advanced)
- **Scope Definition**: Define boundaries of each subskill clearly

### Description Writing
- **Student-Friendly Language**: Write descriptions students can understand
- **Teacher Clarity**: Provide clear instructional guidance
- **Assessment Focus**: Describe what mastery looks like
- **Example Integration**: Include sample problems or contexts

### Prerequisite Mapping
- **Dependency Analysis**: Identify prerequisite knowledge
- **Sequencing**: Determine optimal learning order
- **Cross-Standard Links**: Connect to related standards
- **Gap Identification**: Find missing prerequisite skills

## Input Formats
- Standard strings (e.g., "CCSS.MATH.CONTENT.HSA.CED.A.1")
- Standard descriptions from your CSV files
- Curriculum documents
- Learning objectives
- Assessment framework documents

## Output Schema
```json
{
  "standard_id": "CCSS.MATH.CONTENT.HSA.CED.A.1",
  "standard_description": "Create equations and inequalities in one variable and use them to solve problems.",
  "subskills": [
    {
      "id": "HSA.CED.A.1.1",
      "title": "Translate Word Problems to Equations",
      "description": "Convert contextual word problems into algebraic equations by identifying variables, relationships, and constraints.",
      "student_friendly": "I can turn story problems into math equations by figuring out what the variables represent and how they relate to each other.",
      "evidence_statement": "Given a real-world scenario, student can identify unknown quantities, assign variables, and write an equation that models the situation.",
      "prerequisites": ["HSA.SSE.A.1.1", "8.EE.C.7.1"],
      "complexity": "foundational",
      "examples": [
        "A car rental costs $30 plus $0.20 per mile. Write an equation for the total cost.",
        "A garden has a perimeter of 40 feet. Write an equation relating length and width."
      ]
    },
    {
      "id": "HSA.CED.A.1.2",
      "title": "Solve One-Variable Equations",
      "description": "Apply algebraic techniques to solve equations arising from real-world contexts, checking solutions for reasonableness.",
      "student_friendly": "I can solve equations I've created from word problems and make sure my answers make sense in the original story.",
      "evidence_statement": "Given an equation modeling a real-world situation, student can solve for the unknown and interpret the solution in context.",
      "prerequisites": ["HSA.CED.A.1.1", "8.EE.C.7.2"],
      "complexity": "developing",
      "examples": [
        "Solve 30 + 0.20x = 50 for the number of miles driven.",
        "Find dimensions of a rectangle with perimeter 40 feet and length twice the width."
      ]
    }
  ],
  "progression_notes": "Students must master translation before solving, as understanding the meaning of solutions depends on the original context.",
  "common_misconceptions": [
    "Confusing variables with specific numbers",
    "Losing track of what variables represent in context",
    "Finding algebraic solutions without checking real-world reasonableness"
  ],
  "metadata": {
    "created_date": "2024-01-15",
    "review_status": "validated",
    "alignment_confidence": 0.92
  }
}
```

## Decomposition Framework

### 1. Cognitive Demand Analysis
- **Bloom's Taxonomy**: Identify cognitive level required
- **Depth of Knowledge**: Determine complexity of thinking required
- **Process vs. Product**: Separate procedures from final understanding
- **Multiple Representations**: Consider different ways to demonstrate mastery

### 2. Knowledge Component Identification
- **Conceptual Understanding**: Core mathematical ideas
- **Procedural Fluency**: Step-by-step processes
- **Application Skills**: Using knowledge in new contexts
- **Strategic Thinking**: Planning and problem-solving approaches

### 3. Context and Application Analysis
- **Real-World Connections**: Identify authentic applications
- **Mathematical Modeling**: Extract mathematical structures from situations
- **Communication Requirements**: Determine explanation/presentation needs
- **Tool Usage**: Identify when calculators, manipulatives, or technology is appropriate

### 4. Sequencing and Dependencies
- **Learning Progression**: Order skills developmentally
- **Prerequisite Chains**: Map required prior knowledge
- **Parallel Development**: Identify skills that can be learned simultaneously
- **Integration Points**: Find where skills combine for complex tasks

## Quality Criteria for Subskills

### Specificity Standards
- **Measurable**: Can be assessed through specific tasks
- **Observable**: Student mastery can be directly observed
- **Atomic**: Represents a single, coherent skill
- **Teachable**: Can be explicitly taught and practiced

### Description Guidelines
- **Action-Oriented**: Start with clear verbs
- **Context-Rich**: Include meaningful applications
- **Boundary-Defined**: Clearly indicate scope and limits
- **Example-Supported**: Provide concrete illustrations

### Validation Checklist
- [ ] Each subskill is distinct from others
- [ ] Subskills collectively cover the entire standard
- [ ] Progression is logical and developmentally appropriate
- [ ] Descriptions are clear to both teachers and students
- [ ] Prerequisites are accurately identified
- [ ] Examples are representative and illustrative

## Integration with Other Skills

### Input Dependencies
- **Item Bank Construction**: Provides exemplar items for context
- **Standards Database**: Supplies standard descriptions and relationships

### Output Usage
- **Metadata Tagger**: Uses subskills to categorize assessment items
- **New Item Generation**: Creates items targeted to specific subskills
- **Variation Generator**: Ensures variations maintain subskill focus

## Usage Examples

**Single Standard Decomposition:**
```
Break down CCSS.MATH.CONTENT.HSA.CED.A.1 into 4 subskills with detailed descriptions, examples, and prerequisite relationships.
```

**Batch Processing:**
```
Decompose all 8th grade statistics standards into subskill frameworks, focusing on creating clear learning progressions.
```

**Targeted Analysis:**
```
Analyze these geometry standards and create subskills that emphasize proof and reasoning components specifically.
```

## Special Considerations

### Elementary vs. Secondary
- **Elementary**: Focus on concrete understanding and foundational skills
- **Secondary**: Emphasize abstract reasoning and multi-step problems
- **Progression Awareness**: Consider developmental appropriateness

### Content Domain Variations
- **Algebra**: Emphasize symbolic manipulation and equation solving
- **Geometry**: Focus on spatial reasoning and proof
- **Statistics**: Highlight data analysis and interpretation
- **Number Theory**: Stress properties and relationships

### Special Populations
- **Language Considerations**: Account for linguistic complexity
- **Accessibility**: Consider multiple representation needs
- **Differentiation**: Plan for various learning pathways

## Quality Metrics
- Standard coverage completeness: 100%
- Subskill clarity score: >85%
- Prerequisite accuracy: >90%
- Teacher usability rating: >4.0/5.0
- Student comprehension: >80%