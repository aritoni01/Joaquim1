import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NoticiaDetalhe from './pages/NoticiaDetalhe';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/noticia/:slug" element={<NoticiaDetalhe />} />
    </Routes>
  );
}
