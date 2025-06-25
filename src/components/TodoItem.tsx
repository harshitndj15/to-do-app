import React, { useState, KeyboardEvent } from 'react';
import { Check, Edit3, Trash2, X } from 'lucide-react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText);
    }
    setIsEditing(false);
    setEditText(todo.text);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`group p-4 bg-white rounded-2xl border-2 transition-all duration-300 hover:shadow-md
                    ${todo.completed ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
      <div className="flex items-center gap-4">
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center
                     transition-all duration-200 hover:scale-110 active:scale-95
                     ${todo.completed
                       ? 'bg-green-500 border-green-500 text-white'
                       : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
                     }`}
        >
          {todo.completed && <Check size={14} strokeWidth={3} />}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyPress}
                onBlur={handleEdit}
                autoFocus
                className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg 
                           focus:border-blue-500 focus:outline-none text-gray-900"
              />
              <button
                onClick={handleCancel}
                className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <span
              className={`block text-lg font-medium transition-all duration-200 cursor-pointer
                         ${todo.completed
                           ? 'text-green-700 line-through opacity-75'
                           : 'text-gray-900'
                         }`}
              onClick={() => !todo.completed && setIsEditing(true)}
            >
              {todo.text}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {!isEditing && !todo.completed && (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 
                         rounded-lg transition-all duration-200"
            >
              <Edit3 size={16} />
            </button>
          )}
          <button
            onClick={() => onDelete(todo.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 
                       rounded-lg transition-all duration-200"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};