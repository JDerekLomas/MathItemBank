---
name: item-evaluator
description: Evidence-centered evaluation of assessment items using AERA/APA/NCME standards, Webb's Depth of Knowledge, and cognitive validity frameworks
version: 2.0.0
author: Derek Lomas
references:
  - "AERA, APA, NCME. Standards for Educational Testing (2014)"
  - "Webb, N. Depth of Knowledge (1997)"
  - "Pellegrino, J. Knowing What Students Know (2001)"
  - "Mislevy, R. Evidence-Centered Design (2003)"
usage: |
  Use this skill for comprehensive, research-based item quality assessment:
  - Apply Standards for Educational Testing validity frameworks
  - Evaluate cognitive demand using Webb's DOK levels
  - Assess content and construct validity evidence
  - Provide statistical quality predictions and improvement recommendations
  - Generate comprehensive evaluation reports with validity arguments

  Examples:
  - "Evaluate this item using AERA standards for content validity"
  - "Apply Webb's DOK framework to assess cognitive demand"
  - "Conduct a comprehensive validity review of these mathematics items"
  - "Evaluate item quality using evidence-centered design principles"
---

# Evidence-Centered Item Quality Evaluation

## Theoretical Framework

This skill applies the **Standards for Educational and Psychological Testing** (AERA, APA, NCME, 2014) and **Evidence-Centered Design** (Mislevy, 2003) principles to evaluate assessment items. The evaluation framework addresses multiple sources of validity evidence:

### Validity Evidence Sources
1. **Content Evidence**: Alignment with content standards and subject matter expertise
2. **Cognitive Evidence**: Match between cognitive demands and intended constructs
3. **Construct Evidence**: Statistical relationships with other measures
4. **Consequential Evidence**: Impact on teaching and learning
5. **Generalizability Evidence**: Consistency across student populations

## Evaluation Dimensions

### 1. Content Validity Evidence
- **Standard Alignment**: Degree of match with content standards
- **Content Expertise**: Accuracy of mathematical content
- **Appropriateness**: Suitability for intended grade level
- **Breadth**: Coverage of intended knowledge and skills

### 2. Cognitive Validity Evidence
- **Depth of Knowledge**: Webb's DOK level analysis
- **Cognitive Processes**: Required thinking processes (Anderson & Krathwohl taxonomy)
- **Cognitive Load**: Working memory demands
- **Problem Solving Requirements**: Nature of mathematical reasoning required

### 3. Technical Quality Evidence
- **Item Format Quality**: Structure and presentation effectiveness
- **Response Process**: Clarity of what students must do
- **Scoring Quality**: Reliability and accuracy of scoring procedures
- **Accessibility**: Universal design and accommodation considerations

### 4. Statistical Predictions
- **Difficulty Estimation**: Predicted item difficulty (p-value)
- **Discrimination Potential**: Ability to differentiate proficiency levels
- **Reliability Contribution**: Expected contribution to test reliability
- **Guessing Parameters**: Likelihood of correct guessing

## Webb's Depth of Knowledge Framework

### Level 1: Recall & Reproduction
- **Characteristics**: Recall of facts, definitions, simple procedures
- **Cognitive Demand**: Mental processes of recall and reproduction
- **Example**: "What is the formula for the area of a circle?"

### Level 2: Skills & Concepts
- **Characteristics**: Application of skills, conceptual understanding
- **Cognitive Demand**: Decision making, classification, organization
- **Example**: "Given the radius, calculate the area of a circle"

### Level 3: Strategic Thinking
- **Characteristics**: Reasoning, planning, using evidence
- **Cognitive Demand**: Complex reasoning, planning, strategic thinking
- **Example**: "Design a circular garden that maximizes area within given constraints"

### Level 4: Extended Thinking
- **Characteristics**: Complex reasoning, investigation, synthesis
- **Cognitive Demand**: Extended thinking, investigation, connections across domains
- **Example**: "Develop and justify a general formula relating circular area to perimeter constraints"

## Input Requirements
- **Assessment Item**: Complete item with stem, options, solution
- **Target Standards**: Specific content standards being assessed
- **Intended DOK Level**: Target cognitive demand level (1-4)
- **Population**: Intended student population characteristics
- **Context**: Any specific evaluation constraints or focus areas

## Output Schema
```json
{
  "evaluation_summary": {
    "item_id": "item_123",
    "overall_validity_score": 0.87,
    "readiness_for_field_testing": true,
    "confidence_level": 0.92,
    "evaluation_framework": "AERA/APA/NCME Standards 2014 + ECD",
    "evaluation_date": "2024-01-15"
  },
  "validity_evidence": {
    "content_validity": {
      "score": 0.91,
      "weight": 0.30,
      "evidence": [
        {
          "aspect": "standard_alignment",
          "rating": "strong",
          "evidence": "Item directly addresses CCSS.MATH.CONTENT.HSA.CED.A.1",
          "rationale": "Requires creating and solving equations from contextual situations"
        },
        {
          "aspect": "mathematical_accuracy",
          "rating": "strong",
          "evidence": "All mathematical content is accurate and appropriately formatted",
          "rationale": "Algebraic relationships correctly represent the situation"
        },
        {
          "aspect": "grade_level_appropriateness",
          "rating": "moderate",
          "evidence": "Context and complexity appropriate for high school Algebra I",
          "rationale": "Requires understanding of linear relationships and equation solving"
        }
      ]
    },
    "cognitive_validity": {
      "score": 0.84,
      "weight": 0.30,
      "dok_analysis": {
        "target_dok": 2,
        "assessed_dok": 2,
        "alignment_rating": "strong",
        "cognitive_processes": [
          "Translate between representations",
          "Apply procedures",
          "Interpret results in context"
        ]
      },
      "cognitive_load_analysis": {
        "intrinsic_load": "moderate",
        "extraneous_load": "low",
        "germane_load": "moderate",
        "overall_assessment": "Appropriate cognitive challenge"
      }
    },
    "technical_quality": {
      "score": 0.88,
      "weight": 0.25,
      "format_assessment": {
        "stem_clarity": "high",
        "option_quality": "high",
        "solution_completeness": "moderate",
        "mathematical_notation": "high"
      },
      "accessibility_analysis": {
        "visual_accessibility": "adequate",
        "screen_reader_compatibility": "good",
        "cognitive_accessibility": "good",
        "multimodal_support": "limited"
      }
    },
    "statistical_predictions": {
      "score": 0.85,
      "weight": 0.15,
      "predicted_difficulty": 0.65,
      "predicted_discrimination": 0.48,
      "reliability_contribution": 0.72,
      "guessing_parameter": 0.25,
      "confidence_intervals": {
        "difficulty": [0.58, 0.72],
        "discrimination": [0.42, 0.54]
      }
    }
  },
  "improvement_recommendations": {
    "critical_concerns": [],
    "enhancement_opportunities": [
      {
        "priority": "high",
        "category": "accessibility",
        "issue": "Limited support for visual impairments",
        "recommendation": "Add alternative text descriptions for mathematical expressions",
        "expected_impact": "Improved accessibility, validity for diverse populations",
        "implementation_effort": "moderate"
      },
      {
        "priority": "medium",
        "category": "cognitive_validity",
        "issue": "Solution explanation could provide more conceptual reasoning",
        "recommendation": "Add explanation of why equation models the situation",
        "expected_impact": "Enhanced diagnostic value and learning potential",
        "implementation_effort": "low"
      }
    ],
    "validation_suggestions": [
      "Pilot test with diverse student sample",
      "Think-aloud protocols to verify cognitive processes",
      "Expert review by content specialists",
      "Statistical analysis after field testing"
    ]
  },
  "field_testing_recommendations": {
    "sample_size": 300,
    "population_segments": ["general_education", "ell_students", "students_with_disabilities"],
    "data_collection_methods": ["response_data", "timing_data", "cognitive_interviews"],
    "success_criteria": {
      "p_value_range": [0.40, 0.85],
      "discrimination_minimum": 0.30,
      "differential_item_functioning": "|DIF| < 0.05"
    }
  }
}
```

## Evidence-Centered Design Integration

### Claims-Evidence-Reasoning Framework
1. **Claim**: What student proficiency is being assessed
2. **Evidence**: What observable behaviors provide evidence
3. **Reasoning**: How evidence supports the claim

### Task Model Analysis
- **Present Situation**: What information is provided to students
- **Work Product**: What students must produce
- **Evaluation Rules**: How responses will be scored

### Statistical Prediction Models
Based on item characteristics and similar items in large datasets:
- **Item Response Theory (IRT)** parameters prediction
- **Classical Test Theory (CTT)** statistics estimation
- **Differential Item Functioning (DIF)** risk assessment

## Quality Standards and Benchmarks

### Validity Score Interpretations
- **0.90-1.00**: Excellent validity evidence, ready for operational use
- **0.80-0.89**: Strong validity, minor revisions recommended
- **0.70-0.79**: Moderate validity, revisions required before field testing
- **0.60-0.69**: Weak validity, substantial revision needed
- **Below 0.60**: Inadequate validity, major redesign required

### Content Validity Benchmarks
- **Standard Alignment**: >90% match with target standards
- **Mathematical Accuracy**: 100% correctness required
- **Grade Level Appropriateness**: Developmentally suitable
- **Breadth Coverage**: Adequate representation of knowledge domains

### Cognitive Validity Benchmarks
- **DOK Alignment**: ±1 level from target DOK
- **Cognitive Load**: Appropriate for working memory capacity
- **Process Clarity**: Student response process clearly defined
- **Diagnostic Value**: Provides meaningful performance information

## Integration with Assessment Systems

### Input Dependencies
- **Item Bank Construction**: Provides items for evaluation
- **Standards Alignment**: Supplies target standards for comparison
- **Distractor Analysis**: Provides option-level analysis for multiple choice

### Output Applications
- **Item Bank Management**: Quality classification and improvement tracking
- **Assessment Assembly**: Selection of items with appropriate validity evidence
- **Professional Development**: Identification of quality characteristics for teacher training

## Usage Examples

**Comprehensive Validity Review:**
```
Evaluate this mathematics item using AERA/APA/NCME standards. Provide content, cognitive, and technical validity evidence with statistical predictions.
```

**DOK Alignment Analysis:**
```
Apply Webb's Depth of Knowledge framework to assess whether this item truly measures DOK level 3 strategic thinking as intended.
```

**Field Testing Readiness:**
```
Determine if this item is ready for field testing. Provide validity evidence scores and specific recommendations for improvement.
```

## Specialized Applications

### High-Stakes Assessment
- Enhanced validity requirements (>0.90 overall score)
- Statistical validation requirements
- Bias and fairness analysis mandatory
- Expert review documentation required

### Formative Assessment
- Emphasis on diagnostic value and learning potential
- Rapid turnaround evaluation criteria
- Student feedback integration
- Growth monitoring considerations

### Adaptive Testing
- IRT parameter precision requirements
- Information function analysis
- Exposure control considerations
- Bank management implications

This framework provides research-backed, comprehensive item evaluation that meets professional assessment standards while remaining practical for educational applications.