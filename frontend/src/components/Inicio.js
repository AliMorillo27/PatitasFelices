import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Inicio.css';
import Footer from '../components/Footer';

const Inicio = () => {
  const [dogs, setDogs] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchPerros = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/perros', {
        params: { id_estado: [1, 5] } // Solo mostrar perros disponibles y devueltos
      });
      setDogs(response.data.perros || []);
    } catch (error) {
      console.error('Error fetching perros:', error);
    }
  }, []);

  const handleSolicitud = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    fetchPerros();
  }, [fetchPerros]);

  return (
    <div className="inicio-container">
      <header className="hero">
        <h1>ADOPTA, SALVA UNA VIDA, GANA UN AMIGO</h1>
        <p>Plataforma para la adopción de perros.</p>
        <div className="hero-buttons">
          <button className="solicitud-button" onClick={handleSolicitud}>QUIERO ADOPTAR</button>
        </div>
      </header>
      <section className="dogs-gallery">
        {dogs.length > 0 ? (
          dogs.slice(0, 6).map(dog => (
            <div className="dog-card" key={dog.id_perro}>
              <img
                src={`http://localhost:3000/${dog.imagen_url.startsWith('http') ? dog.imagen_url : dog.imagen_url}`}
                alt={dog.nombre}
                width="100"
              />
              <div className="dog-card-info">
                <h3>{dog.nombre}</h3>
                <p><strong>Género:</strong> {dog.genero}</p>
                <p><strong>Edad:</strong> {dog.edad} años</p>
                <p><strong>Raza:</strong> {dog.raza}</p>
                <p><strong>Tamaño:</strong> {dog.tamano} kgs</p>
                <button className="solicitud-button" onClick={handleSolicitud}>Enviar Solicitud</button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay perros disponibles en este momento.</p>
        )}
      </section>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h2>Regístrese primero para poder adoptar</h2>
            <p>Para enviar una solicitud de adopción, por favor <Link to="/register">regístrese</Link>.</p>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Inicio;
