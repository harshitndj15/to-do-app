import React from 'react';
import { FilterType } from '../types';

interface TodoFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  stats: {
    total: number;
    active: number;
    completed: number;
  };
  onClearCompleted: () => void;
}

export const TodoFilters: React.FC<TodoFiltersProps> = ({
  currentFilter,
  onFilterChange,
  stats,
  onClearCompleted,
}) => {
  const filters: { key: FilterType; label: string; count?: number }[] = [
    { key: 'all', label: 'All', count: stats.total },
    { key: 'active', label: 'Active', count: stats.active },
    { key: 'completed', label: 'Completed', count: stats.completed },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 whitespace-nowrap
                       ${currentFilter === filter.key
                         ? 'bg-white text-blue-600 shadow-sm'
                         : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                       }`}
          >
            {filter.label}
            {filter.count !== undefined && (
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold
                              ${currentFilter === filter.key
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-gray-200 text-gray-600'
                              }`}>
                {filter.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {stats.completed > 0 && (
        <button
          onClick={onClearCompleted}
          className="px-4 py-2.5 text-red-600 hover:text-red-700 hover:bg-red-50 
                     rounded-xl transition-all duration-200 font-medium whitespace-nowrap"
        >
          Clear Completed ({stats.completed})
        </button>
      )}
    </div>
  );
};