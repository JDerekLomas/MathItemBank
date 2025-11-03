---
name: formatting-checker
description: Comprehensive assessment of item formatting, mathematical notation, and accessibility compliance using WCAG 2.1 standards, LaTeX best practices, and universal design principles
version: 2.0.0
author: Derek Lomas
references:
  - "WCAG 2.1 Guidelines (W3C, 2018)"
  - "LaTeX for Mathematical Typesetting (American Mathematical Society)"
  - "Universal Design for Learning (CAST, 2018)"
  - "IMS Global Question & Test Interoperability (QTI) Specification"
  - "MathJax and MathML Accessibility Guidelines"
usage: |
  Use this skill for comprehensive formatting and accessibility assessment:
  - Validate WCAG 2.1 AA compliance for assessment items
  - Analyze LaTeX/Mathematical notation quality and accessibility
  - Check screen reader compatibility and multimodal support
  - Evaluate mobile and cross-platform rendering
  - Generate accessibility improvement recommendations

  Examples:
  - "Check this item for WCAG 2.1 AA compliance and mathematical accessibility"
  - "Analyze the LaTeX formatting and screen reader compatibility of these equations"
  - "Validate the multimodal accessibility of this assessment item"
  - "Evaluate mobile responsiveness and cross-platform compatibility"
---

# Assessment Item Formatting & Accessibility

## Comprehensive Framework

This skill evaluates assessment items through multiple accessibility and quality lenses: **WCAG 2.1 compliance**, **Mathematical notation standards**, **Universal Design for Learning (UDL)** principles, and **technical rendering quality**.

### WCAG 2.1 AA Compliance Framework
- **Perceivable**: Information must be presentable in ways users can perceive
- **Operable**: Interface components must be operable
- **Understandable**: Information and UI operation must be understandable
- **Robust**: Content must be robust enough for various assistive technologies

### Mathematical Notation Standards
- **LaTeX Best Practices**: Professional mathematical typesetting
- **MathML Accessibility**: Screen reader compatibility
- **Semantic Math**: Meaningful mathematical markup
- **Alternative Representations**: Multiple formats for different needs

## Evaluation Dimensions

### 1. Visual Accessibility
- **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Text Scaling**: Up to 200% zoom without loss of content/functionality
- **Spatial Relationships**: Clear visual hierarchy and organization
- **Graphical Content**: Alternative text for all visual elements

### 2. Mathematical Notation Quality
- **LaTeX Precision**: Mathematically accurate notation
- **Readability**: Clear, properly sized mathematical expressions
- **Semantic Markup**: Meaningful representation of mathematical concepts
- **Alternative Formats**: Plain text and spoken versions available

### 3. Screen Reader Compatibility
- **MathML Support**: Proper MathML markup for assistive technologies
- **Reading Order**: Logical sequence for screen readers
- **Mathematical Speech**: Clear spoken representation of equations
- **Navigation**: Efficient movement through mathematical content

### 4. Technical Rendering
- **Cross-Platform Compatibility**: Consistent display across devices/browsers
- **Mobile Responsiveness**: Proper rendering on mobile devices
- **Performance**: Fast loading and rendering of mathematical content
- **Fallback Support**: Graceful degradation when advanced features unavailable

## Input Requirements
- **Assessment Item**: Complete item with all mathematical content
- **Target Platform**: Primary delivery environment (web, mobile, print)
- **Accessibility Requirements**: Specific accessibility standards or accommodations needed
- **Technical Constraints**: Platform limitations or requirements

## Output Schema
```json
{
  "accessibility_summary": {
    "overall_wcag_compliance": 0.76,
    "compliance_level": "AA_Partial",
    "mathematical_accessibility_score": 0.82,
    "mobile_compatibility_score": 0.68,
    "ready_for_release": false,
    "critical_issues_count": 2,
    "confidence_level": 0.91
  },
  "wcag_aa_compliance": {
    "perceivable": {
      "score": 0.78,
      "criteria_met": 8,
      "criteria_total": 11,
      "issues": [
        {
          "guideline": "1.4.3 Contrast (Minimum)",
          "level": "AA",
          "status": "fail",
          "description": "Light gray text on white background has insufficient contrast (3.2:1)",
          "impact": "low_vision_users",
          "recommendation": "Use darker text color or increase contrast ratio to 4.5:1"
        },
        {
          "guideline": "1.4.4 Resize text",
          "level": "AA",
          "status": "pass",
          "description": "Text scales properly to 200% without content loss"
        }
      ],
      "success_criteria": [
        "1.1.1 Non-text Content: Alt text provided for images",
        "1.2.1 Audio-only and Video-only: Not applicable",
        "1.3.1 Info and Relationships: Proper heading structure",
        "1.3.3 Sensory Characteristics: Not dependent on sensory characteristics"
      ]
    },
    "operable": {
      "score": 0.92,
      "criteria_met": 5,
      "criteria_total": 5,
      "issues": [],
      "notes": "All operable criteria satisfied"
    },
    "understandable": {
      "score": 0.71,
      "criteria_met": 5,
      "criteria_total": 7,
      "issues": [
        {
          "guideline": "3.1.2 Language of Parts",
          "level": "AA",
          "status": "fail",
          "description": "Mathematical notation not properly identified as different language",
          "impact": "screen_reader_users",
          "recommendation": "Use MathML with proper language tagging for mathematical content"
        }
      ]
    },
    "robust": {
      "score": 0.65,
      "criteria_met": 2,
      "criteria_total": 4,
      "issues": [
        {
          "guideline": "4.1.2 Name, Role, Value",
          "level": "A",
          "status": "fail",
          "description": "Mathematical expressions lack proper semantic markup",
          "impact": "assistive_technology_users",
          "recommendation": "Implement MathML for all mathematical expressions"
        }
      ]
    }
  },
  "mathematical_notation_analysis": {
    "latex_quality": {
      "score": 0.89,
      "issues": [
        {
          "type": "formatting",
          "severity": "minor",
          "description": "Inconsistent spacing around operators",
          "location": "equation_3_line_2",
          "suggestion": "Use \\, for thin spaces or \\; for thicker spaces"
        }
      ],
      "strengths": [
        "Correct use of mathematical notation",
        "Proper fraction formatting",
        "Accurate symbol usage"
      ]
    },
    "accessibility_preparation": {
      "mathml_availability": 0.45,
      "screen_reader_compatibility": 0.58,
      "alternative_text_quality": 0.82,
      "semantic_markup": 0.36,
      "improvements_needed": [
        "Convert LaTeX to MathML for screen reader support",
        "Add spoken versions of complex equations",
        "Provide text descriptions of graphical content"
      ]
    },
    "notation_complexity": {
      "average_complexity": "moderate",
      "accessibility_challenges": [
        "Multi-line equations require careful reading order",
        "Subscript notation needs clear verbalization",
        "Mathematical symbols require explanation"
      ],
      "recommended_accommodations": [
        "Provide step-by-step breakdown of complex expressions",
        "Offer graphical representations where helpful",
        "Include glossary of mathematical symbols"
      ]
    }
  },
  "multimodal_accessibility": {
    "visual_representation": {
      "quality": "good",
      "clarity": 0.84,
      "size_appropriateness": 0.78,
      "contrast_adequacy": 0.65
    },
    "textual_representation": {
      "quality": "adequate",
      "plain_text_availability": 0.72,
      "description_completeness": 0.68,
      "reading_order_logical": 0.91
    },
    "auditory_representation": {
      "quality": "needs_improvement",
      "screen_reader_support": 0.58,
      "mathematical_speech_clarity": 0.45,
      "navigation_efficiency": 0.52
    },
    "interactive_representation": {
      "quality": "good",
      "keyboard_accessibility": 0.95,
      "touch_targets_size": 0.78,
      "response_clarity": 0.84
    }
  },
  "technical_rendering_analysis": {
    "cross_platform_compatibility": {
      "desktop_browsers": {
        "chrome": "excellent",
        "firefox": "good",
        "safari": "good",
        "edge": "excellent"
      },
      "mobile_devices": {
        "ios_safari": "adequate",
        "android_chrome": "good",
        "tablet_rendering": "needs_improvement"
      },
      "assistive_technologies": {
        "jaws": "partial",
        "nvda": "partial",
        "voiceover": "adequate",
        "talkback": "needs_improvement"
      }
    },
    "performance_metrics": {
      "load_time": 2.3,
      "math_rendering_time": 0.8,
      "accessibility_load_impact": 0.3,
      "mobile_performance_impact": 0.6
    }
  },
  "improvement_recommendations": {
    "critical_priority": [
      {
        "issue": "Insufficient color contrast in question text",
        "wcag_guideline": "1.4.3",
        "solution": "Change text color to #333333 or darker",
        "effort": "low",
        "impact": "high"
      },
      {
        "issue": "Missing MathML for mathematical expressions",
        "wcag_guideline": "4.1.2",
        "solution": "Convert all LaTeX to MathML with MathJax fallback",
        "effort": "high",
        "impact": "high"
      }
    ],
    "high_priority": [
      {
        "issue": "Inadequate screen reader support for equations",
        "solution": "Add ARIA labels and spoken descriptions",
        "effort": "medium",
        "impact": "high"
      },
      {
        "issue": "Poor mobile rendering of mathematical content",
        "solution": "Implement responsive design for equations",
        "effort": "medium",
        "impact": "medium"
      }
    ],
    "medium_priority": [
      {
        "issue": "Missing alternative text for graphical elements",
        "solution": "Add comprehensive descriptions for all images",
        "effort": "medium",
        "impact": "medium"
      }
    ]
  },
  "accessibility_testing_recommendations": {
    "automated_testing": [
      "WAVE Web Accessibility Evaluation Tool",
      "axe Core accessibility testing",
      "MathJax accessibility checker"
    ],
    "manual_testing": [
      "Screen reader testing with JAWS/NVDA/VoiceOver",
      "Keyboard-only navigation testing",
      "Mobile device accessibility testing",
      "Color contrast verification with colorblind simulators"
    ],
    "user_testing": [
      "Testing with users with visual impairments",
      "Testing with users using screen readers",
      "Testing with users with motor disabilities",
      "Testing across different age groups"
    ]
  },
  "compliance_roadmap": {
    "immediate_actions": [
      "Fix color contrast issues",
      "Add MathML support for critical equations"
    ],
    "short_term_goals": [
      "Complete screen reader compatibility testing",
      "Implement responsive design improvements"
    ],
    "long_term_goals": [
      "Full WCAG 2.1 AAA compliance",
      "Advanced multimodal accessibility features"
    ]
  }
}
```

## LaTeX Best Practices Implementation

### Mathematical Notation Standards
- **Consistent Spacing**: Use appropriate spacing around operators and relations
- **Proper Symbol Usage**: Use correct mathematical symbols and notation
- **Semantic Markup**: Meaningful representation of mathematical concepts
- **Alternative Formats**: Provide plain text equivalents

### Accessibility-Enhanced LaTeX
```latex
% Accessible equation example
\begin{equation}
\label{eq:linear}
y = mx + b \quad \text{where} \quad
m = \text{slope}, \; b = \text{y-intercept}
\end{equation}

% Screen reader friendly version
\text{The equation } y = mx + b \text{ represents a linear relationship,}
\\
\text{where } m \text{ is the slope and } b \text{ is the y-intercept.}
```

### Complex Expression Guidelines
- **Breakdown**: Provide step-by-step explanations for complex expressions
- **Visual Aids**: Use diagrams and illustrations where helpful
- **Multiple Representations**: Offer symbolic, numerical, and graphical forms
- **Context Explanations**: Explain the meaning and application of expressions

## Universal Design for Learning (UDL) Integration

### Multiple Means of Representation
- **Textual**: Clear, well-structured written content
- **Visual**: High-quality mathematical notation and graphics
- **Auditory**: Spoken descriptions and audio explanations
- **Interactive**: Manipulable mathematical objects

### Multiple Means of Action/Expression
- **Varied Response Formats**: Multiple choice, free response, drag-and-drop
- **Accommodation Support**: Tools for students with disabilities
- **Flexible Navigation**: Multiple ways to move through content
- **Adaptive Interfaces**: Adjustments based on user needs

### Multiple Means of Engagement
- **Relevant Contexts**: Culturally responsive examples
- **Difficulty Progression**: Appropriate challenge levels
- **Feedback Mechanisms**: Immediate, specific feedback
- **Choice Opportunities**: Student control over learning path

## Mobile and Cross-Platform Considerations

### Responsive Mathematical Content
- **Fluid Layouts**: Equations that scale appropriately
- **Touch Targets**: Adequate size for interactive elements
- **Performance Optimization**: Fast rendering on mobile devices
- **Offline Capability**: Functionality without internet connection

### Cross-Platform Compatibility
- **Browser Consistency**: Consistent rendering across browsers
- **Device Optimization**: Appropriate formatting for different screen sizes
- **Assistive Technology**: Compatibility with various AT tools
- **Fallback Mechanisms**: Graceful degradation when features unavailable

## Quality Standards

### WCAG 2.1 AA Benchmarks
- **Level A**: Essential accessibility requirements (100% required)
- **Level AA**: Enhanced accessibility requirements (target 90%+)
- **Level AAA**: Highest accessibility level (target where practical)

### Mathematical Accessibility Standards
- **MathML Coverage**: >95% of mathematical expressions
- **Screen Reader Support**: >90% compatibility with major screen readers
- **Alternative Text**: 100% coverage for visual content
- **Navigation Efficiency**: Efficient movement through mathematical content

### Technical Performance Standards
- **Load Time**: <3 seconds for complete page load
- **Rendering Time**: <1 second for mathematical expressions
- **Mobile Performance**: <20% degradation compared to desktop
- **Cross-Platform Consistency**: >95% visual consistency

## Integration with Assessment Systems

### Input Dependencies
- **Item Bank Construction**: Provides items for accessibility analysis
- **Content Creation**: Ensures accessibility from item creation
- **Platform Integration**: Compatibility with delivery systems

### Output Applications
- **Item Improvement**: Specific accessibility enhancements
- **Platform Development**: Technical requirements for delivery systems
- **Compliance Documentation**: Evidence of accessibility compliance
- **Professional Development**: Training for content creators

## Usage Examples

**Comprehensive WCAG Analysis:**
```
Evaluate this assessment item for WCAG 2.1 AA compliance, with special attention to mathematical content accessibility.
```

**Mathematical Accessibility Review:**
```
Analyze the LaTeX formatting and screen reader compatibility of these mathematical expressions. Provide specific improvements.
```

**Mobile Optimization Check:**
```
Assess the mobile responsiveness and cross-platform compatibility of this item's mathematical content.
```

## Advanced Applications

### AI-Powered Accessibility
- **Automatic Alt Text**: AI-generated descriptions for mathematical graphics
- **Voice Synthesis**: Natural-sounding mathematical speech
- **Adaptive Interfaces**: AI-driven interface adjustments based on user needs

### Real-Time Accessibility Monitoring
- **Automated Testing**: Continuous accessibility validation
- **User Feedback Integration**: Collection and analysis of accessibility issues
- **Performance Monitoring**: Real-time accessibility performance metrics

This framework provides comprehensive, standards-based accessibility evaluation that ensures mathematical assessment items are usable by all students, regardless of their abilities or the technology they use.