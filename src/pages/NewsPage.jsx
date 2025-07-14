import React, { useState, useEffect } from 'react';
import { searchContent, loadContent } from '../utils/contentLoader';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import NewsCard from '../components/NewsCard';

export default function NewsPage() {
  const [allContent, setAllContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    loadInitialContent();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [allContent, searchQuery, selectedCategory, selectedType]);

  const loadInitialContent = async () => {
    try {
      setLoading(true);
      const content = await loadContent('noticias', { published: true });
      setAllContent(content);
    } catch (error) {
      console.error('Erro ao carregar conteúdo:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async () => {
    let filtered = [...allContent];

    // Aplicar pesquisa por texto
    if (searchQuery.trim()) {
      filtered = await searchContent(searchQuery);
    }

    // Aplicar filtro por categoria
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => 
        item.frontmatter.category === selectedCategory
      );
    }

    // Aplicar filtro por tipo (notícia/evento)
    if (selectedType === 'news') {
      filtered = filtered.filter(item => !item.frontmatter.isEvent);
    } else if (selectedType === 'events') {
      filtered = filtered.filter(item => item.frontmatter.isEvent);
    }

    setFilteredContent(filtered);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedType('all');
    setSearchQuery('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">A carregar notícias...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Notícias e Eventos
          </h1>
          <p className="text-gray-600 mb-6">
            Mantenha-se informado sobre as últimas novidades de Castelo de Paiva
          </p>
          
          {/* Barra de Pesquisa */}
          <div className="mb-6">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>

        {/* Filtros */}
        <FilterBar
          selectedCategory={selectedCategory}
          selectedType={selectedType}
          onCategoryChange={handleCategoryChange}
          onTypeChange={handleTypeChange}
          onClearFilters={handleClearFilters}
          resultCount={filteredContent.length}
        />

        {/* Resultados */}
        {filteredContent.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum resultado encontrado
            </h3>
            <p className="text-gray-600 mb-4">
              {searchQuery ? 
                `Não encontrámos resultados para "${searchQuery}".` :
                'Não há conteúdo que corresponda aos filtros selecionados.'
              }
            </p>
            <button
              onClick={handleClearFilters}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <>
            {/* Destaque para o primeiro item se existir */}
            {filteredContent.length > 0 && (
              <div className="mb-8">
                <NewsCard item={filteredContent[0]} variant="featured" />
              </div>
            )}

            {/* Grid de notícias restantes */}
            {filteredContent.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContent.slice(1).map((item, index) => (
                  <NewsCard key={index} item={item} variant="default" />
                ))}
              </div>
            )}
          </>
        )}

        {/* Informação adicional se houver muitos resultados */}
        {filteredContent.length > 12 && (
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              A mostrar {filteredContent.length} resultados
            </p>
            <p className="text-sm text-gray-500">
              Use os filtros acima para refinar a sua pesquisa
            </p>
          </div>
        )}
      </div>
    </div>
  );
}