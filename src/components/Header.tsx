import React from 'react';
import { CheckSquare, Search, Sparkles } from 'lucide-react';

interface HeaderProps {
  stats: {
    total: number;
    completed: number;
    active: number;
    overdue: number;
  };
  searchTerm: string;
  onSearchChange: (search: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ stats, searchTerm, onSearchChange }) => {
  return (
    <header className="relative overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay'
          }}
        ></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 -left-8 w-16 h-16 bg-yellow-400/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-4 right-1/4 w-12 h-12 bg-pink-400/20 rounded-full animate-ping"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
              <CheckSquare className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">TaskFlow</h1>
              <p className="text-white/80 text-sm">Organize your life beautifully</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
            <span className="text-white/90 text-sm font-medium">Stay Productive</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-2xl font-bold text-white">{stats.active}</div>
            <div className="text-white/80 text-sm">Active Tasks</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-2xl font-bold text-green-300">{stats.completed}</div>
            <div className="text-white/80 text-sm">Completed</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-white/80 text-sm">Total Tasks</div>
          </div>
          {stats.overdue > 0 && (
            <div className="bg-red-500/20 backdrop-blur-sm rounded-xl p-4 border border-red-400/30">
              <div className="text-2xl font-bold text-red-300">{stats.overdue}</div>
              <div className="text-white/80 text-sm">Overdue</div>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
          <input
            type="text"
            placeholder="Search your tasks..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/30 focus:border-white/40 outline-none transition-all duration-300"
          />
        </div>
      </div>
    </header>
  );
};