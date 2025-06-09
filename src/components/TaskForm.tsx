import React, { useState, useEffect } from 'react';
import { Plus, X, Sparkles } from 'lucide-react';
import { Task } from '../types/Task';
import { categoryConfigs } from '../utils/categories';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel?: () => void;
  initialTask?: Task;
  categories: string[];
}

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  onCancel,
  initialTask,
  categories
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
      setPriority(initialTask.priority);
      setCategory(initialTask.category);
      setDueDate(initialTask.dueDate || '');
      setShowForm(true);
    }
  }, [initialTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      category: category.trim(),
      dueDate: dueDate || undefined,
      completed: initialTask?.completed || false
    });

    if (!initialTask) {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setCategory('');
      setDueDate('');
      setShowForm(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('');
    setDueDate('');
    onCancel?.();
  };

  if (!showForm && !initialTask) {
    return (
      <div className="mb-8">
        <button
          onClick={() => setShowForm(true)}
          className="group w-full p-6 border-2 border-dashed border-purple-300 rounded-2xl hover:border-purple-400 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 flex items-center justify-center space-x-3 text-purple-600 hover:text-purple-700"
        >
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full group-hover:scale-110 transition-transform duration-300">
            <Plus className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-medium">Create New Task</span>
          <Sparkles className="w-5 h-5 animate-pulse" />
        </button>
      </div>
    );
  }

  return (
    <div className="mb-8 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-1">
        <div className="bg-white rounded-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="What needs to be done?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xl font-medium border-none outline-none placeholder-gray-400 focus:ring-0 p-0 bg-transparent"
                autoFocus
              />
            </div>

            <div>
              <textarea
                placeholder="Add some details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border-none outline-none resize-none placeholder-gray-400 focus:ring-0 p-0 bg-transparent"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200"
                >
                  <option value="low">🟢 Low Priority</option>
                  <option value="medium">🟡 Medium Priority</option>
                  <option value="high">🔴 High Priority</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200"
                >
                  <option value="">Select category...</option>
                  {categoryConfigs.map(config => (
                    <option key={config.name} value={config.name}>
                      {config.icon} {config.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              {(showForm || onCancel) && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={!title.trim()}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                {initialTask ? '✨ Update Task' : '🚀 Create Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};