import { CategoryConfig } from '../types/Task';

export const categoryConfigs: CategoryConfig[] = [
  {
    name: 'Work',
    color: 'from-blue-500 to-purple-600',
    gradient: 'bg-gradient-to-r from-blue-500 to-purple-600',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: '💼'
  },
  {
    name: 'Personal',
    color: 'from-green-500 to-teal-600',
    gradient: 'bg-gradient-to-r from-green-500 to-teal-600',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: '🏠'
  },
  {
    name: 'Health',
    color: 'from-pink-500 to-rose-600',
    gradient: 'bg-gradient-to-r from-pink-500 to-rose-600',
    image: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: '💪'
  },
  {
    name: 'Learning',
    color: 'from-orange-500 to-red-600',
    gradient: 'bg-gradient-to-r from-orange-500 to-red-600',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: '📚'
  },
  {
    name: 'Shopping',
    color: 'from-yellow-500 to-orange-600',
    gradient: 'bg-gradient-to-r from-yellow-500 to-orange-600',
    image: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: '🛍️'
  },
  {
    name: 'Travel',
    color: 'from-indigo-500 to-blue-600',
    gradient: 'bg-gradient-to-r from-indigo-500 to-blue-600',
    image: 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: '✈️'
  }
];

export const getCategoryConfig = (categoryName: string): CategoryConfig => {
  return categoryConfigs.find(config => config.name === categoryName) || {
    name: categoryName,
    color: 'from-gray-500 to-gray-600',
    gradient: 'bg-gradient-to-r from-gray-500 to-gray-600',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: '📋'
  };
};