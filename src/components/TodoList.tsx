import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  onEdit,
}) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <CheckCircle2 size={32} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">All caught up!</h3>
        <p className="text-gray-500 max-w-sm mx-auto">
          You don't have any tasks yet. Add one above to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};