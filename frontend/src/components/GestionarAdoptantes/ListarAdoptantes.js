import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListarAdoptantes = () => {
  const [adoptantes, setAdoptantes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    nombre: '',
    apellido: '',
    cedula: ''
  });
  const navigate = useNavigate();

  const fetchAdoptantes = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/adoptantes', {
        params: { page: currentPage, ...filters }
      });
      setAdoptantes(response.data.adoptantes);
      setTotalPages(response.data.totalPages);
      console.log('Adoptantes Data:', response.data);
    } catch (error) {
      console.error('Error fetching adoptantes:', error);
    }
  }, [currentPage, filters]);

  useEffect(() => {
    fetchAdoptantes();
  }, [fetchAdoptantes]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (id) => {
    navigate(`/gestionar/adoptantes/editar/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/adoptantes/${id}`);
      fetchAdoptantes();
    } catch (error) {
      console.error('Error deleting adoptante:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Adoptantes</h2>
      <button onClick={() => navigate('/gestionar/adoptantes/crear')}>Crear Nuevo</button>
      <div>
        <label>
          Nombre:
          <input type="text" name="nombre" value={filters.nombre} onChange={handleFilterChange} />
        </label>
        <label>
          Apellido:
          <input type="text" name="apellido" value={filters.apellido} onChange={handleFilterChange} />
        </label>
        <label>
          Cédula:
          <input type="text" name="cedula" value={filters.cedula} onChange={handleFilterChange} />
        </label>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Cédula</th>
            <th>Género</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Edad</th>
            <th>Tiene niños</th>
            <th>Tiene mascota</th>
            <th>Nivel de actividad</th>
            <th>Nivel de energía</th>
            <th>Tamaño de perro preferido</th>
            <th>Experiencia con perros</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {adoptantes.map(adoptante => (
            <tr key={adoptante.id_adoptante}>
              <td>{adoptante.nombre}</td>
              <td>{adoptante.apellido}</td>
              <td>{adoptante.cedula}</td>
              <td>{adoptante.genero}</td>
              <td>{adoptante.direccion}</td>
              <td>{adoptante.telefono}</td>
              <td>{adoptante.email}</td>
              <td>{adoptante.edad}</td>
              <td>{adoptante.tiene_ninos}</td>
              <td>{adoptante.tiene_mascota}</td>
              <td>{adoptante.nivel_actividad}</td>
              <td>{adoptante.nivel_energia}</td>
              <td>{adoptante.tamano_perro_preferido}</td>
              <td>{adoptante.experiencia_con_perros}</td>
              <td>
                <button onClick={() => handleEdit(adoptante.id_adoptante)}>Editar</button>
                <button onClick={() => handleDelete(adoptante.id_adoptante)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListarAdoptantes;
