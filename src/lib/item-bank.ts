import { MathStandard, MathItem, ItemBank, FilterOptions, ItemBankStatistics, Difficulty, ItemType, Subskill } from '@/types';
import { StandardsParser } from './standards-parser';
import { MathItemGenerator } from './item-generator';
import { SubskillManager } from './subskill-manager';

/**
 * Main item bank manager
 */
export class ItemBankManager {
  private standards: MathStandard[] = [];
  private items: MathItem[] = [];
  private subskillManager: SubskillManager;

  constructor() {
    this.subskillManager = new SubskillManager();
  }

  /**
   * Initialize item bank with CSV data
   */
  async initializeFromCSV(csvFilePath: string): Promise<void> {
    try {
      const fs = await import('fs/promises');
      const csvContent = await fs.readFile(csvFilePath, 'utf-8');
      this.standards = StandardsParser.parseCSV(csvContent);

      // Initialize subskill manager with loaded data
      this.subskillManager.initialize([], this.standards, this.items);

      console.log(`Loaded ${this.standards.length} math standards`);
    } catch (error) {
      throw new Error(`Failed to load CSV file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Generate items for all standards
   */
  async generateItemsForAllStandards(options: {
    itemsPerStandard?: number;
    itemTypes?: ItemType[];
    difficulties?: Difficulty[];
    progressCallback?: (current: number, total: number) => void;
  } = {}): Promise<void> {
    const {
      itemsPerStandard = 3,
      itemTypes = ['multiple_choice', 'short_answer'],
      difficulties = ['developing', 'proficient'],
      progressCallback
    } = options;

    this.items = [];
    const totalStandards = this.standards.length;

    for (let i = 0; i < totalStandards; i++) {
      const standard = this.standards[i];

      try {
        const results = await MathItemGenerator.generateItems(standard, {
          count: itemsPerStandard,
          itemTypes,
          difficulties
        });

        results.forEach(result => {
          if (result.success && result.item) {
            this.items.push(result.item);
          }
        });

        if (progressCallback) {
          progressCallback(i + 1, totalStandards);
        }

        // Add small delay to prevent overwhelming system
        await new Promise(resolve => setTimeout(resolve, 10));
      } catch (error) {
        console.error(`Failed to generate items for standard ${standard.id}:`, error);
      }
    }

    console.log(`Generated ${this.items.length} items for ${totalStandards} standards`);
  }

  /**
   * Generate items for specific grade levels
   */
  async generateItemsForGrades(
    grades: string[],
    options: {
      itemsPerStandard?: number;
      itemTypes?: ItemType[];
      difficulties?: Difficulty[];
    } = {}
  ): Promise<MathItem[]> {
    const filteredStandards = this.standards.filter(standard =>
      grades.includes(standard.gradeLevel)
    );

    const allItems: MathItem[] = [];

    for (const standard of filteredStandards) {
      const results = await MathItemGenerator.generateItems(standard, options);
      results.forEach(result => {
        if (result.success && result.item) {
          allItems.push(result.item);
        }
      });
    }

    return allItems;
  }

  /**
   * Generate items for specific domains
   */
  async generateItemsForDomains(
    domains: string[],
    options: {
      itemsPerStandard?: number;
      itemTypes?: ItemType[];
      difficulties?: Difficulty[];
    } = {}
  ): Promise<MathItem[]> {
    const filteredStandards = this.standards.filter(standard =>
      domains.includes(standard.domain)
    );

    const allItems: MathItem[] = [];

    for (const standard of filteredStandards) {
      const results = await MathItemGenerator.generateItems(standard, options);
      results.forEach(result => {
        if (result.success && result.item) {
          allItems.push(result.item);
        }
      });
    }

    return allItems;
  }

  /**
   * Get items by filter criteria
   */
  getFilteredItems(filter: FilterOptions): MathItem[] {
    let filteredItems = [...this.items];

    if (filter.gradeLevels && filter.gradeLevels.length > 0) {
      const standardIds = this.standards
        .filter(s => filter.gradeLevels!.includes(s.gradeLevel))
        .map(s => s.id);
      filteredItems = filteredItems.filter(item => standardIds.includes(item.standardId));
    }

    if (filter.domains && filter.domains.length > 0) {
      const standardIds = this.standards
        .filter(s => filter.domains!.includes(s.domain))
        .map(s => s.id);
      filteredItems = filteredItems.filter(item => standardIds.includes(item.standardId));
    }

    if (filter.difficulties && filter.difficulties.length > 0) {
      filteredItems = filteredItems.filter(item => filter.difficulties!.includes(item.difficulty));
    }

    if (filter.itemTypes && filter.itemTypes.length > 0) {
      filteredItems = filteredItems.filter(item => filter.itemTypes!.includes(item.type));
    }

    if (filter.keywords && filter.keywords.length > 0) {
      filteredItems = filteredItems.filter(item =>
        filter.keywords!.some(keyword =>
          item.title.toLowerCase().includes(keyword.toLowerCase()) ||
          item.question.toLowerCase().includes(keyword.toLowerCase()) ||
          item.metadata.keywords.some(k => k.toLowerCase().includes(keyword.toLowerCase()))
        )
      );
    }

    if (filter.calculatorAllowed !== undefined) {
      filteredItems = filteredItems.filter(item => item.metadata.calculatorAllowed === filter.calculatorAllowed);
    }

    if (filter.maxTime !== undefined) {
      filteredItems = filteredItems.filter(item => item.metadata.estimatedTimeMinutes <= filter.maxTime!);
    }

    return filteredItems;
  }

  /**
   * Get item bank statistics
   */
  getStatistics(): ItemBankStatistics {
    const stats: ItemBankStatistics = {
      totalItems: this.items.length,
      itemsByGrade: {},
      itemsByDifficulty: {
        beginning: 0,
        developing: 0,
        proficient: 0,
        advanced: 0
      },
      itemsByType: {} as Record<ItemType, number>,
      itemsByDomain: {},
      averageDifficulty: 0
    };

    // Initialize counters
    this.standards.forEach(standard => {
      if (!stats.itemsByGrade[standard.gradeLevel]) {
        stats.itemsByGrade[standard.gradeLevel] = 0;
      }
      if (!stats.itemsByDomain[standard.domain]) {
        stats.itemsByDomain[standard.domain] = 0;
      }
    });

    // Count items by various criteria
    this.items.forEach(item => {
      const standard = this.standards.find(s => s.id === item.standardId);
      if (standard) {
        stats.itemsByGrade[standard.gradeLevel]++;
        stats.itemsByDomain[standard.domain]++;
      }

      stats.itemsByDifficulty[item.difficulty]++;
      stats.itemsByType[item.type] = (stats.itemsByType[item.type] || 0) + 1;
    });

    // Calculate average difficulty (1-4 scale)
    const difficultyValues = { beginning: 1, developing: 2, proficient: 3, advanced: 4 };
    const totalDifficulty = this.items.reduce((sum, item) =>
      sum + difficultyValues[item.difficulty], 0);
    stats.averageDifficulty = this.items.length > 0 ? totalDifficulty / this.items.length : 0;

    return stats;
  }

  /**
   * Get standards
   */
  getStandards(): MathStandard[] {
    return [...this.standards];
  }

  /**
   * Get items
   */
  getItems(): MathItem[] {
    return [...this.items];
  }

  /**
   * Get standards by grade level
   */
  getStandardsByGrade(grade: string): MathStandard[] {
    return this.standards.filter(standard => standard.gradeLevel === grade);
  }

  /**
   * Get standards by domain
   */
  getStandardsByDomain(domain: string): MathStandard[] {
    return this.standards.filter(standard => standard.domain === domain);
  }

  /**
   * Search standards
   */
  searchStandards(query: string): MathStandard[] {
    return StandardsParser.searchStandards(this.standards, query);
  }

  /**
   * Get full item bank
   */
  getItemBank(): ItemBank {
    return {
      standards: this.standards,
      subskills: this.subskillManager.getSubskills(),
      items: this.items,
      statistics: this.getStatistics()
    };
  }

  /**
   * Add custom item
   */
  addItem(item: MathItem): void {
    this.items.push(item);
  }

  /**
   * Add multiple items
   */
  addItems(items: MathItem[]): void {
    this.items.push(...items);
  }

  /**
   * Remove item by ID
   */
  removeItem(itemId: string): boolean {
    const index = this.items.findIndex(item => item.id === itemId);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Update item
   */
  updateItem(itemId: string, updates: Partial<MathItem>): boolean {
    const index = this.items.findIndex(item => item.id === itemId);
    if (index !== -1) {
      this.items[index] = {
        ...this.items[index],
        ...updates,
        id: itemId, // Preserve ID
        metadata: {
          ...this.items[index].metadata,
          ...updates.metadata,
          lastModified: new Date()
        }
      };
      return true;
    }
    return false;
  }

  /**
   * Clear all items
   */
  clearItems(): void {
    this.items = [];
  }

  /**
   * Clear all standards and items
   */
  clearAll(): void {
    this.standards = [];
    this.items = [];
    this.subskillManager.initialize([], [], []);
  }

  // ===== SUBSKILL MANAGEMENT METHODS =====

  /**
   * Generate subskills for a specific standard
   */
  async generateSubskillsForStandard(
    standardId: string,
    options: {
      targetCount?: number;
      useAI?: boolean;
      customInstructions?: string;
    } = {}
  ): Promise<{ success: boolean; subskills?: Subskill[]; error?: string }> {
    const standard = this.standards.find(s => s.id === standardId);
    if (!standard) {
      return { success: false, error: `Standard ${standardId} not found` };
    }

    try {
      const result = await this.subskillManager.generateSubskillsForStandard(standard, options);
      const returnObj: { success: boolean; subskills?: Subskill[]; error?: string } = {
        success: result.success
      };
      if (result.subskills) returnObj.subskills = result.subskills;
      if (result.error) returnObj.error = result.error;
      return returnObj;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Generate subskills for multiple standards
   */
  async generateSubskillsBatch(
    standardIds: string[],
    options: {
      targetCount?: number;
      useAI?: boolean;
      customInstructions?: string;
      progressCallback?: (current: number, total: number) => void;
    } = {}
  ): Promise<{ standardId: string; success: boolean; subskills?: Subskill[]; error?: string }[]> {
    const standards = standardIds.map(id => {
      const standard = this.standards.find(s => s.id === id);
      if (!standard) throw new Error(`Standard ${id} not found`);
      return standard;
    });

    try {
      const results = await this.subskillManager.generateSubskillsBatch(standards, options);

      return results.map((result, index) => {
        const returnObj: { standardId: string; success: boolean; subskills?: Subskill[]; error?: string } = {
          standardId: standardIds[index],
          success: result.success
        };
        if (result.subskills) returnObj.subskills = result.subskills;
        if (result.error) returnObj.error = result.error;
        return returnObj;
      });
    } catch (error) {
      return standardIds.map(id => ({
        standardId: id,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }));
    }
  }

  /**
   * Get subskills for a standard
   */
  getSubskillsForStandard(standardId: string): Subskill[] {
    return this.subskillManager.getSubskillsByStandard(standardId);
  }

  /**
   * Get all subskills
   */
  getAllSubskills(): Subskill[] {
    return this.subskillManager.getSubskills();
  }

  /**
   * Auto-assign subskills to existing items
   */
  autoAssignSubskillsToItems(
    itemIds?: string[],
    minMatchScore: number = 0.3
  ): { itemId: string; subskillIds: string[]; matchScores: number[] }[] {
    const itemsToProcess = itemIds
      ? this.items.filter(item => itemIds.includes(item.id))
      : this.items;

    return this.subskillManager.autoAssignSubskillsToItems(itemsToProcess, minMatchScore);
  }

  /**
   * Get subskill analysis
   */
  getSubskillAnalysis() {
    return this.subskillManager.getSubskillAnalysis();
  }

  /**
   * Get coverage gaps
   */
  getCoverageGaps() {
    return this.subskillManager.getCoverageGaps();
  }

  /**
   * Get subskill hierarchy
   */
  getSubskillHierarchy() {
    return this.subskillManager.getSubskillHierarchy();
  }

  /**
   * Update subskill
   */
  updateSubskill(subskillId: string, updates: Partial<Subskill>): boolean {
    return this.subskillManager.updateSubskill(subskillId, updates);
  }

  /**
   * Delete subskill
   */
  deleteSubskill(subskillId: string): boolean {
    return this.subskillManager.deleteSubskill(subskillId);
  }

  /**
   * Search subskills
   */
  searchSubskills(query: string): Subskill[] {
    return this.subskillManager.searchSubskills(query);
  }

  /**
   * Get items by subskill
   */
  getItemsBySubskill(subskillId: string): MathItem[] {
    return this.items.filter(item => item.subskillIds.includes(subskillId));
  }

  /**
   * Add manual subskill
   */
  addSubskill(subskill: Subskill): void {
    this.subskillManager.addSubskill(subskill);

    // Update standard with new subskill ID
    const standard = this.standards.find(s => s.id === subskill.standardId);
    if (standard && !standard.subskillIds.includes(subskill.id)) {
      standard.subskillIds.push(subskill.id);
    }
  }

  /**
   * Validate subskill data
   */
  validateSubskillData() {
    return this.subskillManager.validateSubskillData();
  }

  // ===== ENHANCED FILTERING WITH SUBSKILLS =====

  /**
   * Get items with enhanced filtering including subskills
   */
  getFilteredItemsWithSubskills(filter: FilterOptions & {
    subskillIds?: string[];
    subskillStatus?: 'draft' | 'reviewed' | 'approved';
  }): MathItem[] {
    let filteredItems = [...this.items];

    // Apply existing filters
    if (filter.gradeLevels && filter.gradeLevels.length > 0) {
      const standardIds = this.standards
        .filter(s => filter.gradeLevels!.includes(s.gradeLevel))
        .map(s => s.id);
      filteredItems = filteredItems.filter(item => standardIds.includes(item.standardId));
    }

    if (filter.domains && filter.domains.length > 0) {
      const standardIds = this.standards
        .filter(s => filter.domains!.includes(s.domain))
        .map(s => s.id);
      filteredItems = filteredItems.filter(item => standardIds.includes(item.standardId));
    }

    if (filter.difficulties && filter.difficulties.length > 0) {
      filteredItems = filteredItems.filter(item => filter.difficulties!.includes(item.difficulty));
    }

    if (filter.itemTypes && filter.itemTypes.length > 0) {
      filteredItems = filteredItems.filter(item => filter.itemTypes!.includes(item.type));
    }

    if (filter.keywords && filter.keywords.length > 0) {
      filteredItems = filteredItems.filter(item =>
        filter.keywords!.some(keyword =>
          item.title.toLowerCase().includes(keyword.toLowerCase()) ||
          item.question.toLowerCase().includes(keyword.toLowerCase()) ||
          item.metadata.keywords.some(k => k.toLowerCase().includes(keyword.toLowerCase()))
        )
      );
    }

    if (filter.calculatorAllowed !== undefined) {
      filteredItems = filteredItems.filter(item => item.metadata.calculatorAllowed === filter.calculatorAllowed);
    }

    if (filter.maxTime !== undefined) {
      filteredItems = filteredItems.filter(item => item.metadata.estimatedTimeMinutes <= filter.maxTime!);
    }

    // Apply subskill filters
    if (filter.subskillIds && filter.subskillIds.length > 0) {
      filteredItems = filteredItems.filter(item =>
        filter.subskillIds!.some(subskillId => item.subskillIds.includes(subskillId))
      );
    }

    if (filter.subskillStatus) {
      const subskillIds = this.subskillManager.getSubskillsByStatus(filter.subskillStatus).map(s => s.id);
      filteredItems = filteredItems.filter(item =>
        item.subskillIds.some(id => subskillIds.includes(id))
      );
    }

    return filteredItems;
  }

  // ===== ENHANCED STATISTICS WITH SUBSKILLS =====

  /**
   * Get enhanced item bank statistics including subskill data
   */
  getEnhancedStatistics(): ItemBankStatistics & {
    subskillStats: {
      totalSubskills: number;
      subskillsByDomain: Record<string, number>;
      subskillsByStatus: Record<string, number>;
      subskillsByDifficulty: Record<string, number>;
      averageSubskillsPerStandard: number;
      itemsWithSubskills: number;
      itemsWithoutSubskills: number;
    };
  } {
    const baseStats = this.getStatistics();
    const subskillAnalysis = this.subskillManager.getSubskillAnalysis();

    const subskillStats = {
      totalSubskills: subskillAnalysis.totalSubskills,
      subskillsByDomain: subskillAnalysis.subskillsByDomain,
      subskillsByStatus: {
        draft: this.subskillManager.getSubskillsByStatus('draft').length,
        reviewed: this.subskillManager.getSubskillsByStatus('reviewed').length,
        approved: this.subskillManager.getSubskillsByStatus('approved').length
      },
      subskillsByDifficulty: {
        beginning: this.subskillManager.getSubskillsByDifficulty('beginning').length,
        developing: this.subskillManager.getSubskillsByDifficulty('developing').length,
        proficient: this.subskillManager.getSubskillsByDifficulty('proficient').length,
        advanced: this.subskillManager.getSubskillsByDifficulty('advanced').length
      },
      averageSubskillsPerStandard: subskillAnalysis.averageSubskillsPerStandard,
      itemsWithSubskills: this.items.filter(item => item.subskillIds.length > 0).length,
      itemsWithoutSubskills: this.items.filter(item => item.subskillIds.length === 0).length
    };

    return { ...baseStats, subskillStats };
  }
}