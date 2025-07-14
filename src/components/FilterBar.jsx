import React from 'react';
import { Filter, X } from 'lucide-react';

const categories = [
  { value: 'all', label: 'Todas as categorias' },
  { value: 'noticia', label: 'Notícias' },
  { value: 'evento', label: 'Eventos' },
  { value: 'comunicado', label: 'Comunicados' },
  { value: 'obra', label: 'Obras' },
  { value: 'cultura', label: 'Cultura' },
  { value: 'desporto', label: 'Desporto' },
  { value: 'turismo', label: 'Turismo' },
  { value: 'educacao', label: 'Educação' }
];

const contentTypes = [
  { value: 'all', label: 'Tudo' },
  { value: 'news', label: 'Apenas Notícias' },
  { value: 'events', label: 'Apenas Eventos' }
];

export default function FilterBar({ 
  selectedCategory = 'all', 
  selectedType = 'all',
  onCategoryChange,
  onTypeChange,
  onClearFilters,
  resultCount = 0
}) {
  const hasActiveFilters = selectedCategory !== 'all' || selectedType !== 'all';

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex items-center text-gray-700">
            <Filter className="h-5 w-5 mr-2" />
            <span className="font-medium">Filtros:</span>
          </div>
          
          {/* Filtro por categoria */}
          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
            <label className="text-sm font-medium text-gray-600">
              Categoria:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por tipo */}
          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
            <label className="text-sm font-medium text-gray-600">
              Tipo:
            </label>
            <select
              value={selectedType}
              onChange={(e) => onTypeChange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {contentTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Contador de resultados */}
          <span className="text-sm text-gray-600">
            {resultCount} {resultCount === 1 ? 'resultado' : 'resultados'}
          </span>

          {/* Botão para limpar filtros */}
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
            >
              <X className="h-4 w-4" />
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      {/* Indicadores de filtros ativos */}
      {hasActiveFilters && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Filtros ativos:</span>
            
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                {categories.find(c => c.value === selectedCategory)?.label}
                <button
                  onClick={() => onCategoryChange('all')}
                  className="ml-1 hover:text-blue-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            
            {selectedType !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                {contentTypes.find(t => t.value === selectedType)?.label}
                <button
                  onClick={() => onTypeChange('all')}
                  className="ml-1 hover:text-green-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}