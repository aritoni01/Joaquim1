import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, MapPin, Euro, Tag, ArrowLeft, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Markdown from 'markdown-to-jsx';
import { loadSingleContent, loadContent } from '../utils/contentLoader';

export default function NewsDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [relatedContent, setRelatedContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadContentData();
  }, [slug]);

  const loadContentData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Carregar o conteúdo específico
      const contentData = await loadSingleContent('noticias', `${slug}.md`);
      
      if (!contentData) {
        setError('Conteúdo não encontrado');
        return;
      }

      setContent(contentData);

      // Carregar conteúdo relacionado
      const allContent = await loadContent('noticias', { published: true, limit: 4 });
      const related = allContent
        .filter(item => item.slug !== slug)
        .filter(item => 
          item.frontmatter.category === contentData.frontmatter.category ||
          (item.frontmatter.tags && contentData.frontmatter.tags && 
           item.frontmatter.tags.some(tag => contentData.frontmatter.tags.includes(tag)))
        )
        .slice(0, 3);
      
      setRelatedContent(related);

    } catch (error) {
      console.error('Erro ao carregar conteúdo:', error);
      setError('Erro ao carregar o conteúdo');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd \'de\' MMMM \'de\' yyyy', { locale: ptBR });
    } catch {
      return 'Data inválida';
    }
  };

  const formatEventDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy \'às\' HH:mm', { locale: ptBR });
    } catch {
      return 'Data inválida';
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: content.frontmatter.title,
          text: content.frontmatter.summary,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Erro ao partilhar:', error);
      }
    } else {
      // Fallback: copiar URL para clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'noticia': 'bg-blue-100 text-blue-800',
      'evento': 'bg-green-100 text-green-800',
      'comunicado': 'bg-yellow-100 text-yellow-800',
      'obra': 'bg-orange-100 text-orange-800',
      'cultura': 'bg-purple-100 text-purple-800',
      'desporto': 'bg-red-100 text-red-800',
      'turismo': 'bg-teal-100 text-teal-800',
      'educacao': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">A carregar...</p>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Conteúdo não encontrado'}
          </h1>
          <button
            onClick={() => navigate('/noticias')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Voltar às notícias
          </button>
        </div>
      </div>
    );
  }

  const { frontmatter, content: markdownContent } = content;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Navegação */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Imagem destacada */}
              {frontmatter.featuredImage && (
                <div className="h-64 md:h-80">
                  <img
                    src={frontmatter.featuredImage}
                    alt={frontmatter.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}

              <div className="p-6 md:p-8">
                {/* Metadados */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(frontmatter.category)}`}>
                    {frontmatter.category}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {formatDate(frontmatter.date)}
                  </span>
                  <button
                    onClick={handleShare}
                    className="flex items-center text-gray-500 hover:text-gray-700 text-sm"
                  >
                    <Share2 className="h-4 w-4 mr-1" />
                    Partilhar
                  </button>
                </div>

                {/* Título */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {frontmatter.title}
                </h1>

                {/* Resumo */}
                {frontmatter.summary && (
                  <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                    {frontmatter.summary}
                  </p>
                )}

                {/* Informações do evento */}
                {frontmatter.isEvent && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-green-900 mb-3">Informações do Evento</h3>
                    <div className="space-y-2 text-green-800">
                      {frontmatter.eventDate && (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {formatEventDate(frontmatter.eventDate)}
                        </div>
                      )}
                      {frontmatter.eventLocation && (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {frontmatter.eventLocation}
                        </div>
                      )}
                      {frontmatter.eventPrice && (
                        <div className="flex items-center">
                          <Euro className="h-4 w-4 mr-2" />
                          {frontmatter.eventPrice}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Conteúdo Markdown */}
                <div className="prose prose-lg max-w-none">
                  <Markdown
                    options={{
                      overrides: {
                        h1: { props: { className: 'text-2xl font-bold mt-8 mb-4' } },
                        h2: { props: { className: 'text-xl font-bold mt-6 mb-3' } },
                        h3: { props: { className: 'text-lg font-bold mt-4 mb-2' } },
                        p: { props: { className: 'mb-4 leading-relaxed' } },
                        ul: { props: { className: 'list-disc list-inside mb-4 space-y-1' } },
                        ol: { props: { className: 'list-decimal list-inside mb-4 space-y-1' } },
                        strong: { props: { className: 'font-semibold' } },
                        em: { props: { className: 'italic' } },
                        a: { props: { className: 'text-blue-600 hover:text-blue-800 underline' } }
                      }
                    }}
                  >
                    {markdownContent}
                  </Markdown>
                </div>

                {/* Tags */}
                {frontmatter.tags && frontmatter.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {frontmatter.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Conteúdo Relacionado */}
            {relatedContent.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Conteúdo Relacionado
                </h3>
                <div className="space-y-4">
                  {relatedContent.map((item, index) => (
                    <div key={index} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                      <h4 className="font-medium text-gray-900 mb-1">
                        <Link
                          to={`/${item.frontmatter.isEvent ? 'eventos' : 'noticias'}/${item.slug}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {item.frontmatter.title}
                        </Link>
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {item.frontmatter.summary}
                      </p>
                      <span className="text-xs text-gray-500">
                        {formatDate(item.frontmatter.date)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="bg-blue-50 rounded-lg p-6 mt-6">
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                Fique Informado
              </h3>
              <p className="text-blue-800 text-sm mb-4">
                Não perca as últimas notícias e eventos de Castelo de Paiva.
              </p>
              <Link
                to="/noticias"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Ver Todas as Notícias
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}