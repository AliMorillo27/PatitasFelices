import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/VisualizarRecurso.css';

const VisualizarRecurso = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recurso, setRecurso] = useState(null);

  useEffect(() => {
    const fetchRecurso = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/recursos-educativos/${id}`);
        setRecurso(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecurso();
  }, [id]);

  if (!recurso) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="visualizar-recurso-container">
      <div className="media-container">
        {recurso.imagen_url && <img src={`http://localhost:3000/${recurso.imagen_url}`} alt={recurso.nombre} />}
        {recurso.video_url && <video src={`http://localhost:3000/${recurso.video_url}`} controls />}
      </div>
      <div className="texto">
        <h2>{recurso.nombre}</h2>
        <div dangerouslySetInnerHTML={{ __html: recurso.descripcion }} />
        <p><strong>Fecha de Publicación:</strong> {new Date(recurso.fecha_publicacion).toLocaleDateString()}</p>
        <p><strong>Tipo:</strong> {recurso.tipo}</p>
      </div>
      <button className="volver-btn" onClick={() => navigate(-1)}>Volver</button>
    </div>
  );
};

export default VisualizarRecurso;
