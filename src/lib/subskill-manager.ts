import {
  Subskill,
  MathStandard,
  MathItem,
  SubskillGenerationRequest,
  SubskillGenerationResult,
  SubskillAnalysis,
  Difficulty
} from '@/types';
import { SubskillGenerator } from './subskill-generator';

/**
 * Manage subskills within the item bank
 */
export class SubskillManager {
  private subskills: Subskill[] = [];
  private standards: MathStandard[] = [];
  private items: MathItem[] = [];

  /**
   * Initialize with existing data
   */
  initialize(
    subskills: Subskill[] = [],
    standards: MathStandard[] = [],
    items: MathItem[] = []
  ): void {
    this.subskills = subskills;
    this.standards = standards;
    this.items = items;
  }

  /**
   * Add subskills
   */
  addSubskills(subskills: Subskill[]): void {
    this.subskills.push(...subskills);
  }

  /**
   * Add single subskill
   */
  addSubskill(subskill: Subskill): void {
    this.subskills.push(subskill);
  }

  /**
   * Update subskill
   */
  updateSubskill(subskillId: string, updates: Partial<Subskill>): boolean {
    const index = this.subskills.findIndex(s => s.id === subskillId);
    if (index !== -1) {
      this.subskills[index] = { ...this.subskills[index], ...updates };
      return true;
    }
    return false;
  }

  /**
   * Delete subskill
   */
  deleteSubskill(subskillId: string): boolean {
    const index = this.subskills.findIndex(s => s.id === subskillId);
    if (index !== -1) {
      // Remove from standards' subskillIds
      this.standards.forEach(standard => {
        standard.subskillIds = standard.subskillIds.filter(id => id !== subskillId);
      });

      // Remove from items' subskillIds
      this.items.forEach(item => {
        item.subskillIds = item.subskillIds.filter(id => id !== subskillId);
      });

      this.subskills.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Get subskill by ID
   */
  getSubskill(subskillId: string): Subskill | undefined {
    return this.subskills.find(s => s.id === subskillId);
  }

  /**
   * Get all subskills
   */
  getSubskills(): Subskill[] {
    return [...this.subskills];
  }

  /**
   * Get subskills by standard
   */
  getSubskillsByStandard(standardId: string): Subskill[] {
    return this.subskills
      .filter(s => s.standardId === standardId)
      .sort((a, b) => a.sequence - b.sequence);
  }

  /**
   * Get subskills by domain
   */
  getSubskillsByDomain(domain: string): Subskill[] {
    const standardIds = this.standards
      .filter(s => s.domain === domain)
      .map(s => s.id);

    return this.subskills.filter(s => standardIds.includes(s.standardId));
  }

  /**
   * Get subskills by difficulty
   */
  getSubskillsByDifficulty(difficulty: Difficulty): Subskill[] {
    return this.subskills.filter(s => s.difficulty === difficulty);
  }

  /**
   * Get subskills by status
   */
  getSubskillsByStatus(status: 'draft' | 'reviewed' | 'approved'): Subskill[] {
    return this.subskills.filter(s => s.status === status);
  }

  /**
   * Search subskills
   */
  searchSubskills(query: string): Subskill[] {
    const lowerQuery = query.toLowerCase();
    return this.subskills.filter(subskill =>
      subskill.title.toLowerCase().includes(lowerQuery) ||
      subskill.description.toLowerCase().includes(lowerQuery) ||
      subskill.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery))
    );
  }

  /**
   * Generate subskills for a standard
   */
  async generateSubskillsForStandard(
    standard: MathStandard,
    options: {
      targetCount?: number;
      useAI?: boolean;
      customInstructions?: string;
    } = {}
  ): Promise<SubskillGenerationResult> {
    const request: SubskillGenerationRequest = {
      standardId: standard.id,
      standardDescription: standard.description,
      gradeLevel: standard.gradeLevel,
      domain: standard.domain,
      cluster: standard.cluster,
      targetSubskillCount: options.targetCount || SubskillGenerator.DEFAULT_SUBSKILL_COUNT,
      ...(options.customInstructions && { customInstructions: options.customInstructions })
    };

    const result = await SubskillGenerator.generateSubskills(request, options.useAI);

    if (result.success && result.subskills) {
      // Add generated subskills
      this.addSubskills(result.subskills);

      // Update standard with subskill IDs
      standard.subskillIds = result.subskills.map(s => s.id);
    }

    return result;
  }

  /**
   * Batch generate subskills for multiple standards
   */
  async generateSubskillsBatch(
    standards: MathStandard[],
    options: {
      targetCount?: number;
      useAI?: boolean;
      customInstructions?: string;
      progressCallback?: (current: number, total: number) => void;
    } = {}
  ): Promise<SubskillGenerationResult[]> {
    const requests: SubskillGenerationRequest[] = standards.map(standard => ({
      standardId: standard.id,
      standardDescription: standard.description,
      gradeLevel: standard.gradeLevel,
      domain: standard.domain,
      cluster: standard.cluster,
      targetSubskillCount: options.targetCount || SubskillGenerator.DEFAULT_SUBSKILL_COUNT,
      ...(options.customInstructions && { customInstructions: options.customInstructions })
    }));

    const results = await SubskillGenerator.generateSubskillsBatch(
      requests,
      options.useAI,
      options.progressCallback
    );

    // Add successful results to the manager
    results.forEach((result, index) => {
      if (result.success && result.subskills) {
        this.addSubskills(result.subskills);
        standards[index].subskillIds = result.subskills.map(s => s.id);
      }
    });

    return results;
  }

  /**
   * Assign subskills to existing items
   */
  assignSubskillsToItem(itemId: string, subskillIds: string[]): boolean {
    const item = this.items.find(i => i.id === itemId);
    if (item) {
      item.subskillIds = subskillIds;
      return true;
    }
    return false;
  }

  /**
   * Auto-assign subskills to items based on content analysis
   */
  autoAssignSubskillsToItems(
    items: MathItem[],
    minMatchScore: number = 0.3
  ): { itemId: string; subskillIds: string[]; matchScores: number[] }[] {
    const results: { itemId: string; subskillIds: string[]; matchScores: number[] }[] = [];

    items.forEach(item => {
      const standard = this.standards.find(s => s.id === item.standardId);
      if (!standard) return;

      const standardSubskills = this.getSubskillsByStandard(standard.id);
      if (standardSubskills.length === 0) return;

      // Calculate match scores for each subskill
      const matches = standardSubskills.map(subskill => ({
        subskillId: subskill.id,
        score: this.calculateSubskillMatch(item, subskill)
      }));

      // Filter by minimum score and get top matches
      const validMatches = matches
        .filter(match => match.score >= minMatchScore)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3); // Top 3 matches

      if (validMatches.length > 0) {
        const subskillIds = validMatches.map(m => m.subskillId);
        const matchScores = validMatches.map(m => m.score);

        item.subskillIds = subskillIds;
        results.push({ itemId: item.id, subskillIds, matchScores });
      }
    });

    return results;
  }

  /**
   * Calculate match score between item and subskill
   */
  private calculateSubskillMatch(item: MathItem, subskill: Subskill): number {
    let score = 0;
    const maxScore = 100;

    // Title matching (30%)
    const titleScore = this.textSimilarity(item.title.toLowerCase(), subskill.title.toLowerCase());
    score += titleScore * 30;

    // Question content matching (40%)
    const questionScore = this.textSimilarity(item.question.toLowerCase(), subskill.description.toLowerCase());
    score += questionScore * 40;

    // Keywords matching (20%)
    const keywordsScore = this.calculateKeywordMatch(item, subskill);
    score += keywordsScore * 20;

    // Difficulty alignment (10%)
    const difficultyScore = this.calculateDifficultyAlignment(item.difficulty, subskill.difficulty);
    score += difficultyScore * 10;

    return score / maxScore;
  }

  /**
   * Calculate text similarity using simple word overlap
   */
  private textSimilarity(text1: string, text2: string): number {
    const words1 = text1.split(/\s+/).filter(w => w.length > 2);
    const words2 = text2.split(/\s+/).filter(w => w.length > 2);

    if (words1.length === 0 || words2.length === 0) return 0;

    const intersection = words1.filter(word => words2.includes(word));
    const union = [...new Set([...words1, ...words2])];

    return intersection.length / union.length;
  }

  /**
   * Calculate keyword match score
   */
  private calculateKeywordMatch(item: MathItem, subskill: Subskill): number {
    const itemWords = [
      ...item.title.toLowerCase().split(/\s+/),
      ...item.question.toLowerCase().split(/\s+/),
      ...item.metadata.keywords.map(k => k.toLowerCase())
    ].filter(w => w.length > 2);

    const subskillKeywords = subskill.keywords.map(k => k.toLowerCase());

    if (subskillKeywords.length === 0) return 0;

    const matches = subskillKeywords.filter(keyword =>
      itemWords.some(word => word.includes(keyword) || keyword.includes(word))
    );

    return matches.length / subskillKeywords.length;
  }

  /**
   * Calculate difficulty alignment score
   */
  private calculateDifficultyAlignment(
    itemDifficulty: Difficulty,
    subskillDifficulty: Difficulty
  ): number {
    const difficultyLevels = ['beginning', 'developing', 'proficient', 'advanced'];
    const itemIndex = difficultyLevels.indexOf(itemDifficulty);
    const subskillIndex = difficultyLevels.indexOf(subskillDifficulty);

    const distance = Math.abs(itemIndex - subskillIndex);
    return Math.max(0, 1 - (distance / 3));
  }

  /**
   * Get subskill hierarchy and relationships
   */
  getSubskillHierarchy(): {
    domains: Record<string, { standards: Record<string, Subskill[]> }>;
    relationships: Array<{ from: string; to: string; type: string }>;
  } {
    const hierarchy: Record<string, { standards: Record<string, Subskill[]> }> = {};
    const relationships: Array<{ from: string; to: string; type: string }> = [];

    // Build hierarchy
    this.standards.forEach(standard => {
      if (!hierarchy[standard.domain]) {
        hierarchy[standard.domain] = { standards: {} };
      }

      const subskills = this.getSubskillsByStandard(standard.id);
      hierarchy[standard.domain].standards[standard.id] = subskills;

      // Add relationships
      subskills.forEach(subskill => {
        subskill.prerequisites.forEach(prereq => {
          relationships.push({ from: prereq, to: subskill.id, type: 'prerequisite' });
        });

        subskill.relatedSubskills.forEach(related => {
          relationships.push({ from: subskill.id, to: related, type: 'related' });
        });
      });
    });

    return { domains: hierarchy, relationships };
  }

  /**
   * Get comprehensive subskill analysis
   */
  getSubskillAnalysis(): SubskillAnalysis {
    const analysis: SubskillAnalysis = {
      totalSubskills: this.subskills.length,
      subskillsByStandard: {},
      subskillsByDomain: {},
      averageSubskillsPerStandard: 0,
      coverageByDifficulty: {
        beginning: 0,
        developing: 0,
        proficient: 0,
        advanced: 0
      },
      subskillsWithoutItems: [],
      itemsBySubskill: {}
    };

    // Count by standard
    this.standards.forEach(standard => {
      const count = this.subskills.filter(s => s.standardId === standard.id).length;
      analysis.subskillsByStandard[standard.id] = count;
    });

    // Count by domain
    this.standards.forEach(standard => {
      const domainSubskills = this.subskills.filter(s => s.standardId === standard.id);
      if (!analysis.subskillsByDomain[standard.domain]) {
        analysis.subskillsByDomain[standard.domain] = 0;
      }
      analysis.subskillsByDomain[standard.domain] += domainSubskills.length;
    });

    // Average subskills per standard
    const standardsWithSubskills = Object.keys(analysis.subskillsByStandard).filter(
      id => analysis.subskillsByStandard[id] > 0
    );
    if (standardsWithSubskills.length > 0) {
      const totalSubskills = standardsWithSubskills.reduce(
        (sum, id) => sum + analysis.subskillsByStandard[id], 0
      );
      analysis.averageSubskillsPerStandard = totalSubskills / standardsWithSubskills.length;
    }

    // Coverage by difficulty
    this.subskills.forEach(subskill => {
      analysis.coverageByDifficulty[subskill.difficulty]++;
    });

    // Items by subskill and subskills without items
    this.subskills.forEach(subskill => {
      const itemCount = this.items.filter(item =>
        item.subskillIds.includes(subskill.id)
      ).length;

      analysis.itemsBySubskill[subskill.id] = itemCount;

      if (itemCount === 0) {
        analysis.subskillsWithoutItems.push(subskill.id);
      }
    });

    return analysis;
  }

  /**
   * Get subskill coverage gaps
   */
  getCoverageGaps(): {
    standardsWithoutSubskills: string[];
    subskillsWithoutItems: string[];
    domainsWithLowCoverage: string[];
    difficultyImbalances: Record<string, Difficulty[]>;
  } {
    const analysis = this.getSubskillAnalysis();
    const standardsWithoutSubskills = this.standards
      .filter(s => !s.subskillIds || s.subskillIds.length === 0)
      .map(s => s.id);

    const domainsWithLowCoverage = Object.entries(analysis.subskillsByDomain)
      .filter(([, count]) => count < 5) // Less than 5 subskills per domain
      .map(([domain]) => domain);

    const difficultyImbalances: Record<string, Difficulty[]> = {};
    Object.entries(analysis.subskillsByDomain).forEach(([domain]) => {
      const domainSubskills = this.getSubskillsByDomain(domain);
      const difficultyCounts: Record<Difficulty, number> = {
        beginning: 0,
        developing: 0,
        proficient: 0,
        advanced: 0
      };

      domainSubskills.forEach(subskill => {
        difficultyCounts[subskill.difficulty]++;
      });

      const missingDifficulties = (Object.keys(difficultyCounts) as Difficulty[])
        .filter(diff => difficultyCounts[diff] === 0);

      if (missingDifficulties.length > 0) {
        difficultyImbalances[domain] = missingDifficulties;
      }
    });

    return {
      standardsWithoutSubskills,
      subskillsWithoutItems: analysis.subskillsWithoutItems,
      domainsWithLowCoverage,
      difficultyImbalances
    };
  }

  /**
   * Validate subskill data integrity
   */
  validateSubskillData(): {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check for duplicate IDs
    const subskillIds = this.subskills.map(s => s.id);
    const duplicateIds = subskillIds.filter((id, index) => subskillIds.indexOf(id) !== index);
    if (duplicateIds.length > 0) {
      errors.push(`Duplicate subskill IDs: ${duplicateIds.join(', ')}`);
    }

    // Check for orphaned subskills (no standard)
    const standardIds = this.standards.map(s => s.id);
    const orphanedSubskills = this.subskills.filter(s => !standardIds.includes(s.standardId));
    if (orphanedSubskills.length > 0) {
      errors.push(`Orphaned subskills (no standard found): ${orphanedSubskills.map(s => s.id).join(', ')}`);
    }

    // Check for missing required fields
    this.subskills.forEach(subskill => {
      if (!subskill.title || subskill.title.trim() === '') {
        errors.push(`Subskill ${subskill.id} missing title`);
      }
      if (!subskill.description || subskill.description.trim() === '') {
        errors.push(`Subskill ${subskill.id} missing description`);
      }
      if (subskill.estimatedTimeMinutes <= 0) {
        warnings.push(`Subskill ${subskill.id} has invalid estimated time: ${subskill.estimatedTimeMinutes}`);
      }
    });

    // Check for sequence gaps
    this.standards.forEach(standard => {
      const subskills = this.getSubskillsByStandard(standard.id);
      const sequences = subskills.map(s => s.sequence).sort((a, b) => a - b);

      for (let i = 0; i < sequences.length; i++) {
        if (sequences[i] !== i + 1) {
          warnings.push(`Standard ${standard.id} has subskill sequence gap: expected ${i + 1}, found ${sequences[i]}`);
          break;
        }
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }
}