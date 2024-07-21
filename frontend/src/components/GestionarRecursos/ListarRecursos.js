import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/ListarRecursos.css';
import MessageModal from '../MessageModal';

const ListarRecursos = () => {
  const [recursos, setRecursos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState('');
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecursos = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/recursos-educativos?page=${currentPage}&limit=${limit}&tipo=${filter}`);
        setRecursos(response.data.recursos);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching recursos:', error);
      }
    };

    fetchRecursos();
  }, [currentPage, limit, filter]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/recursos-educativos/${id}`);
      setMessage('Recurso educativo eliminado correctamente');
      setMessageModalOpen(true);
      setRecursos(recursos.filter(recurso => recurso.id_recurso !== id));
    } catch (error) {
      console.error('Error deleting recurso:', error);
      setMessage('Error eliminando el recurso educativo');
      setMessageModalOpen(true);
    }
  };

  const closeMessageModal = () => {
    setMessageModalOpen(false);
  };

  return (
    <div className="listar-recursos-container">
      <h2>Listar Recursos Educativos</h2>
      <div className="filters-container">
        <div className="filter">
          <label>Filtrar por tipo:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">Todos</option>
            <option value="guía">Guía</option>
            <option value="artículo">Artículo</option>
            <option value="video">Video</option>
          </select>
        </div>
        <div className="filter">
          <label>Mostrar por página:</label>
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            min="1"
          />
        </div>
        <div>
          <button onClick={() => navigate('/gestionar/recursos/crear')} className="crear-btn">Crear Recurso</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Fecha de Publicación</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {recursos.map((recurso) => (
            <tr key={recurso.id_recurso}>
              <td>{recurso.nombre}</td>
              <td>{recurso.tipo}</td>
              <td>{recurso.fecha_publicacion}</td>
              <td>{recurso.descripcion}</td>
              <td>
                <button onClick={() => navigate(`/gestionar/recursos/editar/${recurso.id_recurso}`)}>Editar</button>
                <button onClick={() => handleDelete(recurso.id_recurso)} className="eliminar-btn">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={index + 1 === currentPage ? 'active' : ''}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <MessageModal isOpen={messageModalOpen} message={message} onClose={closeMessageModal} />
    </div>
  );
};

export default ListarRecursos;
