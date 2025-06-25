import React, { useState, KeyboardEvent } from 'react';
import { Plus } from 'lucide-react';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="relative group">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="What needs to be done today?"
        className="w-full px-6 py-4 pr-14 text-lg bg-white border-2 border-gray-200 rounded-2xl 
                   focus:border-blue-500 focus:outline-none transition-all duration-200
                   placeholder-gray-400 shadow-sm hover:shadow-md focus:shadow-lg"
      />
      <button
        onClick={handleSubmit}
        disabled={!text.trim()}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-blue-500 text-white 
                   rounded-xl hover:bg-blue-600 transition-all duration-200 disabled:opacity-40 
                   disabled:cursor-not-allowed disabled:hover:bg-blue-500 shadow-md hover:shadow-lg
                   hover:scale-105 active:scale-95"
      >
        <Plus size={20} />
      </button>
    </div>
  );
};