---
name: new-item-generator
description: Generate novel assessment items for specific subskills and difficulty levels when variations aren't sufficient, using exemplars as style guides
version: 1.0.0
author: Derek Lomas
usage: |
  Use this skill to create completely new assessment items:
  - Generate novel items for underrepresented subskills
  - Create items targeting specific difficulty levels
  - Use existing exemplars as style and quality guides
  - Fill gaps that variation generation can't address

  Examples:
  - "Create 5 new items for this geometry subskill at medium difficulty"
  - "Generate assessment items for subskills with no existing items"
  - "Create novel word problems for these algebra concepts"
---

# New Item Generation Skill

## Overview
This skill creates **completely novel assessment items** when variation generation isn't sufficient to fill curriculum gaps. It uses exemplar items as style guides while generating fresh, original content that targets specific learning objectives.

## When to Use New Item Generation
- **No Exemplars Available**: Subskills with zero or very few existing items
- **Context Limitations**: When existing contexts don't suit student needs
- **Format Gaps**: Needing different item types than what's available
- **Cultural Relevance**: Creating items that reflect local contexts and experiences
- **Assessment Innovation**: Developing new approaches to measure understanding

## Capabilities

### Novel Content Creation
- **Original Contexts**: Create fresh, engaging scenarios
- **Unique Problem Structures**: Design new problem types and approaches
- **Innovative Formats**: Experiment with different item formats
- **Culturally Responsive Content**: Reflect diverse student backgrounds

### Targeted Specification
- **Subskill Focus**: Generate items for exact learning targets
- **Difficulty Calibration**: Create items at precise cognitive demand levels
- **Format Specification**: Design items for specific assessment needs
- **Context Requirements**: Meet particular thematic or application needs

### Style Guide Compliance
- **Tone Matching**: Replicate the style of exemplar items
- **Complexity Alignment**: Match cognitive demand and procedural steps
- **Format Consistency**: Follow established item structures
- **Quality Standards**: Meet or exceed exemplar quality levels

### Validation and Refinement
- **Mathematical Accuracy**: Ensure all problems are mathematically sound
- **Solution Generation**: Create complete, clear solutions
- **Difficulty Verification**: Confirm intended difficulty levels
- **Bias Screening**: Check for cultural and demographic biases

## Input Requirements
- **Target Subskill**: Specific learning objective to assess
- **Difficulty Level**: Desired cognitive demand (DOK 1-4)
- **Format Preference**: Item type requirements
- **Exemplar Items**: Style guide items (if available)
- **Context Constraints**: Any specific thematic requirements
- **Quantity**: Number of items needed

## Output Schema
```json
{
  "generation_request": {
    "subskill_id": "HSA.CED.A.2.3",
    "subskill_title": "Solve systems of linear equations using substitution",
    "target_difficulty": "DOK 2",
    "desired_format": "free_response",
    "quantity": 3,
    "context_themes": ["personal_finance", "sports", "technology"]
  },
  "exemplar_analysis": {
    "style_elements": {
      "sentence_structure": "compound_sentences",
      "vocabulary_level": "grade_appropriate",
      "context_authenticity": "high",
      "mathematical_presentation": "step_by_step"
    },
    "complexity_markers": {
      "average_steps": 3,
      "computation_load": "light",
      "reading_level": "8th_grade",
      "cognitive_demand": "procedural_fluency"
    }
  },
  "generated_items": [
    {
      "id": "generated_HSA.CED.A.2.3_1",
      "stem": "A phone plan costs $40 per month plus $0.10 per gigabyte of data used. A second plan costs $50 per month but includes 5 gigabytes of data, then $0.05 per additional gigabyte. For how many gigabytes would the two plans cost the same amount?",
      "type": "free_response",
      "solution": {
        "steps": [
          "Let g = gigabytes of data",
          "Plan 1: C₁ = 40 + 0.10g",
          "Plan 2: C₂ = 50 + 0.05(g - 5) for g > 5",
          "Set equal: 40 + 0.10g = 50 + 0.05(g - 5)",
          "40 + 0.10g = 50 + 0.05g - 0.25",
          "40 + 0.10g = 49.75 + 0.05g",
          "0.05g = 9.75",
          "g = 195 gigabytes"
        ],
        "final_answer": "195 gigabytes",
        "verification": "Both plans would cost $59.50 for 195 GB"
      },
      "metadata": {
        "estimated_difficulty": "DOK 2",
        "context": "personal_finance",
        "computation_steps": 6,
        "reading_time_estimate": "2 minutes"
      }
    }
  ],
  "quality_assessment": {
    "mathematical_accuracy": 1.0,
    "subskill_alignment": 0.94,
    "difficulty_match": 0.88,
    "style_consistency": 0.91,
    "cultural_relevance": 0.85,
    "overall_quality": 0.92
  }
}
```

## Generation Framework

### 1. Requirement Analysis
- **Subskill Deconstruction**: Break down the learning target into assessable components
- **Cognitive Demand Mapping**: Determine what thinking processes to engage
- **Format Constraints**: Establish structural requirements
- **Context Brainstorming**: Generate appropriate real-world applications

### 2. Exemplar Study (When Available)
- **Structure Analysis**: Identify patterns in existing high-quality items
- **Language Patterns**: Extract tone, vocabulary, and sentence complexity
- **Solution Structure**: Analyze how solutions are presented
- **Difficulty Indicators**: Identify what makes items easier or harder

### 3. Creative Generation
- **Context Creation**: Develop original, meaningful scenarios
- **Problem Design**: Craft mathematical structures that assess the target
- **Solution Crafting**: Create clear, step-by-step solutions
- **Verification Testing**: Ensure mathematical accuracy and solvability

### 4. Quality Enhancement
- **Clarity Review**: Refine language for maximum clarity
- **Difficulty Adjustment**: Fine-tune cognitive demand as needed
- **Bias Screening**: Remove potential cultural or demographic biases
- **Format Compliance**: Ensure structural requirements are met

## Specialized Generation Strategies

### Procedural Fluency Items
**Focus**: Step-by-step problem solving
**Approach**: Create clear, sequential problems with identifiable solution paths
**Example**: Equation solving, computation procedures, algorithmic applications

### Conceptual Understanding Items
**Focus**: Deep comprehension of mathematical ideas
**Approach**: Design items that require explanation, comparison, or connection-making
**Example**: Concept explanation, relationship identification, principle application

### Application Items
**Focus**: Using mathematics in real-world contexts
**Approach**: Create authentic scenarios where mathematics provides genuine insight
**Example**: Real-world problem solving, modeling situations, practical applications

### Mathematical Reasoning Items
**Focus**: Logical deduction and mathematical argumentation
**Approach**: Design items that require justification, proof, or logical reasoning
**Example**: Proof construction, logical deduction, pattern justification

## Quality Control Framework

### Content Validation
- [ ] Mathematical content is accurate and current
- [ ] Solutions are complete and correct
- [ ] Problems are solvable using intended methods
- [ ] Answer choices are plausible (for multiple choice)

### Alignment Verification
- [ ] Item directly assesses target subskill
- [ ] Difficulty matches intended level
- [ ] Format meets specified requirements
- [ ] Context is appropriate and meaningful

### Quality Assurance
- [ ] Language is clear and unambiguous
- [ ] Cultural references are inclusive and appropriate
- [ ] Mathematical notation is correct and standard
- [ ] Items are free from bias and stereotypes

### Pedagogical Soundness
- [ ] Items serve legitimate assessment purposes
- [ ] Cognitive demand is appropriate for grade level
- [ ] Prior knowledge requirements are reasonable
- [ ] Items provide meaningful diagnostic information

## Integration with Other Skills

### Input Dependencies
- **Subskill Decomposer**: Provides clear learning targets
- **Metadata Tagger**: Identifies gaps and style patterns
- **Item Bank Construction**: Supplies exemplars for style guidance

### Output Benefits
- **Gap Filling**: Addresses specific coverage gaps identified in metadata analysis
- **Content Refreshment**: Provides new content to prevent overuse of existing items
- **Cultural Responsiveness**: Creates items that reflect student diversity

## Usage Examples

**Targeted Generation:**
```
Generate 4 new assessment items for subskill HSA.REI.B.3.1 (solve linear equations) at DOK level 2, using contexts that would appeal to high school students interested in technology and gaming.
```

**Gap Filling:**
```
My item bank has no items for subskill HSF.LE.A.1.2 (construct exponential functions). Create 5 original items that would be appropriate for Algebra II students, with a mix of real-world contexts.
```

**Style-Matched Creation:**
```
Using these exemplar items as style guides, create 3 new word problems for subskill HSG.SRT.C.8.1 (use trigonometric ratios) that maintain the same level of mathematical rigor and clarity.
```

## Advanced Features

### Adaptive Generation
- **Difficulty Progression**: Create sequences of items at increasing difficulty
- **Differentiation**: Generate multiple versions for different student needs
- **Accessibility**: Create items suitable for students with various learning needs
- **Multilingual Support**: Generate items in multiple languages when needed

### Context Libraries
- **Theme Databases**: Maintain collections of appropriate contexts by grade level
- **Cultural Relevance**: Track contexts that resonate with different student groups
- **Current Events**: Generate items using contemporary, relevant scenarios
- **Local Adaptation**: Create items specific to local geography or culture

### Validation Pipeline
- **Automated Verification**: Mathematical accuracy checking
- **Difficulty Prediction**: ML-based difficulty estimation
- **Quality Scoring**: Multi-dimensional quality assessment
- **Human Review Integration**: Flag items requiring expert validation

## Best Practices

### Generation Planning
- Start with clear, specific subskill definitions
- Use exemplar analysis whenever possible
- Plan for variety in contexts and approaches
- Consider the full assessment context

### Quality Focus
- Prioritize mathematical accuracy above all else
- Ensure items actually assess the intended skills
- Create complete, clear solutions
- Review for potential biases and barriers

### Pedagogical Considerations
- Consider cognitive load carefully
- Ensure prior knowledge requirements are reasonable
- Make items engaging but not distracting
- Design for diagnostic value

## Quality Metrics
- Mathematical accuracy: >95%
- Subskill alignment confidence: >90%
- Difficulty prediction accuracy: >85%
- Teacher acceptance rate: >85%
- Student engagement: >80%