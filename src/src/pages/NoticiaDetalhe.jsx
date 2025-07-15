import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadNoticiasFromFiles } from '../utils/loadNoticias';

export default function NoticiaDetalhe() {
  const { slug } = useParams();
  const [noticia, setNoticia] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const todas = await loadNoticiasFromFiles();
      const artigo = todas.find(n => n.slug === slug);
      setNoticia(artigo || null);
    };
    fetchData();
  }, [slug]);

  if (!noticia) {
    return <div className="p-8 text-center text-gray-500">Notícia não encontrada.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{noticia.title}</h1>
      <p className="text-gray-500 mb-6">{new Date(noticia.date).toLocaleDateString('pt-PT')}</p>
      <div className="prose prose-lg">
        <p>{noticia.content}</p>
      </div>
    </div>
  );
}
