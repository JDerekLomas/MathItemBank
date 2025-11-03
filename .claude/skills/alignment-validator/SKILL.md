---
name: alignment-validator
description: Evidence-centered alignment validation using Webb's alignment methodology, Depth of Knowledge analysis, and cognitive complexity assessment
version: 2.0.0
author: Derek Lomas
references:
  - "Webb, N. Criteria for Alignment of Expectations and Assessments (1997)"
  - "Norman Webb, Web Alignment Tool (WAT) procedures"
  - "Council of Chief State School Officers (CCSSO) Alignment Analysis"
  - "Achieve. On the Road to Implementation (2006)"
usage: |
  Use this skill for comprehensive standards-alignment validation:
  - Apply Webb's alignment criteria (Categorical, Depth, Balance, Range)
  - Conduct Depth of Knowledge consistency analysis
  - Evaluate cognitive complexity match between standards and items
  - Assess content centrality and coverage
  - Generate alignment improvement recommendations

  Examples:
  - "Validate the alignment of these items to CCSS using Webb's criteria"
  - "Apply the Web Alignment Tool methodology to this assessment"
  - "Analyze DOK alignment between standards and assessment items"
  - "Evaluate content centrality and balance for this item bank"
---

# Standards Alignment Validation

## Webb's Alignment Framework

This skill implements **Webb's Alignment Methodology**, the gold standard for evaluating the alignment between assessments and content standards. Webb identified four critical alignment criteria:

### 1. Categorical Concurrence (Content Match)
- **Definition**: Assessment items must address the same content categories as the standards
- **Criterion**: At least 50% of assessment items should match the standard's content category
- **Measurement**: Proportion of items aligned to standard categories
- **Focus**: Content accuracy and topical relevance

### 2. Depth of Knowledge Consistency
- **Definition**: Cognitive demand of items must match the cognitive demand of standards
- **Criterion**: At least 50% of items should match or exceed the DOK level of the standard
- **Measurement**: DOK level comparison between standard and item
- **Focus**: Cognitive complexity alignment

### 3. Balance of Representation
- **Definition**: Assessment should give appropriate emphasis to different content categories
- **Criterion**: No single category should dominate (balance across categories)
- **Measurement**: Distribution of items across content categories
- **Focus**: Proportional representation of content

### 4. Range of Knowledge
- **Definition**: Assessment should span the range of knowledge and skills specified in the standard
- **Criterion**: Items should cover the breadth of the standard across multiple categories
- **Measurement**: Span of knowledge categories assessed
- **Focus**: Comprehensive coverage of standard content

## Alignment Analysis Framework

### Content Centrality Analysis
Based on **Achieve's Four-Point Content Centrality Scale**:
- **Full Coverage**: Item assesses all aspects of the standard
- **Partial Coverage**: Item assesses most, but not all, aspects
- **Little Coverage**: Item assesses minor aspects of the standard
- **No Coverage**: Item does not assess the standard

### Cognitive Complexity Assessment
Using **Webb's Depth of Knowledge Levels**:
- **Level 1**: Recall and reproduction
- **Level 2**: Skills and concepts
- **Level 3**: Strategic thinking
- **Level 4**: Extended thinking

### Structural Alignment Analysis
- **Standard Deconstruction**: Break standards into assessable components
- **Item Mapping**: Match items to specific standard components
- **Gap Identification**: Find underrepresented or missing content
- **Redundancy Detection**: Identify over-assessment of certain concepts

## Input Requirements
- **Assessment Items**: Complete items with solutions and metadata
- **Content Standards**: Full standard text and descriptions
- **Standard Categories**: Content area classifications (if available)
- **Context**: Grade level, subject, assessment purpose
- **Alignment Claims**: Intended alignments (for validation)

## Output Schema
```json
{
  "alignment_summary": {
    "overall_alignment_score": 0.83,
    "webb_alignment_strength": "moderate",
    "readiness_for_operational_use": true,
    "alignment_confidence": 0.89,
    "assessment_id": "algebra_1_unit_3",
    "standard_set": "CCSS.Mathematics",
    "grade_level": "High School Algebra I"
  },
  "webb_alignment_criteria": {
    "categorical_concurrence": {
      "score": 0.87,
      "strength": "strong",
      "criterion_met": true,
      "analysis": {
        "content_categories_matched": 4,
        "total_categories_available": 5,
        "percentage_matched": 0.80,
        "criterion_threshold": 0.50,
        "excess": 0.30
      },
      "matched_categories": [
        {
          "category": "Create equations",
          "standard_reference": "HSA.CED.A.1",
          "items_assessing": 8,
          "alignment_strength": "strong"
        },
        {
          "category": "Solve equations",
          "standard_reference": "HSA.CED.A.4",
          "items_assessing": 6,
          "alignment_strength": "moderate"
        }
      ],
      "unmatched_categories": [
        {
          "category": "Represent constraints",
          "standard_reference": "HSA.CED.A.3",
          "items_assessing": 0,
          "alignment_strength": "none",
          "recommendation": "Add items assessing constraint representation"
        }
      ]
    },
    "depth_of_knowledge_consistency": {
      "score": 0.78,
      "strength": "moderate",
      "criterion_met": true,
      "analysis": {
        "items_meeting_or_exceeding_dok": 12,
        "total_items": 18,
        "percentage_matching": 0.67,
        "criterion_threshold": 0.50,
        "average_standard_dok": 2.4,
        "average_item_dok": 2.7
      },
      "dok_distribution": {
        "standard_dok_levels": {
          "level_1": 0,
          "level_2": 8,
          "level_3": 6,
          "level_4": 4
        },
        "item_dok_levels": {
          "level_1": 2,
          "level_2": 7,
          "level_3": 7,
          "level_4": 2
        },
        "alignment_analysis": {
          "level_1_alignment": "excess",
          "level_2_alignment": "adequate",
          "level_3_alignment": "adequate",
          "level_4_alignment": "deficient"
        }
      }
    },
    "balance_of_representation": {
      "score": 0.72,
      "strength": "moderate",
      "criterion_met": true,
      "analysis": {
        "balance_coefficient": 0.68,
        "criterion_threshold": 0.60,
        "dominance_detected": false,
        "balance_concerns": [
          "Slight overemphasis on equation creation",
          "Underrepresentation of constraint modeling"
        ]
      },
      "category_distribution": [
        {
          "category": "Create equations",
          "item_count": 8,
          "percentage": 0.44,
          "ideal_range": [0.20, 0.30],
          "balance_status": "overrepresented"
        },
        {
          "category": "Solve equations",
          "item_count": 6,
          "percentage": 0.33,
          "ideal_range": [0.20, 0.30],
          "balance_status": "slightly_overrepresented"
        },
        {
          "category": "Represent constraints",
          "item_count": 1,
          "percentage": 0.06,
          "ideal_range": [0.20, 0.30],
          "balance_status": "underrepresented"
        }
      ]
    },
    "range_of_knowledge": {
      "score": 0.88,
      "strength": "strong",
      "criterion_met": true,
      "analysis": {
        "categories_assessed": 4,
        "total_categories": 5,
        "range_coverage": 0.80,
        "breadth_satisfaction": true,
        "missing_elements": [
          "Systems of inequalities",
          "Multi-variable constraints"
        ]
      }
    }
  },
  "content_centrality_analysis": {
    "items_by_centrality": {
      "full_coverage": {
        "count": 7,
        "percentage": 0.39,
        "examples": ["item_234", "item_237", "item_241"]
      },
      "partial_coverage": {
        "count": 8,
        "percentage": 0.44,
        "examples": ["item_235", "item_238", "item_242"]
      },
      "little_coverage": {
        "count": 3,
        "percentage": 0.17,
        "examples": ["item_236", "item_239"]
      },
      "no_coverage": {
        "count": 0,
        "percentage": 0.00,
        "examples": []
      }
    },
    "centrality_distribution_score": 0.82
  },
  "cognitive_complexity_analysis": {
    "complexity_alignment": {
      "overall_alignment": 0.78,
      "complexity_distribution": {
        "simple_procedures": 0.22,
        "complex_procedures": 0.39,
        "strategic_thinking": 0.33,
        "extended_thinking": 0.06
      },
      "complexity_mismatch_analysis": [
        {
          "item_id": "item_236",
          "standard_dok": 3,
          "item_dok": 1,
          "mismatch_type": "undercomplexity",
          "recommendation": "Increase cognitive demand to match standard"
        }
      ]
    }
  },
  "alignment_gaps_and_recommendations": {
    "critical_gaps": [
      {
        "gap_type": "content_gap",
        "standard": "HSA.CED.A.3",
        "description": "No items assessing constraint representation and interpretation",
        "impact": "high",
        "recommendation": "Add 3-4 items focusing on constraint modeling",
        "priority": "high"
      }
    ],
    "balance_improvements": [
      {
        "issue": "Overemphasis on equation creation",
        "current_percentage": 0.44,
        "target_percentage": 0.25,
        "action": "Reduce equation creation items by 40%",
        "priority": "medium"
      }
    ],
    "complexity_adjustments": [
      {
        "item_id": "item_236",
        "current_dok": 1,
        "target_dok": 3,
        "enhancement_strategy": "Add multi-step problem solving requirement",
        "priority": "medium"
      }
    ],
    "coverage_enhancements": [
      {
        "standard": "HSA.CED.A.2",
        "missing_aspects": ["Graphical representation", "Systems of equations"],
        "suggested_items": [
          "Create assessment item involving system graphing",
          "Develop item requiring multiple equation representations"
        ]
      }
    ]
  },
  "alignment_validation_report": {
    "webb_criteria_met": 4,
    "webb_criteria_partially_met": 0,
    "webb_criteria_not_met": 0,
    "overall_webb_rating": "Strong",
    "readiness_recommendations": [
      "Address content gaps in constraint representation",
      "Balance item distribution across categories",
      "Increase DOK level 4 representation"
    ],
    "next_review_date": "2024-03-15"
  }
}
```

## Webb Alignment Tool (WAT) Implementation

### Step 1: Standard Deconstruction
- Identify primary content categories within standards
- Determine appropriate DOK levels for each standard
- Categorize knowledge types (procedural, conceptual, application)
- Define performance expectations

### Step 2: Item Classification
- Match items to standard content categories
- Assign DOK levels to each item
- Analyze cognitive complexity requirements
- Determine content centrality rating

### Step 3: Criteria Analysis
- Calculate categorical concurrence metrics
- Assess DOK consistency across item sets
- Evaluate balance of representation
- Determine range of knowledge coverage

### Step 4: Gap Identification
- Find underrepresented content categories
- Identify cognitive complexity mismatches
- Detect balance issues in item distribution
- Recognize missing aspects of standards

## Alignment Quality Standards

### Webb Alignment Ratings
- **Strong Alignment**: All 4 criteria met, high consistency
- **Moderate Alignment**: 3-4 criteria met, some concerns
- **Weak Alignment**: 1-2 criteria met, significant concerns
- **No Alignment**: 0 criteria met, major redesign needed

### Content Centrality Benchmarks
- **Full Coverage**: Item assesses all major aspects of standard
- **Partial Coverage**: Item assesses most aspects, minor gaps
- **Little Coverage**: Item assesses peripheral aspects only
- **No Coverage**: Item does not assess the standard

### Cognitive Complexity Alignment
- **Perfect Match**: Item DOK exactly matches standard DOK
- **Acceptable Range**: Item DOK within ±1 level of standard
- **Mismatch**: Item DOK differs by more than 1 level
- **Severe Mismatch**: Item DOK differs by 2+ levels

## Specialized Applications

### High-Stakes Assessment Alignment
- **Strict Criteria**: All Webb criteria must be met
- **Documentation**: Comprehensive alignment evidence required
- **Expert Review**: Multiple content specialists validate alignment
- **Statistical Validation**: Empirical evidence of alignment

### Formative Assessment Alignment
- **Focused Criteria**: Emphasis on relevant content and complexity
- **Instructional Relevance**: Alignment to learning progressions
- **Diagnostic Value**: Clear connection to instructional needs
- **Flexibility**: Adaptation to classroom contexts

### Curriculum Alignment
- **Comprehensive Coverage**: Alignment to entire curriculum maps
- **Progression Consistency**: Vertical alignment across grades
- **Cross-Curricular Connections**: Integration with other subjects
- **Instructional Sequencing**: Alignment to teaching order

## Integration with Assessment Systems

### Input Dependencies
- **Item Bank Construction**: Provides items for alignment analysis
- **Standards Database**: Supplies standard classifications and DOK levels
- **Metadata Tagger**: Provides item classifications for matching

### Output Applications
- **Assessment Design**: Guide item selection for balanced assessments
- **Curriculum Planning**: Identify gaps in instructional coverage
- **Professional Development**: Teacher training on standards alignment
- **Quality Assurance**: Ongoing monitoring of assessment alignment

## Usage Examples

**Comprehensive Webb Alignment:**
```
Apply the complete Webb alignment methodology to validate this assessment against CCSS Mathematics standards. Provide detailed analysis of all four criteria.
```

**Gap Analysis:**
```
Identify alignment gaps in this item bank using Webb's criteria. What content areas are underrepresented or missing?
```

**DOK Consistency Validation:**
```
Analyze the Depth of Knowledge consistency between these algebra standards and their corresponding assessment items.
```

This framework provides comprehensive, research-backed standards alignment validation that meets professional assessment standards and supports both measurement validity and instructional effectiveness.