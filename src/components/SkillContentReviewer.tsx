import React, { useState } from 'react';
import {
  FileText,
  CheckCircle,
  AlertTriangle,
  Clock,
  Search,
  Filter,
  Edit3,
  Download,
  Play
} from 'lucide-react';

interface SkillContent {
  id: string;
  name: string;
  version: string;
  status: 'published' | 'draft' | 'review' | 'archived';
  content: string;
  metadata: {
    category: string;
    description: string;
    purpose: string;
    focus: string;
    dependencies: string[];
    examples: string[];
    qualityScore: number;
    lastModified: string;
    author: string;
    reviewHistory: ReviewEntry[];
  };
}

interface ReviewEntry {
  id: string;
  reviewer: string;
  date: string;
  status: 'approved' | 'needs_revisions' | 'rejected';
  comments: string;
  suggestions: string[];
}

interface SkillContentReviewerProps {
  skillContents: SkillContent[];
  onContentUpdate?: (skillId: string, content: string) => void;
  onStatusChange?: (skillId: string, status: string) => void;
}

const SkillContentReviewer: React.FC<SkillContentReviewerProps> = ({
  skillContents,
  onContentUpdate,
  onStatusChange
}) => {
  const [selectedSkill, setSelectedSkill] = useState<SkillContent | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');

  // Filter skill contents
  const filteredContents = skillContents.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.metadata.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || skill.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || skill.metadata.category === filterCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'review': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'draft': return <Clock className="w-5 h-5 text-blue-500" />;
      case 'archived': return <FileText className="w-5 h-5 text-gray-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-blue-100 text-blue-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEdit = (skill: SkillContent) => {
    setSelectedSkill(skill);
    setEditContent(skill.content);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (selectedSkill && onContentUpdate) {
      onContentUpdate(selectedSkill.id, editContent);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditContent('');
    setSelectedSkill(null);
  };

  const categories = Array.from(new Set(skillContents.map(skill => skill.metadata.category)));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Skill Content Review</h1>
          <p className="text-gray-600">Review, edit, and manage AI skill content and documentation</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
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
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="review">In Review</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>

            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Skills List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Skills ({filteredContents.length})</h2>
              </div>
              <div className="max-h-[600px] overflow-y-auto">
                {filteredContents.map(skill => (
                  <div
                    key={skill.id}
                    className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                      selectedSkill?.id === skill.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    }`}
                    onClick={() => setSelectedSkill(skill)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center">
                        {getStatusIcon(skill.status)}
                        <span className="ml-2 text-sm font-medium text-gray-900">{skill.name}</span>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(skill.status)}`}>
                        {skill.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {skill.metadata.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{skill.metadata.category}</span>
                      <span>v{skill.version}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skill Content Viewer */}
          <div className="lg:col-span-2">
            {selectedSkill ? (
              <div className="bg-white rounded-lg shadow">
                {/* Skill Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center mb-2">
                        {getStatusIcon(selectedSkill.status)}
                        <span className="ml-2 text-lg font-semibold text-gray-900">{selectedSkill.name}</span>
                        <span className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedSkill.status)}`}>
                          {selectedSkill.status}
                        </span>
                      </div>
                      <p className="text-gray-600">{selectedSkill.metadata.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(selectedSkill)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg" title="Download">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg" title="Test">
                        <Play className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Category:</span>
                      <span className="ml-2 text-gray-900">{selectedSkill.metadata.category}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Version:</span>
                      <span className="ml-2 text-gray-900">v{selectedSkill.version}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Quality:</span>
                      <span className="ml-2 text-gray-900">{selectedSkill.metadata.qualityScore}%</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Author:</span>
                      <span className="ml-2 text-gray-900">{selectedSkill.metadata.author}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {isEditing ? (
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Edit Content</h3>
                        <div className="flex gap-2">
                          <button
                            onClick={handleCancel}
                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Content</h3>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Edit Content
                        </button>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">
                        {selectedSkill.content}
                      </div>
                    </div>
                  )}
                </div>

                {/* Review History */}
                <div className="p-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Review History</h3>
                  <div className="space-y-4">
                    {selectedSkill.metadata.reviewHistory.map(review => (
                      <div key={review.id} className="border-l-4 border-gray-200 pl-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{review.reviewer}</span>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              review.status === 'approved' ? 'bg-green-100 text-green-800' :
                              review.status === 'needs_revisions' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {review.status.replace('_', ' ')}
                            </span>
                            <span className="text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2">{review.comments}</p>
                        {review.suggestions.length > 0 && (
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {review.suggestions.map((suggestion, index) => (
                              <li key={index}>{suggestion}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="p-6 border-t border-gray-200">
                  <div className="flex gap-3">
                    <button
                      onClick={() => onStatusChange?.(selectedSkill.id, 'review')}
                      className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                    >
                      Submit for Review
                    </button>
                    <button
                      onClick={() => onStatusChange?.(selectedSkill.id, 'published')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Publish
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      Archive
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a skill to review</h3>
                <p className="text-gray-600">Choose a skill from the list to view and edit its content</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillContentReviewer;