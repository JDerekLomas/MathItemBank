import { MathStandard, MathItem, Subskill } from '@/types';

export interface GradeLevelData {
  grade: string;
  domains: DomainData[];
  totalStandards: number;
  totalItems: number;
  totalSubskills: number;
}

export interface DomainData {
  domain: string;
  clusters: ClusterData[];
  totalStandards: number;
  totalItems: number;
  totalSubskills: number;
}

export interface ClusterData {
  cluster: string;
  standards: StandardData[];
  totalStandards: number;
  totalItems: number;
  totalSubskills: number;
}

export interface StandardData {
  standard: MathStandard;
  subskills: SubskillData[];
  items: ItemData[];
  totalItems: number;
  totalSubskills: number;
  coveragePercentage: number;
}

export interface SubskillData {
  subskill: Subskill;
  items: ItemData[];
  itemCount: number;
  difficultyDistribution: {
    beginning: number;
    developing: number;
    proficient: number;
    advanced: number;
  };
}

export interface ItemData {
  item: MathItem;
  subskillIds: string[];
  standardsAlignment: string[];
}

export interface ItemBankHierarchy {
  grades: GradeLevelData[];
  metadata: {
    totalGrades: number;
    totalStandards: number;
    totalItems: number;
    totalSubskills: number;
    gradeLevels: string[];
    domains: string[];
    lastUpdated: string;
  };
}

/**
 * Organizes item bank data by grade level, domain, cluster, and standard
 */
export class ItemBankOrganizer {
  /**
   * Create hierarchical organization from flat data
   */
  static organizeByGrade(
    standards: MathStandard[],
    items: MathItem[],
    subskills: Subskill[]
  ): ItemBankHierarchy {
    // Create lookup maps
    const standardMap = new Map(standards.map(s => [s.id, s]));
    const subskillMap = new Map(subskills.map(s => [s.id, s]));

    // Group items by subskills
    const itemsBySubskill = new Map<string, MathItem[]>();
    items.forEach(item => {
      item.subskillIds.forEach(subskillId => {
        if (!itemsBySubskill.has(subskillId)) {
          itemsBySubskill.set(subskillId, []);
        }
        itemsBySubskill.get(subskillId)!.push(item);
      });
    });

    // Group standards by grade level
    const gradesMap = new Map<string, MathStandard[]>();
    standards.forEach(standard => {
      const grade = standard.gradeLevel || 'Unknown';
      if (!gradesMap.has(grade)) {
        gradesMap.set(grade, []);
      }
      gradesMap.get(grade)!.push(standard);
    });

    // Build grade level hierarchy
    const grades: GradeLevelData[] = Array.from(gradesMap.entries())
      .sort((a, b) => this.sortGradeLevel(a[0], b[0]))
      .map(([grade, gradeStandards]) => {
        const gradeData = this.buildGradeHierarchy(
          grade,
          gradeStandards,
          items,
          subskills,
          itemsBySubskill,
          standardMap,
          subskillMap
        );
        return gradeData;
      });

    // Calculate overall metadata
    const gradeLevels = grades.map(g => g.grade);
    const domains = new Set<string>();
    grades.forEach(grade => {
      grade.domains.forEach(domain => {
        domains.add(domain.domain);
      });
    });

    return {
      grades,
      metadata: {
        totalGrades: grades.length,
        totalStandards: standards.length,
        totalItems: items.length,
        totalSubskills: subskills.length,
        gradeLevels,
        domains: Array.from(domains).sort(),
        lastUpdated: new Date().toISOString()
      }
    };
  }

  /**
   * Build hierarchy for a specific grade level
   */
  private static buildGradeHierarchy(
    grade: string,
    gradeStandards: MathStandard[],
    items: MathItem[],
    subskills: Subskill[],
    itemsBySubskill: Map<string, MathItem[]>,
    standardMap: Map<string, MathStandard>,
    subskillMap: Map<string, Subskill>
  ): GradeLevelData {
    // Group standards by domain
    const domainsMap = new Map<string, MathStandard[]>();
    gradeStandards.forEach(standard => {
      const domain = standard.domain || 'Unknown';
      if (!domainsMap.has(domain)) {
        domainsMap.set(domain, []);
      }
      domainsMap.get(domain)!.push(standard);
    });

    // Build domain hierarchy
    const domains: DomainData[] = Array.from(domainsMap.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([domain, domainStandards]) => {
        const domainData = this.buildDomainHierarchy(
          domain,
          domainStandards,
          items,
          subskills,
          itemsBySubskill,
          standardMap,
          subskillMap
        );
        return domainData;
      });

    // Calculate grade totals
    const totalStandards = gradeStandards.length;
    const totalItems = domains.reduce((sum, domain) => sum + domain.totalItems, 0);
    const totalSubskills = domains.reduce((sum, domain) => sum + domain.totalSubskills, 0);

    return {
      grade,
      domains,
      totalStandards,
      totalItems,
      totalSubskills
    };
  }

  /**
   * Build hierarchy for a specific domain
   */
  private static buildDomainHierarchy(
    domain: string,
    domainStandards: MathStandard[],
    items: MathItem[],
    subskills: Subskill[],
    itemsBySubskill: Map<string, MathItem[]>,
    standardMap: Map<string, MathStandard>,
    subskillMap: Map<string, Subskill>
  ): DomainData {
    // Group standards by cluster
    const clustersMap = new Map<string, MathStandard[]>();
    domainStandards.forEach(standard => {
      const cluster = standard.cluster || 'Unknown';
      if (!clustersMap.has(cluster)) {
        clustersMap.set(cluster, []);
      }
      clustersMap.get(cluster)!.push(standard);
    });

    // Build cluster hierarchy
    const clusters: ClusterData[] = Array.from(clustersMap.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([cluster, clusterStandards]) => {
        const clusterData = this.buildClusterHierarchy(
          cluster,
          clusterStandards,
          items,
          subskills,
          itemsBySubskill,
          standardMap,
          subskillMap
        );
        return clusterData;
      });

    // Calculate domain totals
    const totalStandards = domainStandards.length;
    const totalItems = clusters.reduce((sum, cluster) => sum + cluster.totalItems, 0);
    const totalSubskills = clusters.reduce((sum, cluster) => sum + cluster.totalSubskills, 0);

    return {
      domain,
      clusters,
      totalStandards,
      totalItems,
      totalSubskills
    };
  }

  /**
   * Build hierarchy for a specific cluster
   */
  private static buildClusterHierarchy(
    cluster: string,
    clusterStandards: MathStandard[],
    items: MathItem[],
    subskills: Subskill[],
    itemsBySubskill: Map<string, MathItem[]>,
    standardMap: Map<string, MathStandard>,
    subskillMap: Map<string, Subskill>
  ): ClusterData {
    // Build standard data for each standard in cluster
    const standards: StandardData[] = clusterStandards.map(standard => {
      return this.buildStandardData(
        standard,
        items,
        subskills,
        itemsBySubskill,
        standardMap,
        subskillMap
      );
    });

    // Calculate cluster totals
    const totalStandards = clusterStandards.length;
    const totalItems = standards.reduce((sum, standard) => sum + standard.totalItems, 0);
    const totalSubskills = standards.reduce((sum, standard) => sum + standard.totalSubskills, 0);

    return {
      cluster,
      standards,
      totalStandards,
      totalItems,
      totalSubskills
    };
  }

  /**
   * Build data for a specific standard
   */
  private static buildStandardData(
    standard: MathStandard,
    _items: MathItem[],
    _subskills: Subskill[],
    itemsBySubskill: Map<string, MathItem[]>,
    _standardMap: Map<string, MathStandard>,
    subskillMap: Map<string, Subskill>
  ): StandardData {
    // Get subskills for this standard
    const standardSubskills = standard.subskillIds
      .map(id => subskillMap.get(id))
      .filter(Boolean) as Subskill[];

    // Build subskill data
    const subskillsData: SubskillData[] = standardSubskills.map(subskill => {
      const subskillItems = itemsBySubskill.get(subskill.id) || [];

      // Calculate difficulty distribution
      const difficultyDistribution = {
        beginning: subskillItems.filter(item => item.difficulty === 'beginning').length,
        developing: subskillItems.filter(item => item.difficulty === 'developing').length,
        proficient: subskillItems.filter(item => item.difficulty === 'proficient').length,
        advanced: subskillItems.filter(item => item.difficulty === 'advanced').length
      };

      return {
        subskill,
        items: subskillItems.map(item => ({
          item,
          subskillIds: item.subskillIds,
          standardsAlignment: [standard.id]
        })),
        itemCount: subskillItems.length,
        difficultyDistribution
      };
    });

    // Get all items for this standard
    const standardItems = new Set<MathItem>();
    standardSubskills.forEach(subskill => {
      const items = itemsBySubskill.get(subskill.id) || [];
      items.forEach(item => standardItems.add(item));
    });

    const itemsData = Array.from(standardItems).map(item => ({
      item,
      subskillIds: item.subskillIds,
      standardsAlignment: [standard.id]
    }));

    // Calculate coverage percentage (subskills with items / total subskills)
    const subskillsWithItems = subskillsData.filter(sd => sd.itemCount > 0).length;
    const coveragePercentage = standardSubskills.length > 0
      ? Math.round((subskillsWithItems / standardSubskills.length) * 100)
      : 0;

    return {
      standard,
      subskills: subskillsData,
      items: itemsData,
      totalItems: standardItems.size,
      totalSubskills: standardSubskills.length,
      coveragePercentage
    };
  }

  /**
   * Sort grade levels in natural order (K, 1, 2, ..., 12)
   */
  private static sortGradeLevel(a: string, b: string): number {
    const gradeOrder: { [key: string]: number } = {
      'K': 0, 'KG': 0, 'Kindergarten': 0,
      '1': 1, '2': 2, '3': 3, '4': 4, '5': 5,
      '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
      '11': 11, '12': 12, '13': 13
    };

    const normalizedA = a.replace(/[^\dK]/g, '').toUpperCase();
    const normalizedB = b.replace(/[^\dK]/g, '').toUpperCase();

    const orderA = gradeOrder[normalizedA] ?? 999;
    const orderB = gradeOrder[normalizedB] ?? 999;

    return orderA - orderB;
  }

  /**
   * Get coverage statistics for the entire item bank
   */
  static getCoverageStatistics(hierarchy: ItemBankHierarchy): {
    overallCoverage: number;
    gradeLevelCoverage: Array<{ grade: string; coverage: number }>;
    domainCoverage: Array<{ domain: string; coverage: number }>;
    difficultyDistribution: {
      beginning: number;
      developing: number;
      proficient: number;
      advanced: number;
    };
  } {
    let totalSubskills = 0;
    let subskillsWithItems = 0;

    const difficultyDistribution = {
      beginning: 0,
      developing: 0,
      proficient: 0,
      advanced: 0
    };

    // Grade level coverage
    const gradeLevelCoverage = hierarchy.grades.map(grade => {
      let gradeSubskills = 0;
      let gradeSubskillsWithItems = 0;

      grade.domains.forEach(domain => {
        domain.clusters.forEach(cluster => {
          cluster.standards.forEach(standard => {
            gradeSubskills += standard.totalSubskills;
            gradeSubskillsWithItems += standard.subskills.filter(s => s.itemCount > 0).length;

            standard.subskills.forEach(subskill => {
              difficultyDistribution.beginning += subskill.difficultyDistribution.beginning;
              difficultyDistribution.developing += subskill.difficultyDistribution.developing;
              difficultyDistribution.proficient += subskill.difficultyDistribution.proficient;
              difficultyDistribution.advanced += subskill.difficultyDistribution.advanced;
            });
          });
        });
      });

      totalSubskills += gradeSubskills;
      subskillsWithItems += gradeSubskillsWithItems;

      return {
        grade: grade.grade,
        coverage: gradeSubskills > 0 ? Math.round((gradeSubskillsWithItems / gradeSubskills) * 100) : 0
      };
    });

    // Domain coverage
    const domainMap = new Map<string, { total: number; withItems: number }>();
    hierarchy.grades.forEach(grade => {
      grade.domains.forEach(domain => {
        if (!domainMap.has(domain.domain)) {
          domainMap.set(domain.domain, { total: 0, withItems: 0 });
        }
        const stats = domainMap.get(domain.domain)!;
        stats.total += domain.totalSubskills;
        stats.withItems += domain.clusters.reduce((sum, cluster) =>
          sum + cluster.standards.reduce((clusterSum, standard) =>
            clusterSum + standard.subskills.filter(s => s.itemCount > 0).length, 0), 0);
      });
    });

    const domainCoverage = Array.from(domainMap.entries())
      .map(([domain, stats]) => ({
        domain,
        coverage: stats.total > 0 ? Math.round((stats.withItems / stats.total) * 100) : 0
      }))
      .sort((a, b) => a.domain.localeCompare(b.domain));

    const overallCoverage = totalSubskills > 0
      ? Math.round((subskillsWithItems / totalSubskills) * 100)
      : 0;

    return {
      overallCoverage,
      gradeLevelCoverage,
      domainCoverage,
      difficultyDistribution
    };
  }
}