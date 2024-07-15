import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Solicitar = ({ idAdoptante, idPerro }) => {
  const [form, setForm] = useState({
    id_perro: idPerro || '',
    id_adoptante: idAdoptante,
    comentario: '',
    descripcion: '',
    estado: 'pendiente',
    rechazado_por_devolucion: false,
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!form.id_perro) {
      newErrors.id_perro = 'El perro es obligatorio.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/solicitudes-adopcion', form);
      alert('Solicitud enviada correctamente');
      setForm({
        id_perro: '',
        id_adoptante: idAdoptante,
        comentario: '',
        descripcion: '',
        estado: 'pendiente',
        rechazado_por_devolucion: false,
      });
    } catch (error) {
      console.error('Error sending solicitud:', error.response ? error.response.data : error.message);
      if (error.response) {
        setErrors({ server: error.response.data.message });
      }
    }
  };

  return (
    <div>
      <h2>Solicitar Adopción</h2>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Comentario</label>
          <input
            type="text"
            value={form.comentario}
            onChange={(e) => setForm({ ...form, comentario: e.target.value })}
          />
        </div>
        <div>
          <label>Descripción</label>
          <input
            type="text"
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
          />
        </div>
        <button type="submit">Enviar Solicitud</button>
      </form>
    </div>
  );
};

export default Solicitar;
