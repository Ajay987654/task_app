import React, { useState } from 'react';
import { Edit3, Trash2, Calendar, Flag, Clock } from 'lucide-react';
import { Task } from '../types/Task';
import { TaskForm } from './TaskForm';
import { getCategoryConfig } from '../utils/categories';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
  categories: string[];
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onUpdate,
  onDelete,
  categories
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleUpdate = (updatedTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    onUpdate(task.id, updatedTask);
    setIsEditing(false);
  };

  const isOverdue = task.dueDate && !task.completed && new Date(task.dueDate) < new Date();
  const categoryConfig = getCategoryConfig(task.category);
  
  const priorityConfig = {
    high: { color: 'from-red-500 to-pink-500', icon: '🔴', bg: 'bg-red-50 border-red-200' },
    medium: { color: 'from-yellow-500 to-orange-500', icon: '🟡', bg: 'bg-yellow-50 border-yellow-200' },
    low: { color: 'from-green-500 to-emerald-500', icon: '🟢', bg: 'bg-green-50 border-green-200' }
  };

  if (isEditing) {
    return (
      <div className="mb-6">
        <TaskForm
          initialTask={task}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
          categories={categories}
        />
      </div>
    );
  }

  return (
    <div 
      className={`mb-6 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
        task.completed ? 'opacity-70' : ''
      } ${isOverdue ? 'ring-2 ring-red-300' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Category Header with Image */}
      {task.category && (
        <div className="relative h-24 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${categoryConfig.image}')` }}
          ></div>
          <div className={`absolute inset-0 bg-gradient-to-r ${categoryConfig.color} opacity-80`}></div>
          <div className="relative z-10 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{categoryConfig.icon}</span>
              <span className="text-white font-medium">{task.category}</span>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30`}>
              {priorityConfig[task.priority].icon} {task.priority.toUpperCase()}
            </div>
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start space-x-4">
          <button
            onClick={() => onToggle(task.id)}
            className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
              task.completed
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-500 text-white'
                : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50'
            }`}
          >
            {task.completed && (
              <svg className="w-4 h-4\" fill="currentColor\" viewBox="0 0 20 20">
                <path fillRule="evenodd\" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z\" clipRule="evenodd" />
              </svg>
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <h3 className={`text-lg font-semibold transition-all duration-200 ${
                task.completed ? 'line-through text-gray-500' : 'text-gray-900'
              }`}>
                {task.title}
              </h3>
              
              <div className={`flex items-center space-x-2 ml-4 transition-opacity duration-200 ${
                isHovered ? 'opacity-100' : 'opacity-60'
              }`}>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-gray-400 hover:text-purple-500 hover:bg-purple-50 rounded-lg transition-all duration-200 transform hover:scale-110"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 transform hover:scale-110"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {task.description && (
              <p className={`mt-2 text-gray-600 leading-relaxed ${task.completed ? 'line-through' : ''}`}>
                {task.description}
              </p>
            )}

            <div className="flex items-center space-x-4 mt-4">
              {task.dueDate && (
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${
                  isOverdue 
                    ? 'bg-red-100 text-red-700 border border-red-200' 
                    : 'bg-blue-100 text-blue-700 border border-blue-200'
                }`}>
                  <Calendar className="w-3 h-3" />
                  <span>
                    {new Date(task.dueDate).toLocaleDateString()}
                    {isOverdue && ' (Overdue!)'}
                  </span>
                </div>
              )}
              
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>Created {new Date(task.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};