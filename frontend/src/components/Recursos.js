import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Recursos.css';

const Recursos = () => {
  const [recursos, setRecursos] = useState([]);

  useEffect(() => {
    const fetchRecursos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/recursos-educativos');
        setRecursos(response.data.recursos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecursos();
  }, []);

  return (
    <div className="recursos-container">
      <h1 className="titulo-principal">Recursos para el Cuidado de Perros</h1>
      <div className="recursos-grid">
        {recursos.map((recurso, index) => (
          <div className="recurso-card" key={index}>
            {recurso.imagen_url && (
              <div className="imagen">
                <img
                  src={`http://localhost:3000/${recurso.imagen_url.startsWith('http') ? recurso.imagen_url : recurso.imagen_url}`}
                  alt={recurso.nombre}
                  className="imagen-recurso"
                />
              </div>
            )}
            {recurso.video_url && (
              <div className="video">
                <video
                  src={`http://localhost:3000/${recurso.video_url.startsWith('http') ? recurso.video_url : recurso.video_url}`}
                  className="video-recurso"
                  controls
                />
              </div>
            )}
            <div className="texto">
              <h2>{recurso.nombre}</h2>
              <div dangerouslySetInnerHTML={{ __html: recurso.descripcion.substring(0, 100) + '...' }} />
              <Link to={`/recursos/${recurso.id_recurso}`} className="ver-mas">Ver más</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recursos;
