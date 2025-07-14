import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Newspaper, MapPin, Computer } from 'lucide-react';
import { loadConfig, loadContent } from '../utils/contentLoader';
import NewsCard from '../components/NewsCard';

const iconMap = {
  newspaper: Newspaper,
  calendar: Calendar,
  computer: Computer,
  map: MapPin
};

export default function Homepage() {
  const [homepageConfig, setHomepageConfig] = useState(null);
  const [siteConfig, setSiteConfig] = useState(null);
  const [recentNews, setRecentNews] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHomepageData();
  }, []);

  const loadHomepageData = async () => {
    try {
      setLoading(true);
      
      const [homepage, site, news] = await Promise.all([
        loadConfig('homepage'),
        loadConfig('site'),
        loadContent('noticias', { published: true, limit: 6 })
      ]);

      setHomepageConfig(homepage);
      setSiteConfig(site);
      
      // Separar notícias e eventos
      const newsItems = news.filter(item => !item.frontmatter.isEvent);
      const eventItems = news.filter(item => item.frontmatter.isEvent);
      
      setRecentNews(newsItems.slice(0, 3));
      setUpcomingEvents(eventItems.slice(0, 3));
      
    } catch (error) {
      console.error('Erro ao carregar dados da homepage:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">A carregar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Secção Hero */}
      <section className="relative h-96 bg-gradient-to-r from-blue-600 to-blue-800 flex items-center">
        {homepageConfig?.heroImage && (
          <div className="absolute inset-0">
            <img
              src={homepageConfig.heroImage}
              alt="Castelo de Paiva"
              className="w-full h-full object-cover opacity-30"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
        <div className="relative container mx-auto px-4 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {homepageConfig?.heroTitle || 'Bem-vindos a Castelo de Paiva'}
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              {homepageConfig?.heroSubtitle || 'Descubra a beleza natural, a rica história e as tradições do nosso município.'}
            </p>
            <Link
              to="/noticias"
              className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Ver Notícias
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Secções em Destaque */}
      {homepageConfig?.featuredSections && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Explore Castelo de Paiva
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {homepageConfig.featuredSections.map((section, index) => {
                const IconComponent = iconMap[section.icon] || Newspaper;
                return (
                  <Link
                    key={index}
                    to={section.link}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-center group"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 group-hover:bg-blue-200 transition-colors">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {section.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Notícias Recentes */}
      {recentNews.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Notícias Recentes
              </h2>
              <Link
                to="/noticias"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                Ver todas
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentNews.map((item, index) => (
                <NewsCard key={index} item={item} variant="default" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Próximos Eventos */}
      {upcomingEvents.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Próximos Eventos
              </h2>
              <Link
                to="/eventos"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                Ver todos
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((item, index) => (
                <NewsCard key={index} item={item} variant="default" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Informações de Contacto */}
      {siteConfig && (
        <section className="py-16 bg-blue-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Contactos</h3>
                <div className="space-y-2 text-blue-100">
                  <p>{siteConfig.phone}</p>
                  <p>{siteConfig.contactEmail}</p>
                  <div className="mt-4">
                    <p className="whitespace-pre-line">{siteConfig.address}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">Sobre o Município</h3>
                <p className="text-blue-100">
                  {siteConfig.description}
                </p>
              </div>
              
              {siteConfig.social && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Redes Sociais</h3>
                  <div className="space-y-2">
                    {siteConfig.social.facebook && (
                      <a
                        href={siteConfig.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-100 hover:text-white transition-colors"
                      >
                        Facebook
                      </a>
                    )}
                    {siteConfig.social.instagram && (
                      <a
                        href={siteConfig.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-100 hover:text-white transition-colors"
                      >
                        Instagram
                      </a>
                    )}
                    {siteConfig.social.twitter && (
                      <a
                        href={siteConfig.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-100 hover:text-white transition-colors"
                      >
                        Twitter
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}