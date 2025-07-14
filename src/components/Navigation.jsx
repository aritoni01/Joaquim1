import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { loadConfig } from '../utils/contentLoader';

export default function Navigation() {
  const [navigation, setNavigation] = useState(null);
  const [siteConfig, setSiteConfig] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const location = useLocation();

  useEffect(() => {
    loadNavigationData();
  }, []);

  const loadNavigationData = async () => {
    try {
      const [navData, siteData] = await Promise.all([
        loadConfig('navigation'),
        loadConfig('site')
      ]);
      
      setNavigation(navData);
      setSiteConfig(siteData);
    } catch (error) {
      console.error('Erro ao carregar navegação:', error);
    }
  };

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  const isActiveLink = (url) => {
    if (url === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(url);
  };

  if (!navigation || !siteConfig) {
    return (
      <nav className="bg-blue-900 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl">Carregando...</div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Nome do Site */}
          <Link 
            to="/" 
            className="font-bold text-xl hover:text-blue-200 transition-colors"
          >
            {siteConfig.siteName}
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-1">
            {navigation.mainMenu?.map((item, index) => (
              <div key={index} className="relative group">
                {item.submenu ? (
                  <div className="relative">
                    <button
                      className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition-colors flex items-center ${
                        isActiveLink(item.url) ? 'bg-blue-800' : ''
                      }`}
                    >
                      {item.title}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    
                    {/* Submenu */}
                    <div className="absolute left-0 mt-1 w-48 bg-white text-gray-900 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="py-1">
                        {item.submenu.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.url}
                            className={`block px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                              isActiveLink(subItem.url) ? 'bg-blue-50 text-blue-900' : ''
                            }`}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.url}
                    className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition-colors ${
                      isActiveLink(item.url) ? 'bg-blue-800' : ''
                    }`}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Botão Menu Mobile */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden bg-blue-800">
            {navigation.mainMenu?.map((item, index) => (
              <div key={index}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(index)}
                      className="w-full text-left px-4 py-3 hover:bg-blue-700 flex justify-between items-center"
                    >
                      {item.title}
                      <ChevronDown 
                        className={`h-4 w-4 transition-transform ${
                          openSubmenu === index ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    {openSubmenu === index && (
                      <div className="bg-blue-700">
                        {item.submenu.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.url}
                            className="block px-8 py-2 hover:bg-blue-600"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.url}
                    className={`block px-4 py-3 hover:bg-blue-700 ${
                      isActiveLink(item.url) ? 'bg-blue-700' : ''
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}