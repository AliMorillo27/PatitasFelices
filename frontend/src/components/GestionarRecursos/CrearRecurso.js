import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../styles/CrearRecurso.css';
import MessageModal from '../MessageModal'; // Asegúrate de que la ruta sea correcta

const CrearRecurso = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipo, setTipo] = useState('artículo');
  const [imagen, setImagen] = useState(null);
  const [video, setVideo] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' o 'error'
  const navigate = useNavigate();

  const quillRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', quillRef.current.getEditor().root.innerHTML);
    formData.append('fecha_publicacion', new Date().toISOString().slice(0, 10)); // Fecha del sistema
    formData.append('tipo', tipo);
    if (imagen) formData.append('imagen', imagen);
    if (video) formData.append('video', video);
    if (pdf) formData.append('pdf', pdf);

    try {
      await axios.post('http://localhost:3000/api/recursos-educativos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Recurso educativo creado correctamente');
      setMessageType('success');
      setMessageModalOpen(true);
      setTimeout(() => {
        setMessageModalOpen(false);
        navigate('/gestionar/recursos/listar');
      }, 2500); // Cerrar el modal después de 2.5 segundos
    } catch (error) {
      console.error('Error creating recurso educativo:', error);
      if (error.response) {
        setMessage(`Error: ${error.response.data.message}`);
        setMessageType('error');
        setMessageModalOpen(true);
      }
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const closeMessageModal = () => {
    setMessageModalOpen(false);
  };

  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      [{ 'color': [] }, { 'background': [] }], // Agregar opciones de color y fondo
      [{ 'align': [] }], // Agregar opciones de alineación
      ['clean'] // eliminar todas las opciones de formato
    ],
  };

  return (
    <div className="crear-recurso-container">
      <h2>Crear Recurso Educativo</h2>
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
          <ReactQuill ref={quillRef} value={descripcion} onChange={setDescripcion} modules={modules} />
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
        <div className="button-container">
          <button type="submit">Crear</button>
          <button type="button" onClick={handleCancel} className="cancelar-btn">Cancelar</button>
        </div>
      </form>
      <MessageModal isOpen={messageModalOpen} message={message} onClose={closeMessageModal} type={messageType} />
    </div>
  );
};

export default CrearRecurso;
