import React, { useState, useEffect } from 'react';
import { Search, Calendar, MapPin, Filter } from 'lucide-react';
import { loadNoticiasFromFiles } from './utils/loadNoticias';

export default function App() {
  const [noticias, setNoticias] = useState([]);
  const [filteredNoticias, setFilteredNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedYear, setSelectedYear] = useState('todas');

  // Categorias disponíveis
  const categories = ['todas', 'noticias', 'eventos', 'historia', 'turismo'];

  useEffect(() => {
    loadNoticias();
  }, []);

  useEffect(() => {
    filterNoticias();
  }, [noticias, searchTerm, selectedCategory, selectedYear]);

  const loadNoticias = async () => {
    try {
      const noticiasData = await loadNoticiasFromFiles();
      setNoticias(noticiasData);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar notícias:', error);
      setLoading(false);
    }
  };

  const filterNoticias = () => {
    let filtered = noticias.filter(noticia => noticia.published);

    // Filtro por categoria
    if (selectedCategory !== 'todas') {
      filtered = filtered.filter(noticia => noticia.category === selectedCategory);
    }

    // Filtro por ano
    if (selectedYear !== 'todas') {
      filtered = filtered.filter(noticia => {
        const noticiaYear = new Date(noticia.date).getFullYear().toString();
        return noticiaYear === selectedYear;
      });
    }

    // Filtro por pesquisa
    if (searchTerm) {
      filtered = filtered.filter(noticia =>
        noticia.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        noticia.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        noticia.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar por data (mais recentes primeiro)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    setFilteredNoticias(filtered);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'eventos': return <Calendar className="w-4 h-4" />;
      case 'turismo': return <MapPin className="w-4 h-4" />;
      default: return null;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'eventos': return 'bg-blue-100 text-blue-800';
      case 'noticias': return 'bg-green-100 text-green-800';
      case 'historia': return 'bg-purple-100 text-purple-800';
      case 'turismo': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const years = ['todas', ...Array.from(new Set(noticias.map(n => new Date(n.date).getFullYear().toString())))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="text-white text-xl">A carregar notícias...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center mb-2">Castelo de Paiva</h1>
          <p className="text-center text-blue-100">Site oficial do município</p>
        </div>
      </header>

      {/* Filtros e Pesquisa */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Pesquisa */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Pesquisar notícias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filtros */}
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'todas' ? 'Todas as categorias' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year === 'todas' ? 'Todos os anos' : year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <main className="container mx-auto px-4 py-8">
        {filteredNoticias.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">Nenhuma notícia encontrada</div>
            <p className="text-gray-400">Tente ajustar os filtros ou termos de pesquisa</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredNoticias.map((noticia) => (
              <article key={noticia.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(noticia.category)}`}>
                      {getCategoryIcon(noticia.category)}
                      <span className="ml-1">{noticia.category}</span>
                    </span>
                    <time className="text-sm text-gray-500">{formatDate(noticia.date)}</time>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {noticia.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {noticia.summary}
                  </p>
                  
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                    Ler mais →
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Castelo de Paiva. Todos os direitos reservados.</p>
          <p className="text-gray-400 text-sm mt-2">
            Gerido com Decap CMS - 
            <a href="/admin" className="text-blue-400 hover:text-blue-300 ml-1">
              Painel de Administração
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
