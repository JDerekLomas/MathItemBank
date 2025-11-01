export interface MathStandard {
  id: string;
  code: string;
  parentCategory: string;
  description: string;
  gradeLevel: 'K' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
  domain: string;
  cluster: string;
  standardId: string;
  subskillIds: string[];
  complexity: number;
  relatedStandards: string[];
}

export interface Subskill {
  id: string;
  standardId: string;
  title: string;
  description: string;
  sequence: number;
  exemplarIds: string[];
  keywords: string[];
  difficulty: Difficulty;
  estimatedTimeMinutes: number;
  prerequisites: string[];
  relatedSubskills: string[];
  generatedBy: 'ai' | 'human' | 'template';
  qualityScore?: number;
  status: 'draft' | 'reviewed' | 'approved';
}

export interface MathItem {
  id: string;
  standardId: string;
  subskillIds: string[];
  type: ItemType;
  difficulty: Difficulty;
  title: string;
  question: string;
  correctAnswer: string | number;
  distractors?: (string | number)[];
  explanation: string;
  hints: string[];
  metadata: ItemMetadata;
  variationParentId?: string;
  variationIds?: string[];
  exemplarFor?: string[];
}

export type ItemType =
  | 'multiple_choice'
  | 'true_false'
  | 'short_answer'
  | 'extended_response'
  | 'performance_task'
  | 'drag_and_drop'
  | 'graphing'
  | 'equation_editor';

export type Difficulty = 'beginning' | 'developing' | 'proficient' | 'advanced';

export interface ItemMetadata {
  estimatedTimeMinutes: number;
  calculatorAllowed: boolean;
  keywords: string[];
  realWorldContext?: boolean;
  context: 'abstract' | 'real-world' | 'academic' | 'professional';
  format: 'numeric' | 'algebraic' | 'geometric' | 'statistical' | 'verbal';
  depthOfKnowledge: 1 | 2 | 3 | 4;
  bloomsTaxonomy: 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create';
  commonMisconceptions: string[];
  relatedStandards: string[];
  generatedBy: 'template' | 'ai' | 'human' | 'variation';
  qualityScore?: number;
  reviewStatus: 'pending' | 'approved' | 'needs_revision' | 'rejected';
  contentSource?: {
    type: 'oer' | 'created' | 'adapted';
    source?: string;
    license?: string;
    attribution?: string;
  };
  author: string;
  created: Date;
  lastModified: Date;
}

export interface ItemBank {
  standards: MathStandard[];
  subskills: Subskill[];
  items: MathItem[];
  statistics: ItemBankStatistics;
}

export interface ItemBankStatistics {
  totalItems: number;
  itemsByGrade: Record<string, number>;
  itemsByDifficulty: Record<Difficulty, number>;
  itemsByType: Record<ItemType, number>;
  itemsByDomain: Record<string, number>;
  averageDifficulty: number;
}

export interface ItemGenerationPrompt {
  standard: MathStandard;
  itemType: ItemType;
  difficulty: Difficulty;
  context?: string;
  excludePatterns?: string[];
}

export interface ItemGenerationResult {
  success: boolean;
  item?: MathItem;
  error?: string;
  warnings?: string[];
}

export interface FilterOptions {
  gradeLevels?: string[];
  domains?: string[];
  clusters?: string[];
  difficulties?: Difficulty[];
  itemTypes?: ItemType[];
  keywords?: string[];
  calculatorAllowed?: boolean;
  maxTime?: number;
}

export interface ExportOptions {
  format: 'json' | 'csv' | 'xml' | 'qti' | 'moodle';
  includeAnswers: boolean;
  includeMetadata: boolean;
  filter?: FilterOptions;
}

export interface SubskillGenerationRequest {
  standardId: string;
  standardDescription: string;
  gradeLevel: string;
  domain: string;
  cluster: string;
  targetSubskillCount: number;
  customInstructions?: string;
}

export interface SubskillGenerationResult {
  success: boolean;
  subskills?: Subskill[];
  error?: string;
  warnings?: string[];
  qualityScore?: number;
}

export interface SubskillAnalysis {
  totalSubskills: number;
  subskillsByStandard: Record<string, number>;
  subskillsByDomain: Record<string, number>;
  averageSubskillsPerStandard: number;
  coverageByDifficulty: Record<Difficulty, number>;
  subskillsWithoutItems: string[];
  itemsBySubskill: Record<string, number>;
}

export interface VariationGenerationRequest {
  parentItemId: string;
  targetVariations: number;
  preserveDifficulty: boolean;
  changeContext: boolean;
  preserveSubskill: boolean;
  customInstructions?: string;
}

export interface ContentSource {
  id: string;
  name: string;
  type: 'textbook' | 'website' | 'oer' | 'assessment' | 'other';
  url?: string;
  license?: string;
  lastImported: Date;
  status: 'active' | 'inactive' | 'error';
}

export interface QualityMetrics {
  itemId: string;
  clarityScore: number;
  accuracyScore: number;
  biasScore: number;
  difficultyConsistency: number;
  overallScore: number;
  lastAssessed: Date;
  assessmentMethod: 'ai' | 'human' | 'automated';
}