import { useState, useEffect, useCallback } from 'react';
import { Task, TaskFilter } from '../types/Task';
import { loadTasks, saveTasks, generateId } from '../utils/storage';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>({
    search: '',
    category: 'all',
    priority: 'all',
    status: 'all'
  });

  useEffect(() => {
    const savedTasks = loadTasks();
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = useCallback((taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTasks(prev => [newTask, ...prev]);
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    ));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const toggleTask = useCallback((id: string) => {
    updateTask(id, { completed: !tasks.find(t => t.id === id)?.completed });
  }, [tasks, updateTask]);

  const filteredTasks = tasks.filter(task => {
    if (filter.search && !task.title.toLowerCase().includes(filter.search.toLowerCase()) &&
        !task.description.toLowerCase().includes(filter.search.toLowerCase())) {
      return false;
    }
    if (filter.category !== 'all' && task.category !== filter.category) {
      return false;
    }
    if (filter.priority !== 'all' && task.priority !== filter.priority) {
      return false;
    }
    if (filter.status === 'active' && task.completed) {
      return false;
    }
    if (filter.status === 'completed' && !task.completed) {
      return false;
    }
    return true;
  });

  const categories = Array.from(new Set(tasks.map(task => task.category))).filter(Boolean);
  
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    active: tasks.filter(t => !t.completed).length,
    overdue: tasks.filter(t => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()).length
  };

  return {
    tasks: filteredTasks,
    filter,
    setFilter,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    categories,
    stats
  };
};