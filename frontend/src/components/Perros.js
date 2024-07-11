import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Solicitar from './Solicitar'; // Importar el componente Solicitar

const Perros = ({ idAdoptante }) => {
  const [perros, setPerros] = useState([]);
  const [filters, setFilters] = useState({
    raza: '',
    edad: '',
    tamano: '',
  });
  const [selectedPerroId, setSelectedPerroId] = useState(null);

  useEffect(() => {
    fetchPerros();
  }, [filters]);

  const fetchPerros = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/perros', {
        params: { ...filters, id_estado: [1, 5] } // Solo mostrar perros disponibles y devueltos
      });
      setPerros(response.data.perros || []);
    } catch (error) {
      console.error('Error fetching perros:', error);
    }
  };

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdoptar = (id) => {
    setSelectedPerroId(id); // Establecer el ID del perro seleccionado para la adopción
  };

  return (
    <div>
      <h2>Perros Disponibles</h2>
      <div>
        <label>
          Raza:
          <input type="text" name="raza" value={filters.raza} onChange={handleChange} />
        </label>
        <label>
          Edad:
          <input type="number" name="edad" value={filters.edad} onChange={handleChange} />
        </label>
        <label>
          Tamaño:
          <input type="text" name="tamano" value={filters.tamano} onChange={handleChange} />
        </label>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Raza</th>
            <th>Edad</th>
            <th>Tamaño</th>
            <th>Género</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(perros) && perros.map(perro => (
            <tr key={perro.id_perro}>
              <td>{perro.nombre}</td>
              <td>{perro.raza}</td>
              <td>{perro.edad}</td>
              <td>{perro.tamano}</td>
              <td>{perro.genero}</td>
              <td>{perro.descripcion}</td>
              <td>
                <button onClick={() => handleAdoptar(perro.id_perro)}>Adoptar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedPerroId && (
        <Solicitar idAdoptante={idAdoptante} idPerro={selectedPerroId} />
      )}
    </div>
  );
};

export default Perros;
