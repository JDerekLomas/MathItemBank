---
name: distractor-analysis
description: Statistical and pedagogical analysis of multiple-choice distractors using Item Response Theory, diagnostic value assessment, and misconception identification
version: 2.0.0
author: Derek Lomas
references:
  - "Haladyna, T. Developing and Validating Multiple-Choice Items (2012)"
  - "Lord, F. Applications of Item Response Theory (1980)"
  - "Thissen, D. Test Scoring (2001)"
  - "Gierl, M. Automatic Distractor Generation (2017)"
usage: |
  Use this skill for comprehensive distractor quality analysis:
  - Apply Item Response Theory for distractor functioning
  - Identify common misconceptions and error patterns
  - Evaluate diagnostic value of each distractor
  - Predict statistical properties before field testing
  - Generate improved distractors based on misconception research

  Examples:
  - "Analyze the distractors in this multiple-choice item using IRT methods"
  - "Identify what misconceptions these distractors target"
  - "Evaluate the diagnostic value of each option in this item"
  - "Generate better distractors based on common student errors"
---

# Multiple-Choice Distractor Analysis

## Theoretical Framework

This skill applies **Item Response Theory (IRT)** and **Diagnostic Classification** frameworks to analyze multiple-choice distractor quality. The analysis goes beyond simple correctness to evaluate how each option contributes to diagnostic understanding and measurement precision.

### IRT-Based Distractor Analysis
- **Nominal Response Model**: Analyzes each option independently
- **Multiple-Choice Model**: Evaluates distractor attractiveness
- **Distractor Functioning**: How well options differentiate ability levels
- **Information Contribution**: Each option's contribution to measurement precision

### Diagnostic Framework
- **Misconception Targeting**: What specific errors each distractor represents
- **Error Pattern Recognition**: Common mathematical misconceptions
- **Partial Understanding Assessment**: Distractors revealing partial knowledge
- **Instructional Feedback**: How distractor choices inform teaching

## Distractor Quality Dimensions

### 1. Statistical Functioning
- **Attractiveness**: Distractor selection rates across ability levels
- **Discrimination**: Ability to differentiate between proficiency levels
- **Monotonicity**: Logical selection patterns across ability continuum
- **Information Value**: Contribution to measurement precision

### 2. Pedagogical Value
- **Misconception Alignment**: Represents common, identifiable errors
- **Diagnostic Utility**: Provides specific information about student thinking
- **Instructional Relevance**: Connects to teachable moments
- **Error Pattern Recognition**: Reflects known mathematical misconceptions

### 3. Content Quality
- **Plausibility**: Appears correct to students who don't know the answer
- **Homogeneity**: Similar content and format to correct answer
- **Independence**: Not overlapping with other distractors
- **Mathematical Soundness**: Represents mathematically reasonable (though incorrect) approaches

## Statistical Analysis Framework

### Nominal Response Model (NRM)
For item *i* with options *k* = 0, 1, 2, 3 (0 = correct):

P(Choice k | θ) = exp(α_ik * θ + β_ik) / Σ_j exp(α_ij * θ + β_ij)

Where:
- θ = student ability
- α_ik = discrimination parameter for option k
- β_ik = difficulty parameter for option k

### Distractor Evaluation Metrics

#### Attractiveness Indicators
- **Selection Rate**: Overall probability of choosing distractor
- **Ability-Conditional Selection**: P(Choice | ability level)
- **Peak Attractiveness**: Ability level where distractor is most attractive
- **Attraction Range**: Ability span where distractor is competitive

#### Discrimination Quality
- **Negative Discrimination**: Higher ability students less likely to choose
- **Discrimination Slope**: Rate of decrease in selection with ability
- **Crossover Points**: Ability levels where distractor becomes less attractive than other options

#### Diagnostic Value
- **Misconception Specificity**: How uniquely it identifies particular errors
- **Error Pattern Clarity**: Consistency with known misconception patterns
- **Instructional Targetability**: Connection to remediation strategies

## Input Requirements
- **Complete Item**: Stem, all options, correct answer identified
- **Content Analysis**: Mathematical concepts and procedures involved
- **Target Population**: Grade level and course context
- **Misconception Database** (optional): Known error patterns for the domain

## Output Schema
```json
{
  "item_id": "item_456",
  "distractor_analysis_summary": {
    "overall_distractor_quality": 0.78,
    "diagnostic_value_score": 0.82,
    "statistical_functioning_score": 0.74,
    "improvement_needed": true,
    "confidence_level": 0.89
  },
  "individual_distractors": [
    {
      "option_id": "A",
      "is_correct": false,
      "statistical_analysis": {
        "predicted_selection_rate": 0.18,
        "discrimination_score": -0.42,
        "peak_attractiveness_ability": -0.8,
        "attraction_range": [-1.5, 0.2],
        "monotonicity_score": 0.91,
        "information_contribution": 0.06
      },
      "misconception_analysis": {
        "targeted misconception": "Proportional reasoning error",
        "misconception_category": "ratio_reasoning",
        "frequency_in_research": "high",
        "diagnostic_specificity": 0.84,
        "remediation_strategy": "visual_proportional_models"
      },
      "pedagogical_evaluation": {
        "plausibility": "high",
        "mathematical_soundness": "moderate",
        "instructional_relevance": "high",
        "feedback_potential": "excellent"
      },
      "quality_assessment": {
        "overall_score": 0.79,
        "strengths": [
          "Targets common misconception",
          "Good negative discrimination",
          "Excellent diagnostic value"
        ],
        "concerns": [
          "May be too obvious for high-ability students"
        ],
        "improvement_suggestions": [
          "Add intermediate calculation step to increase plausibility"
        ]
      }
    },
    {
      "option_id": "B",
      "is_correct": true,
      "option_quality": {
        "clarity": "excellent",
        "mathematical_accuracy": "perfect",
        "solution_path": "direct",
        "complexity": "appropriate"
      }
    },
    {
      "option_id": "C",
      "is_correct": false,
      "statistical_analysis": {
        "predicted_selection_rate": 0.08,
        "discrimination_score": -0.15,
        "peak_attractability_ability": -0.3,
        "monotonicity_score": 0.67,
        "information_contribution": 0.02
      },
      "misconception_analysis": {
        "targeted misconception": "Calculation error - missing parentheses",
        "misconception_category": "procedural_error",
        "frequency_in_research": "moderate",
        "diagnostic_specificity": 0.61,
        "remediation_strategy": "order_of_operations_practice"
      },
      "quality_assessment": {
        "overall_score": 0.52,
        "strengths": [
          "Represents procedural error"
        ],
        "concerns": [
          "Low diagnostic specificity",
          "Weak discrimination",
          "May attract random guessers"
        ],
        "improvement_suggestions": [
          "Revise to more clearly target the misconception",
          "Make more mathematically plausible"
        ]
      }
    },
    {
      "option_id": "D",
      "is_correct": false,
      "statistical_analysis": {
        "predicted_selection_rate": 0.04,
        "discrimination_score": -0.05,
        "monotonicity_score": 0.31,
        "information_contribution": 0.01
      },
      "quality_assessment": {
        "overall_score": 0.28,
        "concerns": [
          "Very low attractiveness",
          "Poor discrimination",
          "No clear misconception targeting",
          "May be functioning as filler"
        ],
        "improvement_suggestions": [
          "Complete revision needed",
          "Consider replacement with misconception-based distractor"
        ]
      }
    }
  ],
  "item_level_statistics": {
    "predicted_difficulty": 0.70,
    "predicted_discrimination": 0.65,
    "test_information_function": 0.34,
    "guessing_parameter": 0.25,
    "reliability_contribution": 0.58
  },
  "improvement_recommendations": {
    "priority_actions": [
      {
        "distractor": "D",
        "action": "complete_revision",
        "target_misconception": "unit_conversion_error",
        "rationale": "Current distractor provides no diagnostic value"
      }
    ],
    "enhancement_opportunities": [
      {
        "distractor": "C",
        "action": "refine_procedure_error",
        "suggestion": "Make parentheses omission more obvious in solution path"
      },
      {
        "distractor": "A",
        "action": "fine_tune_plausibility",
        "suggestion": "Adjust to maintain attractiveness while preserving diagnostic value"
      }
    ]
  },
  "misconception_alignment_report": {
    "covered_misconceptions": [
      "proportional_reasoning_error",
      "order_of_operations_error"
    ],
    "missing_common_misconceptions": [
      "unit_conversion_error",
      "decimal_place_error",
      "variable_isolation_error"
    ],
    "domain_coverage_score": 0.67,
    "research_base_alignment": 0.72
  }
}
```

## Misconception Database Integration

### Common Mathematical Misconceptions
#### Algebra
- **Variable Misconception**: Treating variables as specific numbers
- **Equation Balance**: Not maintaining equality when solving
- **Negative Sign Errors**: Mishandling negative coefficients
- **Function Misunderstanding**: Confusing inputs and outputs

#### Geometry
- **Area/Perimeter Confusion**: Mixing up formulas
- **Similarity vs. Congruence**: Confusing concepts
- **Angle Relationships**: Misapplying angle theorems
- **Scale Factor Errors**: Incorrect proportional reasoning

#### Statistics
- **Mean vs. Median**: Confusing measures of center
- **Correlation vs. Causation**: Inferring causation from correlation
- **Sample Size Effects**: Not considering sample representativeness
- **Probability Misconceptions**: Misunderstanding independence

## Distractor Generation Guidelines

### Effective Distractor Characteristics
1. **Based on Real Misconceptions**: Derived from research on student errors
2. **Mathematically Plausible**: Represents reasonable (though incorrect) approaches
3. **Homogeneous Content**: Similar topic and format to correct answer
4. **Appropriate Difficulty**: Attractive to intended ability ranges
5. **Diagnostic Value**: Provides specific information about student thinking

### Distractor Development Process
1. **Error Pattern Research**: Identify common misconceptions in the domain
2. **Solution Path Analysis**: Analyze where students typically go wrong
3. **Prototype Generation**: Create distractors targeting specific errors
4. **Expert Review**: Validate mathematical plausibility and misconception targeting
5. **Statistical Validation**: Monitor performance in field testing

## Quality Standards

### Statistical Benchmarks
- **Distractor Attractiveness**: 5-25% selection rate
- **Negative Discrimination**: r_pb < -0.20 for good distractors
- **Monotonicity**: Selection rate decreases with ability
- **Information Contribution**: Each distractor adds to test information

### Pedagogical Benchmarks
- **Misconception Specificity**: >80% diagnostic clarity
- **Research Base Alignment**: Targets known error patterns
- **Instructional Relevance**: Clear remediation pathways
- **Feedback Utility**: Actionable information for teachers

### Content Quality Benchmarks
- **Mathematical Plausibility**: Represents reasonable error
- **Format Consistency**: Matches correct answer structure
- **Content Homogeneity**: Same topic/domain as correct answer
- **Independence**: No overlap with other options

## Integration with Assessment Systems

### Input Dependencies
- **Item Bank Construction**: Provides items for distractor analysis
- **Misconception Research**: Supplies database of common errors
- **Statistical Analysis**: Uses field test data for validation

### Output Applications
- **Item Improvement**: Specific recommendations for distractor revision
- **Diagnostic Assessment**: Enhanced understanding of student errors
- **Professional Development**: Teacher training on misconception identification
- **Adaptive Testing**: Improved item selection algorithms

## Usage Examples

**Comprehensive Distractor Analysis:**
```
Analyze the distractors in this multiple-choice algebra item using IRT methods and identify what misconceptions each option targets.
```

**Distractor Improvement:**
```
Evaluate the quality of these distractors and suggest improvements based on common mathematical misconceptions.
```

**Diagnostic Assessment:**
```
What can we learn about student thinking from the distractor patterns in this item? How should instruction be adapted?
```

## Advanced Applications

### Adaptive Testing Integration
- **Information-Weighted Selection**: Choose items based on distractor diagnostic value
- **Misconception Tracking**: Monitor specific error patterns across items
- **Customized Remediation**: Target instruction based on distractor choices

### Machine Learning Applications
- **Automated Distractor Generation**: AI-based creation of misconception-targeting options
- **Pattern Recognition**: Identify new misconception patterns from response data
- **Quality Prediction**: Predict distractor performance before field testing

This framework provides comprehensive, research-backed distractor analysis that enhances both measurement precision and diagnostic utility in mathematics assessment.