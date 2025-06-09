import React from 'react';
import { TaskItem } from './TaskItem';
import { Task } from '../types/Task';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
  categories: string[];
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggle,
  onUpdate,
  onDelete,
  categories
}) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="relative">
          {/* Animated Background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
          </div>
          
          {/* Main Content */}
          <div className="relative z-10">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No tasks yet!</h3>
            <p className="text-gray-500 text-lg mb-4">Ready to get productive?</p>
            <p className="text-gray-400">Create your first task and start organizing your life</p>
            
            {/* Decorative Elements */}
            <div className="flex justify-center space-x-4 mt-8">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sort tasks: incomplete first, then by priority, then by due date
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (a.priority !== b.priority) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="space-y-4">
      {sortedTasks.map((task, index) => (
        <div 
          key={task.id}
          className="animate-fadeIn"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <TaskItem
            task={task}
            onToggle={onToggle}
            onUpdate={onUpdate}
            onDelete={onDelete}
            categories={categories}
          />
        </div>
      ))}
    </div>
  );
};