import React from 'react';
import { Header } from './components/Header';
import { TaskForm } from './components/TaskForm';
import { FilterBar } from './components/FilterBar';
import { TaskList } from './components/TaskList';
import { useTasks } from './hooks/useTasks';

function App() {
  const {
    tasks,
    filter,
    setFilter,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    categories,
    stats
  } = useTasks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <Header 
        stats={stats}
        searchTerm={filter.search}
        onSearchChange={(search) => setFilter({ ...filter, search })}
      />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <TaskForm onSubmit={addTask} categories={categories} />
        
        {tasks.length > 0 && (
          <FilterBar
            filter={filter}
            onFilterChange={setFilter}
            categories={categories}
          />
        )}
        
        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
          onUpdate={updateTask}
          onDelete={deleteTask}
          categories={categories}
        />
      </main>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
}

export default App;