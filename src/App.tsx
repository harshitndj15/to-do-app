import React from 'react';
import { CheckSquare } from 'lucide-react';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { TodoFilters } from './components/TodoFilters';
import { useTodos } from './hooks/useTodos';

function App() {
  const {
    todos,
    filter,
    stats,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    setFilter,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500 rounded-2xl shadow-lg">
              <CheckSquare size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
                           bg-clip-text text-transparent">
              Beautiful Todos
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Stay organized and productive with your beautifully designed task manager
          </p>
        </div>

        {/* Progress Bar */}
        {stats.total > 0 && (
          <div className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-600">Progress</span>
              <span className="text-sm font-semibold text-gray-900">
                {stats.completed} of {stats.total} completed
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full 
                           transition-all duration-500 ease-out"
                style={{
                  width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-6">
          {/* Input */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <TodoInput onAdd={addTodo} />
          </div>

          {/* Filters */}
          {stats.total > 0 && (
            <TodoFilters
              currentFilter={filter}
              onFilterChange={setFilter}
              stats={stats}
              onClearCompleted={clearCompleted}
            />
          )}

          {/* Todo List */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p className="text-sm">
            Built with React, TypeScript, and Tailwind CSS • Data persisted locally
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;