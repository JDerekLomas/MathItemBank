import {
  Subskill,
  SubskillGenerationRequest,
  SubskillGenerationResult,
  Difficulty
} from '@/types';
import { ClaudeClient } from './claude-client';

/**
 * Generate subskills using AI (Claude) integration
 */
export class SubskillGenerator {
  static readonly DEFAULT_SUBSKILL_COUNT = 4;

  /**
   * Generate subskills for a standard using AI
   */
  static async generateSubskills(
    request: SubskillGenerationRequest,
    useAI: boolean = true
  ): Promise<SubskillGenerationResult> {
    try {
      if (useAI) {
        return await this.generateWithAI(request);
      } else {
        return this.generateWithTemplates(request);
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Generate subskills using Claude AI
   */
  private static async generateWithAI(
    request: SubskillGenerationRequest
  ): Promise<SubskillGenerationResult> {
    const claudeClient = ClaudeClient.getInstance();

    try {
      if (!claudeClient.isConfigured()) {
        return {
          success: false,
          error: 'Claude API not configured. Please set your API key using ClaudeConfigManager.setup() or environment variables.'
        };
      }

      const prompt = this.createAIPrompt(request);

      // Generate structured response from Claude
      const response = await claudeClient.generateJSON<{
        subskills: Array<{
          title: string;
          description: string;
          difficulty: Difficulty;
          estimatedTimeMinutes: number;
          prerequisites: string[];
          keywords: string[];
        }>;
      }>(prompt, {
        type: 'object',
        properties: {
          subskills: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                difficulty: { type: 'string', enum: ['beginning', 'developing', 'proficient', 'advanced'] },
                estimatedTimeMinutes: { type: 'number' },
                prerequisites: { type: 'array', items: { type: 'string' } },
                keywords: { type: 'array', items: { type: 'string' } }
              },
              required: ['title', 'description', 'difficulty', 'estimatedTimeMinutes', 'prerequisites', 'keywords']
            }
          }
        },
        required: ['subskills']
      });

      // Convert Claude response to Subskill objects
      const subskills: Subskill[] = response.subskills.map((skill, index) => ({
        id: `subskill_${request.standardId}_${index + 1}`,
        standardId: request.standardId,
        title: skill.title,
        description: skill.description,
        sequence: index + 1,
        exemplarIds: [],
        keywords: [...skill.keywords, request.domain.toLowerCase(), request.cluster.toLowerCase()],
        difficulty: skill.difficulty,
        estimatedTimeMinutes: skill.estimatedTimeMinutes,
        prerequisites: skill.prerequisites,
        relatedSubskills: [],
        generatedBy: 'ai',
        qualityScore: this.calculateQualityScoreFromResponse(skill, request),
        status: 'draft'
      }));

      return {
        success: true,
        subskills,
        qualityScore: this.calculateQualityScore(subskills, request)
      };
    } catch (error) {
      console.error('Claude API error:', error);
      return {
        success: false,
        error: `AI generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  /**
   * Generate subskills using rule-based templates
   */
  private static generateWithTemplates(
    request: SubskillGenerationRequest
  ): SubskillGenerationResult {
    try {
      const subskills = this.createTemplateSubskills(request);

      return {
        success: true,
        subskills,
        qualityScore: this.calculateQualityScore(subskills, request)
      };
    } catch (error) {
      return {
        success: false,
        error: `Template generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  
  
  /**
   * Create template-based subskills
   */
  private static createTemplateSubskills(request: SubskillGenerationRequest): Subskill[] {
    const templates = this.getDomainSubskillTemplates(request.domain);
    const subskills: Subskill[] = [];

    for (let i = 0; i < Math.min(request.targetSubskillCount, templates.length); i++) {
      const template = templates[i];
      const difficulty = this.getDifficultyBySequence(i, request.targetSubskillCount);

      subskills.push({
        id: `subskill_${request.standardId}_${i + 1}`,
        standardId: request.standardId,
        title: template.title,
        description: template.description,
        sequence: i + 1,
        exemplarIds: [],
        keywords: template.keywords,
        difficulty,
        estimatedTimeMinutes: this.estimateTimeByDifficulty(difficulty),
        prerequisites: [],
        relatedSubskills: [],
        generatedBy: 'template',
        status: 'draft'
      });
    }

    return subskills;
  }

  /**
   * Get domain-specific subskill templates
   */
  private static getDomainSubskillTemplates(domain: string): Array<{
    title: string;
    description: string;
    keywords: string[];
  }> {
    const templates: Record<string, Array<{title: string; description: string; keywords: string[]}>> = {
      'Algebra': [
        {
          title: 'Identify and simplify algebraic expressions',
          description: 'Students will be able to recognize algebraic expressions, combine like terms, and apply the distributive property to simplify expressions.',
          keywords: ['expressions', 'simplify', 'distributive property', 'like terms']
        },
        {
          title: 'Solve linear equations with one variable',
          description: 'Students will solve linear equations using inverse operations, check solutions, and handle equations with variables on both sides.',
          keywords: ['equations', 'solve', 'inverse operations', 'solutions']
        },
        {
          title: 'Apply algebraic reasoning to word problems',
          description: 'Students will translate real-world situations into algebraic equations and solve problems using algebraic methods.',
          keywords: ['word problems', 'translation', 'applications', 'reasoning']
        },
        {
          title: 'Analyze and interpret solutions in context',
          description: 'Students will evaluate whether solutions are reasonable within the context of the original problem and explain their reasoning.',
          keywords: ['interpretation', 'context', 'reasonableness', 'explanation']
        }
      ],
      'Geometry': [
        {
          title: 'Identify and classify geometric figures',
          description: 'Students will recognize and classify two-dimensional and three-dimensional shapes based on their properties.',
          keywords: ['shapes', 'classification', 'properties', 'figures']
        },
        {
          title: 'Apply geometric formulas and theorems',
          description: 'Students will use area, perimeter, volume formulas and apply geometric theorems to solve problems.',
          keywords: ['formulas', 'theorems', 'area', 'perimeter', 'volume']
        },
        {
          title: 'Analyze geometric relationships and transformations',
          description: 'Students will understand congruence, similarity, and transformations in the coordinate plane.',
          keywords: ['transformations', 'congruence', 'similarity', 'coordinates']
        },
        {
          title: 'Solve geometric problems with proofs',
          description: 'Students will construct logical arguments and proofs to justify geometric relationships.',
          keywords: ['proofs', 'logic', 'arguments', 'justification']
        }
      ],
      'Functions': [
        {
          title: 'Understand function notation and terminology',
          description: 'Students will use function notation, identify domain and range, and understand the concept of a function.',
          keywords: ['function notation', 'domain', 'range', 'input', 'output']
        },
        {
          title: 'Graph and analyze function behavior',
          description: 'Students will graph various types of functions and analyze key features such as intercepts, maxima, and minima.',
          keywords: ['graphing', 'analysis', 'intercepts', 'extrema', 'behavior']
        },
        {
          title: 'Connect different representations of functions',
          description: 'Students will translate between tables, graphs, equations, and verbal descriptions of functions.',
          keywords: ['representations', 'translation', 'tables', 'graphs', 'equations']
        },
        {
          title: 'Apply functions to model real-world situations',
          description: 'Students will use functions to represent and solve problems involving real-world relationships.',
          keywords: ['modeling', 'applications', 'real-world', 'relationships']
        }
      ],
      'Statistics & Probability': [
        {
          title: 'Collect and organize data',
          description: 'Students will design data collection methods and organize data using appropriate representations.',
          keywords: ['data collection', 'organization', 'sampling', 'representation']
        },
        {
          title: 'Calculate and interpret statistical measures',
          description: 'Students will compute measures of center, spread, and position and interpret their meaning.',
          keywords: ['measures of center', 'spread', 'mean', 'median', 'mode', 'range']
        },
        {
          title: 'Analyze data distributions and patterns',
          description: 'Students will analyze shape, center, and spread of data distributions and identify patterns.',
          keywords: ['distributions', 'patterns', 'shape', 'analysis', 'visualization']
        },
        {
          title: 'Calculate and apply probability concepts',
          description: 'Students will calculate theoretical and experimental probabilities and apply them to real situations.',
          keywords: ['probability', 'theoretical', 'experimental', 'outcomes', 'events']
        }
      ],
      'Number & Quantity': [
        {
          title: 'Understand number systems and properties',
          description: 'Students will work with real numbers, rational numbers, and understand number system properties.',
          keywords: ['number systems', 'properties', 'rational', 'irrational', 'real numbers']
        },
        {
          title: 'Perform operations with complex numbers',
          description: 'Students will add, subtract, multiply, and divide complex numbers and use them in problem solving.',
          keywords: ['complex numbers', 'operations', 'imaginary numbers', 'problem solving']
        },
        {
          title: 'Work with vectors and matrices',
          description: 'Students will perform basic operations with vectors and matrices and apply them to solve problems.',
          keywords: ['vectors', 'matrices', 'operations', 'applications']
        },
        {
          title: 'Apply quantitative reasoning',
          description: 'Students will use units, dimensional analysis, and quantitative reasoning in problem solving.',
          keywords: ['quantitative reasoning', 'units', 'dimensional analysis', 'problem solving']
        }
      ]
    };

    return templates[domain] || templates['Algebra']; // Default to Algebra templates
  }

  /**
   * Get difficulty based on sequence position
   */
  private static getDifficultyBySequence(
    sequence: number,
    totalSubskills: number
  ): Difficulty {
    if (totalSubskills <= 2) {
      return sequence === 0 ? 'beginning' : 'proficient';
    }

    const position = sequence / (totalSubskills - 1);
    if (position < 0.33) return 'beginning';
    if (position < 0.67) return 'developing';
    if (position < 0.9) return 'proficient';
    return 'advanced';
  }

  /**
   * Estimate time by difficulty level
   */
  private static estimateTimeByDifficulty(difficulty: Difficulty): number {
    const times = {
      beginning: 15,
      developing: 20,
      proficient: 25,
      advanced: 30
    };
    return times[difficulty];
  }

  /**
   * Calculate quality score for generated subskills
   */
  private static calculateQualityScore(
    subskills: Subskill[],
    request: SubskillGenerationRequest
  ): number {
    let score = 0;
    const totalChecks = 5;

    // Check if we have the right number of subskills
    if (subskills.length === request.targetSubskillCount) score += 1;

    // Check if subskills have proper sequencing
    const sequences = subskills.map(s => s.sequence).sort((a, b) => a - b);
    if (sequences.every((seq, index) => seq === index + 1)) score += 1;

    // Check if all required fields are present
    const hasAllFields = subskills.every(subskill =>
      subskill.title &&
      subskill.description &&
      subskill.difficulty &&
      subskill.estimatedTimeMinutes > 0
    );
    if (hasAllFields) score += 1;

    // Check if difficulty progression makes sense
    const difficulties = subskills.map(s => s.difficulty);
    const hasProgression = difficulties.some((diff, index) => {
      if (index === 0) return true;
      const prevIndex = ['beginning', 'developing', 'proficient', 'advanced'].indexOf(difficulties[index - 1]);
      const currIndex = ['beginning', 'developing', 'proficient', 'advanced'].indexOf(diff);
      return currIndex >= prevIndex;
    });
    if (hasProgression) score += 1;

    // Check if descriptions are appropriate length
    const hasGoodDescriptions = subskills.every(subskill =>
      subskill.description.length >= 50 && subskill.description.length <= 500
    );
    if (hasGoodDescriptions) score += 1;

    return score / totalChecks;
  }

  /**
   * Calculate quality score from AI response
   */
  private static calculateQualityScoreFromResponse(
    skill: any,
    _request: SubskillGenerationRequest
  ): number {
    let score = 0;
    const maxScore = 100;

    // Title quality (25%)
    if (skill.title && skill.title.length > 10 && skill.title.length <= 60) score += 25;

    // Description quality (25%)
    if (skill.description && skill.description.length >= 50 && skill.description.length <= 300) score += 25;

    // Valid difficulty (20%)
    if (['beginning', 'developing', 'proficient', 'advanced'].includes(skill.difficulty)) score += 20;

    // Reasonable time estimate (15%)
    if (skill.estimatedTimeMinutes >= 5 && skill.estimatedTimeMinutes <= 60) score += 15;

    // Keywords present (15%)
    if (skill.keywords && Array.isArray(skill.keywords) && skill.keywords.length > 0) score += 15;

    return score / maxScore;
  }

  /**
   * Create AI prompt for subskill generation
   */
  private static createAIPrompt(request: SubskillGenerationRequest): string {
    return `
You are an expert in K-12 mathematics curriculum design. Given the following math standard, please break it down into ${request.targetSubskillCount} distinct, assessable subskills.

STANDARD DETAILS:
- Grade Level: ${request.gradeLevel}
- Domain: ${request.domain}
- Cluster: ${request.cluster}
- Standard: "${request.standardDescription}"

REQUIREMENTS:
1. Create exactly ${request.targetSubskillCount} subskills
2. Each subskill should be:
   - Specific and measurable
   - Distinct from other subskills
   - Appropriate for grade ${request.gradeLevel}
   - Essential for mastering the standard
3. For each subskill provide:
   - Clear title (10-60 characters)
   - Detailed description (50-300 words)
   - Estimated difficulty level (beginning, developing, proficient, or advanced)
   - Prerequisite knowledge needed (array of subskill dependencies)
   - Keywords for categorization (3-7 relevant terms)
   - Estimated time to master (5-60 minutes)

${request.customInstructions ? `ADDITIONAL INSTRUCTIONS: ${request.customInstructions}` : ''}

Focus on creating subskills that can be assessed independently and build logically toward full standard mastery.

Return your response as a JSON object with this structure:
{
  "subskills": [
    {
      "title": "Subskill title",
      "description": "Detailed description of what students should be able to do",
      "difficulty": "beginning|developing|proficient|advanced",
      "estimatedTimeMinutes": 15,
      "prerequisites": ["prerequisite1", "prerequisite2"],
      "keywords": ["keyword1", "keyword2", "keyword3"]
    }
  ]
}
`;
  }

  /**
   * Batch generate subskills for multiple standards
   */
  static async generateSubskillsBatch(
    requests: SubskillGenerationRequest[],
    useAI: boolean = true,
    progressCallback?: (current: number, total: number) => void
  ): Promise<SubskillGenerationResult[]> {
    const results: SubskillGenerationResult[] = [];

    for (let i = 0; i < requests.length; i++) {
      const result = await this.generateSubskills(requests[i], useAI);
      results.push(result);

      if (progressCallback) {
        progressCallback(i + 1, requests.length);
      }

      // Add small delay to prevent overwhelming API
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return results;
  }
}