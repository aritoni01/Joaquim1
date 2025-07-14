import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Euro, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const CategoryBadge = ({ category }) => {
  const categoryColors = {
    'noticia': 'bg-blue-100 text-blue-800',
    'evento': 'bg-green-100 text-green-800',
    'comunicado': 'bg-yellow-100 text-yellow-800',
    'obra': 'bg-orange-100 text-orange-800',
    'cultura': 'bg-purple-100 text-purple-800',
    'desporto': 'bg-red-100 text-red-800',
    'turismo': 'bg-teal-100 text-teal-800',
    'educacao': 'bg-indigo-100 text-indigo-800'
  };

  const colorClass = categoryColors[category] || 'bg-gray-100 text-gray-800';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {category}
    </span>
  );
};

export default function NewsCard({ item, variant = 'default' }) {
  const { frontmatter, slug } = item;
  const {
    title,
    date,
    summary,
    category,
    tags,
    featuredImage,
    isEvent,
    eventDate,
    eventLocation,
    eventPrice
  } = frontmatter;

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

  // Variantes do card
  if (variant === 'featured') {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {featuredImage && (
          <div className="h-48 bg-gray-200">
            <img
              src={featuredImage}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <CategoryBadge category={category} />
            <span className="text-sm text-gray-500">
              {formatDate(date)}
            </span>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            <Link 
              to={`/${isEvent ? 'eventos' : 'noticias'}/${slug}`}
              className="hover:text-blue-600 transition-colors"
            >
              {title}
            </Link>
          </h2>
          
          {summary && (
            <p className="text-gray-600 mb-4">{summary}</p>
          )}
          
          {/* Informações do evento */}
          {isEvent && (
            <div className="space-y-2 mb-4 text-sm text-gray-600">
              {eventDate && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatEventDate(eventDate)}
                </div>
              )}
              {eventLocation && (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {eventLocation}
                </div>
              )}
              {eventPrice && (
                <div className="flex items-center">
                  <Euro className="h-4 w-4 mr-2" />
                  {eventPrice}
                </div>
              )}
            </div>
          )}
          
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <Link
            to={`/${isEvent ? 'eventos' : 'noticias'}/${slug}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            Ler mais →
          </Link>
        </div>
      </div>
    );
  }

  // Variante compact
  if (variant === 'compact') {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between mb-2">
          <CategoryBadge category={category} />
          <span className="text-xs text-gray-500">
            {formatDate(date)}
          </span>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2">
          <Link 
            to={`/${isEvent ? 'eventos' : 'noticias'}/${slug}`}
            className="hover:text-blue-600 transition-colors"
          >
            {title}
          </Link>
        </h3>
        
        {summary && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {summary}
          </p>
        )}
        
        {isEvent && eventDate && (
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <Calendar className="h-3 w-3 mr-1" />
            {formatEventDate(eventDate)}
          </div>
        )}
        
        <Link
          to={`/${isEvent ? 'eventos' : 'noticias'}/${slug}`}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Ler mais →
        </Link>
      </div>
    );
  }

  // Variante padrão
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {featuredImage && (
        <div className="h-32 bg-gray-200">
          <img
            src={featuredImage}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <CategoryBadge category={category} />
          <span className="text-xs text-gray-500">
            {formatDate(date)}
          </span>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2">
          <Link 
            to={`/${isEvent ? 'eventos' : 'noticias'}/${slug}`}
            className="hover:text-blue-600 transition-colors"
          >
            {title}
          </Link>
        </h3>
        
        {summary && (
          <p className="text-sm text-gray-600 mb-3">
            {summary}
          </p>
        )}
        
        {isEvent && (eventDate || eventLocation) && (
          <div className="space-y-1 mb-3 text-xs text-gray-500">
            {eventDate && (
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {formatEventDate(eventDate)}
              </div>
            )}
            {eventLocation && (
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {eventLocation}
              </div>
            )}
          </div>
        )}
        
        <Link
          to={`/${isEvent ? 'eventos' : 'noticias'}/${slug}`}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Ler mais →
        </Link>
      </div>
    </div>
  );
}