'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, BookOpen, Target, Shield, Brain, Settings, Award } from 'lucide-react';

// Skill data structure
interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
  purpose: string;
  focus: string;
  status: 'active' | 'development' | 'planned';
  quality: number; // 0-100
  lastUpdated: string;
}

// Mock data for 100 skills
const generateMockSkills = (): Skill[] => {
  const categories = [
    'Content Generation',
    'Evaluation & Quality',
    'Accessibility & Equity',
    'Analytics & Insights',
    'Integration & Workflow',
    'Specialized Domains'
  ];

  const skills: Skill[] = [];

  // Generate mock skills for each category
  categories.forEach((category, categoryIndex) => {
    const skillCount = category === 'Evaluation & Quality' ? 25 :
                     category === 'Content Generation' ? 20 :
                     category === 'Analytics & Insights' ? 20 : 10;

    for (let i = 1; i <= skillCount; i++) {
      skills.push({
        id: `skill-${categoryIndex}-${i}`,
        name: `${category.toLowerCase().replace(' & ', '-').replace(' ', '-')}-${i}`,
        category,
        description: `Advanced AI skill for ${category.toLowerCase()} with specialized focus areas`,
        purpose: `Purpose for skill ${i} in ${category}`,
        focus: `Focus area ${i} for specialized processing`,
        status: Math.random() > 0.3 ? 'active' : Math.random() > 0.5 ? 'development' : 'planned',
        quality: Math.floor(Math.random() * 30) + 70,
        lastUpdated: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
      });
    }
  });

  return skills;
};

const SkillsDashboard: React.FC = () => {
  const [skills] = useState<Skill[]>(generateMockSkills());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  // Filter skills based on search and filters
  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           skill.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           skill.purpose.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || skill.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [skills, searchTerm, selectedCategory, selectedStatus]);

  // Category statistics
  const categoryStats = useMemo(() => {
    const stats: Record<string, { total: number; active: number; avgQuality: number }> = {};

    skills.forEach(skill => {
      if (!stats[skill.category]) {
        stats[skill.category] = { total: 0, active: 0, avgQuality: 0 };
      }
      stats[skill.category].total++;
      if (skill.status === 'active') {
        stats[skill.category].active++;
      }
      stats[skill.category].avgQuality += skill.quality;
    });

    // Calculate average quality
    Object.keys(stats).forEach(category => {
      stats[category].avgQuality = Math.round(stats[category].avgQuality / stats[category].total);
    });

    return stats;
  }, [skills]);

  // Get icon for category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Content Generation': return <BookOpen className="w-5 h-5" />;
      case 'Evaluation & Quality': return <Target className="w-5 h-5" />;
      case 'Accessibility & Equity': return <Shield className="w-5 h-5" />;
      case 'Analytics & Insights': return <Brain className="w-5 h-5" />;
      case 'Integration & Workflow': return <Settings className="w-5 h-5" />;
      case 'Specialized Domains': return <Award className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'development': return 'bg-yellow-100 text-yellow-800';
      case 'planned': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          AI Skills Management Dashboard
        </h1>
        <p className="text-lg text-gray-600">
          Manage and review {skills.length} specialized AI skills for mathematics assessment
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {Object.entries(categoryStats).map(([category, stats]) => (
          <div key={category} className="bg-white rounded-lg shadow p-4 border border-gray-200">
            <div className="flex items-center mb-2">
              {getCategoryIcon(category)}
              <h3 className="ml-2 text-sm font-semibold text-gray-900">{category}</h3>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-xs text-gray-600">
              {stats.active} active • Avg: {stats.avgQuality}% quality
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {Object.keys(categoryStats).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="development">Development</option>
            <option value="planned">Planned</option>
          </select>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {filteredSkills.length} of {skills.length} skills
            </span>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
            onClick={() => setSelectedSkill(skill)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  {getCategoryIcon(skill.category)}
                  <span className="ml-2 text-sm font-medium text-gray-600">{skill.category}</span>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(skill.status)}`}>
                  {skill.status}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{skill.name}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{skill.description}</p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <span className="text-gray-500">Quality:</span>
                  <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        skill.quality >= 90 ? 'bg-green-500' :
                        skill.quality >= 80 ? 'bg-blue-500' :
                        skill.quality >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${skill.quality}%` }}
                    />
                  </div>
                  <span className="ml-2 text-gray-700 font-medium">{skill.quality}%</span>
                </div>
                <span className="text-gray-500 text-xs">
                  {new Date(skill.lastUpdated).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    {getCategoryIcon(selectedSkill.category)}
                    <span className="ml-2 text-sm font-medium text-gray-600">{selectedSkill.category}</span>
                    <span className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedSkill.status)}`}>
                      {selectedSkill.status}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedSkill.name}</h2>
                </div>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600">{selectedSkill.description}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Purpose</h3>
                  <p className="text-gray-600">{selectedSkill.purpose}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Focus</h3>
                  <p className="text-gray-600">{selectedSkill.focus}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Quality Score</h3>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${
                            selectedSkill.quality >= 90 ? 'bg-green-500' :
                            selectedSkill.quality >= 80 ? 'bg-blue-500' :
                            selectedSkill.quality >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${selectedSkill.quality}%` }}
                        />
                      </div>
                      <span className="ml-3 font-bold text-lg">{selectedSkill.quality}%</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Last Updated</h3>
                    <p className="text-gray-600">
                      {new Date(selectedSkill.lastUpdated).toLocaleDateString()} at{' '}
                      {new Date(selectedSkill.lastUpdated).toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    View Full Documentation
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Test Skill
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Edit Configuration
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsDashboard;