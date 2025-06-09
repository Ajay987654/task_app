import React from 'react';
import { Filter, Sparkles } from 'lucide-react';
import { TaskFilter } from '../types/Task';
import { categoryConfigs } from '../utils/categories';

interface FilterBarProps {
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  categories: string[];
}

export const FilterBar: React.FC<FilterBarProps> = ({ filter, onFilterChange, categories }) => {
  const updateFilter = (updates: Partial<TaskFilter>) => {
    onFilterChange({ ...filter, ...updates });
  };

  return (
    <div className="mb-8 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-white" />
          <span className="text-white font-medium">Smart Filters</span>
          <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filter.status}
              onChange={(e) => updateFilter({ status: e.target.value as 'all' | 'active' | 'completed' })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200 bg-gradient-to-r from-gray-50 to-white"
            >
              <option value="all">🌟 All Tasks</option>
              <option value="active">⚡ Active Tasks</option>
              <option value="completed">✅ Completed Tasks</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={filter.category}
              onChange={(e) => updateFilter({ category: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200 bg-gradient-to-r from-gray-50 to-white"
            >
              <option value="all">🎯 All Categories</option>
              {categoryConfigs.map(config => (
                <option key={config.name} value={config.name}>
                  {config.icon} {config.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select
              value={filter.priority}
              onChange={(e) => updateFilter({ priority: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200 bg-gradient-to-r from-gray-50 to-white"
            >
              <option value="all">🎨 All Priorities</option>
              <option value="high">🔴 High Priority</option>
              <option value="medium">🟡 Medium Priority</option>
              <option value="low">🟢 Low Priority</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};