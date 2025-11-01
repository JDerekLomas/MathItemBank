'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, BookOpen, Target, BarChart3, Users, Search, Filter } from 'lucide-react';
import { ItemBankHierarchy, ItemBankOrganizer } from '@/lib/item-bank-organizer';
import { MathStandard, MathItem, Subskill } from '@/types';

interface GradeLevelData {
  grade: string;
  domains: DomainData[];
  totalStandards: number;
  totalItems: number;
  totalSubskills: number;
}

interface DomainData {
  domain: string;
  clusters: ClusterData[];
  totalStandards: number;
  totalItems: number;
  totalSubskills: number;
}

interface ClusterData {
  cluster: string;
  standards: StandardData[];
  totalStandards: number;
  totalItems: number;
  totalSubskills: number;
}

interface StandardData {
  standard: MathStandard;
  subskills: SubskillData[];
  items: ItemData[];
  totalItems: number;
  totalSubskills: number;
  coveragePercentage: number;
}

interface SubskillData {
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

interface ItemData {
  item: MathItem;
  subskillIds: string[];
  standardsAlignment: string[];
}

export default function MathItemBankViewer() {
  const [hierarchy, setHierarchy] = useState<ItemBankHierarchy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedGrades, setExpandedGrades] = useState<Set<string>>(new Set());
  const [expandedDomains, setExpandedDomains] = useState<Set<string>>(new Set());
  const [expandedClusters, setExpandedClusters] = useState<Set<string>>(new Set());
  const [expandedStandards, setExpandedStandards] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/data');
      if (!response.ok) {
        throw new Error('Failed to load data');
      }

      const data = await response.json();
      const organized = ItemBankOrganizer.organizeByGrade(
        data.standards,
        data.items,
        data.subskills
      );

      setHierarchy(organized);

      // Auto-expand first grade
      if (organized.grades.length > 0) {
        setExpandedGrades(new Set([organized.grades[0].grade]));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const toggleGrade = (grade: string) => {
    const newExpanded = new Set(expandedGrades);
    if (newExpanded.has(grade)) {
      newExpanded.delete(grade);
    } else {
      newExpanded.add(grade);
    }
    setExpandedGrades(newExpanded);
  };

  const toggleDomain = (domain: string) => {
    const newExpanded = new Set(expandedDomains);
    if (newExpanded.has(domain)) {
      newExpanded.delete(domain);
    } else {
      newExpanded.add(domain);
    }
    setExpandedDomains(newExpanded);
  };

  const toggleCluster = (cluster: string) => {
    const newExpanded = new Set(expandedClusters);
    if (newExpanded.has(cluster)) {
      newExpanded.delete(cluster);
    } else {
      newExpanded.add(cluster);
    }
    setExpandedClusters(newExpanded);
  };

  const toggleStandard = (standardId: string) => {
    const newExpanded = new Set(expandedStandards);
    if (newExpanded.has(standardId)) {
      newExpanded.delete(standardId);
    } else {
      newExpanded.add(standardId);
    }
    setExpandedStandards(newExpanded);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginning': return 'difficulty-beginning';
      case 'developing': return 'difficulty-developing';
      case 'proficient': return 'difficulty-proficient';
      case 'advanced': return 'difficulty-advanced';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCoverageColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-100 text-green-800';
    if (percentage >= 60) return 'bg-yellow-100 text-yellow-800';
    if (percentage >= 40) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading Math Item Bank...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <BarChart3 className="h-12 w-12 mx-auto" />
          </div>
          <p className="text-lg text-gray-600 mb-4">Error loading data: {error}</p>
          <button
            onClick={loadData}
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!hierarchy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">No data available</p>
        </div>
      </div>
    );
  }

  const filteredGrades = hierarchy.grades.filter(grade => {
    const matchesGrade = selectedGrade === 'all' || grade.grade === selectedGrade;
    const matchesDomain = selectedDomain === 'all' ||
      grade.domains.some(domain => domain.domain === selectedDomain);
    const matchesSearch = searchTerm === '' ||
      grade.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.domains.some(domain =>
        domain.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
        domain.clusters.some(cluster =>
          cluster.cluster.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cluster.standards.some(standard =>
            standard.standard.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      );

    return matchesGrade && matchesDomain && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Math Item Bank</h1>
                <p className="text-sm text-gray-500">K-12 Math Assessment Items</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{hierarchy.metadata.totalItems}</span> items •{' '}
                <span className="font-medium">{hierarchy.metadata.totalStandards}</span> standards •{' '}
                <span className="font-medium">{hierarchy.metadata.totalSubskills}</span> subskills
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2 flex-1 min-w-64">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search standards, domains, clusters..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
            >
              <option value="all">All Grades</option>
              {hierarchy.metadata.gradeLevels.map(grade => (
                <option key={grade} value={grade}>Grade {grade}</option>
              ))}
            </select>

            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
            >
              <option value="all">All Domains</option>
              {hierarchy.metadata.domains.map(domain => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredGrades.length === 0 ? (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg text-gray-600">No results found for your filters</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredGrades.map((grade) => (
              <div key={grade.grade} className="bg-white rounded-lg shadow-sm border">
                {/* Grade Header */}
                <div
                  className="px-6 py-4 border-b cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleGrade(grade.grade)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {expandedGrades.has(grade.grade) ? (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-500" />
                      )}
                      <h2 className="text-xl font-semibold text-gray-900">Grade {grade.grade}</h2>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{grade.totalStandards} standards</span>
                      <span>{grade.totalItems} items</span>
                      <span>{grade.totalSubskills} subskills</span>
                    </div>
                  </div>
                </div>

                {/* Grade Content */}
                {expandedGrades.has(grade.grade) && (
                  <div className="p-6 space-y-4">
                    {grade.domains.map((domain) => (
                      <div key={domain.domain} className="border rounded-lg">
                        {/* Domain Header */}
                        <div
                          className="px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => toggleDomain(`${grade.grade}-${domain.domain}`)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {expandedDomains.has(`${grade.grade}-${domain.domain}`) ? (
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-gray-500" />
                              )}
                              <h3 className="font-medium text-gray-900">{domain.domain}</h3>
                            </div>
                            <div className="flex items-center space-x-3 text-sm text-gray-600">
                              <span>{domain.totalStandards} standards</span>
                              <span>{domain.totalItems} items</span>
                            </div>
                          </div>
                        </div>

                        {/* Domain Content */}
                        {expandedDomains.has(`${grade.grade}-${domain.domain}`) && (
                          <div className="p-4 space-y-3">
                            {domain.clusters.map((cluster) => (
                              <div key={cluster.cluster} className="border rounded-md">
                                {/* Cluster Header */}
                                <div
                                  className="px-3 py-2 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                                  onClick={() => toggleCluster(`${grade.grade}-${domain.domain}-${cluster.cluster}`)}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                      {expandedClusters.has(`${grade.grade}-${domain.domain}-${cluster.cluster}`) ? (
                                        <ChevronDown className="h-4 w-4 text-gray-500" />
                                      ) : (
                                        <ChevronRight className="h-4 w-4 text-gray-500" />
                                      )}
                                      <h4 className="text-sm font-medium text-gray-900">{cluster.cluster}</h4>
                                    </div>
                                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                                      <span>{cluster.totalStandards} standards</span>
                                      <span>{cluster.totalItems} items</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Cluster Content */}
                                {expandedClusters.has(`${grade.grade}-${domain.domain}-${cluster.cluster}`) && (
                                  <div className="p-3 space-y-3">
                                    {cluster.standards.map((standard) => (
                                      <div key={standard.standard.id} className="border rounded-md p-3">
                                        {/* Standard Header */}
                                        <div
                                          className="cursor-pointer hover:bg-gray-50 transition-colors"
                                          onClick={() => toggleStandard(standard.standard.id)}
                                        >
                                          <div className="flex items-start justify-between">
                                            <div className="flex items-start space-x-2 flex-1">
                                              {expandedStandards.has(standard.standard.id) ? (
                                                <ChevronDown className="h-4 w-4 text-gray-500 mt-0.5" />
                                              ) : (
                                                <ChevronRight className="h-4 w-4 text-gray-500 mt-0.5" />
                                              )}
                                              <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-1">
                                                  <h5 className="font-medium text-gray-900">
                                                    {standard.standard.code}
                                                  </h5>
                                                  <span className={`badge badge-outline ${getCoverageColor(standard.coveragePercentage)}`}>
                                                    {standard.coveragePercentage}% coverage
                                                  </span>
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                  {standard.standard.description}
                                                </p>
                                              </div>
                                            </div>
                                            <div className="flex items-center space-x-2 text-xs text-gray-600 ml-4">
                                              <span>{standard.totalSubskills} subskills</span>
                                              <span>{standard.totalItems} items</span>
                                            </div>
                                          </div>
                                        </div>

                                        {/* Standard Content */}
                                        {expandedStandards.has(standard.standard.id) && (
                                          <div className="mt-3 space-y-3 pl-6">
                                            {/* Subskills */}
                                            <div>
                                              <h6 className="text-sm font-medium text-gray-900 mb-2">Subskills</h6>
                                              <div className="space-y-2">
                                                {standard.subskills.map((subskill) => (
                                                  <div key={subskill.subskill.id} className="bg-gray-50 rounded-md p-3">
                                                    <div className="flex items-center justify-between mb-2">
                                                      <div className="flex items-center space-x-2">
                                                        <Target className="h-4 w-4 text-blue-600" />
                                                        <span className="font-medium text-gray-900">
                                                          {subskill.subskill.title}
                                                        </span>
                                                        <span className={`badge badge-outline ${getDifficultyColor(subskill.subskill.difficulty)}`}>
                                                          {subskill.subskill.difficulty}
                                                        </span>
                                                      </div>
                                                      <span className="text-sm text-gray-600">
                                                        {subskill.itemCount} items
                                                      </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-2">
                                                      {subskill.subskill.description}
                                                    </p>
                                                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                                                      <span>Difficulty distribution:</span>
                                                      <span>Beginning: {subskill.difficultyDistribution.beginning}</span>
                                                      <span>Developing: {subskill.difficultyDistribution.developing}</span>
                                                      <span>Proficient: {subskill.difficultyDistribution.proficient}</span>
                                                      <span>Advanced: {subskill.difficultyDistribution.advanced}</span>
                                                    </div>
                                                  </div>
                                                ))}
                                              </div>
                                            </div>

                                            {/* Items */}
                                            {standard.items.length > 0 && (
                                              <div>
                                                <h6 className="text-sm font-medium text-gray-900 mb-2">Sample Items</h6>
                                                <div className="space-y-2">
                                                  {standard.items.slice(0, 3).map((itemData, index) => (
                                                    <div key={index} className="bg-blue-50 rounded-md p-3">
                                                      <div className="flex items-center justify-between mb-2">
                                                        <span className="font-medium text-gray-900">
                                                          {itemData.item.type === 'multiple_choice' ? 'Multiple Choice' : 'Short Answer'}
                                                        </span>
                                                        <span className={`badge badge-outline ${getDifficultyColor(itemData.item.difficulty)}`}>
                                                          {itemData.item.difficulty}
                                                        </span>
                                                      </div>
                                                      <p className="text-sm text-gray-700 mb-2">
                                                        {itemData.item.question}
                                                      </p>
                                                      {itemData.item.type === 'multiple_choice' && (
                                                        <div className="text-xs text-gray-600">
                                                          <span className="font-medium">Answer:</span> {itemData.item.correctAnswer}
                                                        </div>
                                                      )}
                                                    </div>
                                                  ))}
                                                  {standard.items.length > 3 && (
                                                    <p className="text-sm text-gray-500 text-center">
                                                      ... and {standard.items.length - 3} more items
                                                    </p>
                                                  )}
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}