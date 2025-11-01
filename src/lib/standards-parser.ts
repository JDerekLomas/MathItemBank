import { MathStandard } from '@/types';

/**
 * Parse the standard mapping CSV file and extract math standards
 */
export class StandardsParser {
  private static readonly GRADE_LEVEL_MAPPING: Record<string, 'K' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'> = {
    'enVAGA_CCA1': '9',
    'enVAGA_CCA2': '11',
    'enVAGA_CCGM': '12'
  };

  private static readonly DOMAIN_MAPPING: Record<string, string> = {
    'Interpreting Functions': 'Functions',
    'Reasoning with Equations and Inequalities': 'Algebra',
    'Congruence': 'Geometry',
    'Interpreting Categorical and Quantitative Data': 'Statistics & Probability',
    'Building Functions': 'Functions',
    'Vector and Matrix Quantities': 'Number & Quantity',
    'Trigonometric Functions': 'Functions',
    'The Complex Number System': 'Number & Quantity',
    'Similarity, Right Triangles, and Trigonometry': 'Geometry',
    'Using Probability to Make Decisions': 'Statistics & Probability',
    'Seeing Structure in Expressions': 'Algebra',
    'Conditional Probability and the Rules of Probability': 'Statistics & Probability',
    'Arithmetic with Polynomials and Rational Expressions': 'Algebra',
    'Linear, Quadratic, and Exponential Models': 'Functions',
    'Analyze functions using different representations': 'Functions',
    'Making Inferences and Justifying Conclusions': 'Statistics & Probability',
    'Expressing Geometric Properties with Equations': 'Geometry',
    'Construct and compare linear, quadratic, and exponential models and solve problems': 'Functions',
    'Build new functions from existing functions': 'Functions',
    'Write expressions in equivalent forms to solve problems': 'Algebra',
    'Solve equations and inequalities in one variable': 'Algebra',
    'Understand the concept of a function and use function notation': 'Functions',
    'Use probability to evaluate outcomes of decisions': 'Statistics & Probability',
    'Perform arithmetic operations with complex numbers': 'Number & Quantity',
    'Use properties of rational and irrational numbers': 'Number & Quantity',
    'Perform arithmetic operations on polynomials': 'Algebra',
    'Represent data on two quantitative variables on a scatter plot, and describe how the variables are related': 'Statistics & Probability',
    'Create equations that describe numbers or relationships': 'Algebra',
    'Construct viable arguments and critique the reasoning of others': 'Mathematical Practice',
    'Solve real-world and mathematical problems involving area, surface area, and volume': 'Geometry',
    'Summarize, represent, and interpret data on a single count or measurement variable': 'Statistics & Probability',
    'Represent and model with vector quantities': 'Number & Quantity'
  };

  /**
   * Parse CSV content and extract standards
   */
  static parseCSV(csvContent: string): MathStandard[] {
    const lines = csvContent.split('\n');
    const standards: MathStandard[] = [];

    // Skip header if present
    const startIndex = lines[0].includes('root_std_name') ? 1 : 0;

    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const parts = this.splitCSVLine(line);
      if (parts.length < 3) continue;

      const [code, parentCategory, description] = parts;

      if (!code || !description) continue;

      const standard = this.createStandard(code, parentCategory, description, i - startIndex + 1);
      if (standard) {
        standards.push(standard);
      }
    }

    return standards;
  }

  /**
   * Create a MathStandard object from CSV data
   */
  private static createStandard(
    code: string,
    parentCategory: string,
    description: string,
    index: number
  ): MathStandard | null {
    // Clean up the data
    const cleanCode = code.trim();
    const cleanParentCategory = parentCategory.trim();
    const cleanDescription = description.replace(/"/g, '').trim();

    // Skip malformed entries
    if (!cleanCode || !cleanDescription) return null;

    const gradeLevel = this.GRADE_LEVEL_MAPPING[cleanCode] || '9';
    const domain = this.DOMAIN_MAPPING[cleanParentCategory] || 'General';

    return {
      id: `std_${index}`,
      code: cleanCode,
      parentCategory: cleanParentCategory,
      description: cleanDescription,
      gradeLevel,
      domain,
      cluster: this.extractCluster(cleanParentCategory),
      standardId: cleanCode,
      subskillIds: [],
      complexity: this.calculateComplexity(cleanDescription),
      relatedStandards: []
    };
  }

  /**
   * Extract cluster from parent category
   */
  private static extractCluster(parentCategory: string): string {
    // Remove common prefixes and extract the main topic
    return parentCategory
      .replace(/^(Understand|Use|Apply|Analyze|Create|Represent|Model|Construct|Solve|Build|Summarize|Interpret|Compare|Evaluate)\s+/i, '')
      .replace(/\s+(and|or|to|of|for|in|with|by|on|from|as)\s+/gi, ' ')
      .split(',')[0]
      .trim();
  }

  /**
   * Calculate complexity based on standard description
   */
  private static calculateComplexity(description: string): number {
    // Simple heuristic based on keywords and length
    const complexityKeywords = [
      'prove', 'derive', 'theorem', 'complex', 'advanced', 'abstract',
      'multiple', 'compound', 'transform', 'analyze', 'evaluate'
    ];

    const keywordCount = complexityKeywords.reduce((count, keyword) => {
      return count + (description.toLowerCase().split(keyword).length - 1);
    }, 0);

    // Base complexity on length and keyword count
    const lengthComplexity = Math.min(description.length / 200, 5);
    const keywordComplexity = keywordCount * 0.5;

    return Math.round((lengthComplexity + keywordComplexity) * 10) / 10;
  }

  /**
   * Split CSV line handling quoted fields
   */
  private static splitCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }

    result.push(current.trim());
    return result;
  }

  /**
   * Group standards by grade level
   */
  static groupByGrade(standards: MathStandard[]): Record<string, MathStandard[]> {
    return standards.reduce((groups, standard) => {
      const grade = standard.gradeLevel;
      if (!groups[grade]) groups[grade] = [];
      groups[grade].push(standard);
      return groups;
    }, {} as Record<string, MathStandard[]>);
  }

  /**
   * Group standards by domain
   */
  static groupByDomain(standards: MathStandard[]): Record<string, MathStandard[]> {
    return standards.reduce((groups, standard) => {
      const domain = standard.domain;
      if (!groups[domain]) groups[domain] = [];
      groups[domain].push(standard);
      return groups;
    }, {} as Record<string, MathStandard[]>);
  }

  /**
   * Search standards by keywords
   */
  static searchStandards(standards: MathStandard[], query: string): MathStandard[] {
    const lowerQuery = query.toLowerCase();
    return standards.filter(standard =>
      standard.description.toLowerCase().includes(lowerQuery) ||
      standard.parentCategory.toLowerCase().includes(lowerQuery) ||
      standard.domain.toLowerCase().includes(lowerQuery) ||
      standard.cluster.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Get standards by grade level and domain
   */
  static getStandardsByGradeAndDomain(
    standards: MathStandard[],
    gradeLevel: string,
    domain: string
  ): MathStandard[] {
    return standards.filter(standard =>
      standard.gradeLevel === gradeLevel && standard.domain === domain
    );
  }
}