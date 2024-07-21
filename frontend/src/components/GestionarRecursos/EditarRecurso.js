import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../styles/CrearRecurso.css';
import MessageModal from '../MessageModal';

const EditarRecurso = () => {
  const { id } = useParams();
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaPublicacion, setFechaPublicacion] = useState(new Date().toISOString().slice(0, 10));
  const [tipo, setTipo] = useState('Artículo');
  const [imagen, setImagen] = useState(null);
  const [video, setVideo] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();
  const quillRef = useRef(null);

  useEffect(() => {
    const fetchRecurso = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/recursos-educativos/${id}`);
        const recurso = response.data;
        setNombre(recurso.nombre);
        setDescripcion(recurso.descripcion);
        setFechaPublicacion(recurso.fecha_publicacion);
        setTipo(recurso.tipo);
        setImagen(recurso.imagen);
        setVideo(recurso.video);
        setPdf(recurso.pdf);
      } catch (error) {
        console.error('Error fetching recurso educativo:', error);
      }
    };

    fetchRecurso();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', quillRef.current.getEditor().root.innerHTML);
    formData.append('fecha_publicacion', fechaPublicacion);
    formData.append('tipo', tipo);
    if (imagen) formData.append('imagen', imagen);
    if (video) formData.append('video', video);
    if (pdf) formData.append('pdf', pdf);

    try {
      await axios.put(`http://localhost:3000/api/recursos-educativos/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Recurso educativo actualizado correctamente');
      setMessageType('success');
      setMessageModalOpen(true);
      setTimeout(() => {
        navigate('/gestionar/recursos/listar');
      }, 2000);
    } catch (error) {
      console.error('Error updating recurso educativo:', error);
      if (error.response) {
        setMessage(`Error: ${error.response.data.message}`);
      } else {
        setMessage('Error al actualizar el recurso educativo');
      }
      setMessageType('error');
      setMessageModalOpen(true);
    }
  };

  const closeMessageModal = () => {
    setMessageModalOpen(false);
  };

  return (
    <div className="crear-recurso-container">
      <h2>Editar Recurso Educativo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <ReactQuill ref={quillRef} value={descripcion} onChange={setDescripcion} />
        </div>
        <div>
          <label>Fecha de Publicación:</label>
          <input
            type="date"
            value={fechaPublicacion}
            onChange={(e) => setFechaPublicacion(e.target.value)}
            required
            disabled
          />
        </div>
        <div>
          <label>Tipo:</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
            <option value="artículo">Artículo</option>
            <option value="guía">Guía</option>
            <option value="video">Video</option>
          </select>
        </div>
        <div>
          <label>Subir Imagen:</label>
          <input type="file" onChange={(e) => setImagen(e.target.files[0])} />
        </div>
        <div>
          <label>Subir Video:</label>
          <input type="file" onChange={(e) => setVideo(e.target.files[0])} />
        </div>
        <div>
          <label>Subir PDF:</label>
          <input type="file" onChange={(e) => setPdf(e.target.files[0])} />
        </div>
        <button type="submit">Actualizar</button>
      </form>
      <MessageModal isOpen={messageModalOpen} message={message} onClose={closeMessageModal} type={messageType} />
    </div>
  );
};

export default EditarRecurso;
