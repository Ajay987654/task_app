export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  category: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFilter {
  search: string;
  category: string;
  priority: string;
  status: 'all' | 'active' | 'completed';
}

export interface CategoryConfig {
  name: string;
  color: string;
  gradient: string;
  image: string;
  icon: string;
}