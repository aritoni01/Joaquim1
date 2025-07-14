import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ onSearch, placeholder = "Pesquisar notícias e eventos..." }) {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      onSearch(query);
    }, 300); // Debounce de 300ms

    return () => clearTimeout(delayedSearch);
  }, [query, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`flex items-center bg-white rounded-lg shadow-md transition-all duration-300 ${
          isExpanded ? 'w-full' : 'w-64'
        }`}>
          <Search className="h-5 w-5 text-gray-400 ml-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            onBlur={() => setIsExpanded(false)}
            placeholder={placeholder}
            className="w-full px-3 py-2 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>

      {/* Indicador de resultados */}
      {query && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg mt-1 p-2 text-sm text-gray-600 z-10">
          A pesquisar por "{query}"...
        </div>
      )}
    </div>
  );
}