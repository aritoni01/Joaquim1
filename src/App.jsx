import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Homepage from './pages/Homepage';
import NewsPage from './pages/NewsPage';
import NewsDetail from './pages/NewsDetail';

// Páginas de eventos (mesmo componente que notícias, mas com filtro específico)
function EventsPage() {
  return <NewsPage initialFilter={{ selectedType: 'events' }} />;
}

// Página 404
function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-gray-600 mb-6">Página não encontrada</p>
        <a
          href="/"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Voltar à página inicial
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <main>
          <Routes>
            {/* Página Principal */}
            <Route path="/" element={<Homepage />} />
            
            {/* Notícias */}
            <Route path="/noticias" element={<NewsPage />} />
            <Route path="/noticias/:slug" element={<NewsDetail />} />
            
            {/* Eventos */}
            <Route path="/eventos" element={<EventsPage />} />
            <Route path="/eventos/:slug" element={<NewsDetail />} />
            
            {/* Páginas placeholder para as outras rotas do menu */}
            <Route path="/municipio" element={<PlaceholderPage title="Município" />} />
            <Route path="/municipio/*" element={<PlaceholderPage title="Município" />} />
            <Route path="/servicos" element={<PlaceholderPage title="Serviços" />} />
            <Route path="/servicos/*" element={<PlaceholderPage title="Serviços" />} />
            <Route path="/turismo" element={<PlaceholderPage title="Turismo" />} />
            <Route path="/turismo/*" element={<PlaceholderPage title="Turismo" />} />
            <Route path="/contactos" element={<PlaceholderPage title="Contactos" />} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 mt-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">Castelo de Paiva</h3>
                <p className="text-gray-400 text-sm">
                  Portal oficial do Município de Castelo de Paiva
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Links Úteis</h4>
                <div className="space-y-2 text-sm">
                  <a href="/noticias" className="block text-gray-400 hover:text-white transition-colors">
                    Notícias
                  </a>
                  <a href="/eventos" className="block text-gray-400 hover:text-white transition-colors">
                    Eventos
                  </a>
                  <a href="/servicos" className="block text-gray-400 hover:text-white transition-colors">
                    Serviços
                  </a>
                  <a href="/contactos" className="block text-gray-400 hover:text-white transition-colors">
                    Contactos
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Administração</h4>
                <a
                  href="/admin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Painel de Administração
                </a>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
              <p className="text-gray-400 text-sm">
                © 2025 Município de Castelo de Paiva. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

// Componente placeholder para páginas que ainda não foram implementadas
function PlaceholderPage({ title }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          <p className="text-gray-600 mb-8">
            Esta página está em desenvolvimento e estará disponível em breve.
          </p>
          <a
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Voltar à página inicial
          </a>
        </div>
      </div>
    </div>
  );
}
