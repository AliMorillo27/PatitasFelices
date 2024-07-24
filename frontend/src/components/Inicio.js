import React, { useEffect, useState, useCallback, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog, faPaperPlane, faShieldDog } from '@fortawesome/free-solid-svg-icons'; // Importa faShieldDog
import '../styles/Inicio.css';
import Footer from '../components/Footer';
import { AuthContext } from '../AuthContext';
import Solicitar from './Solicitar';
import Modal from 'react-modal';

const Inicio = () => {
  const { auth, setRedirectPath } = useContext(AuthContext);
  const [dogs, setDogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showSolicitudModal, setShowSolicitudModal] = useState(false);
  const [selectedPerroId, setSelectedPerroId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchPerros = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/perros', {
        params: { estado: [1, 5] } // Solo mostrar perros disponibles y devueltos
      });
      setDogs(response.data.perros || []);
    } catch (error) {
      console.error('Error fetching perros:', error);
    }
  }, []);

  useEffect(() => {
    fetchPerros();
  }, [fetchPerros]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const perroId = queryParams.get('adoptar');

    if (auth.isAuthenticated && perroId) {
      setSelectedPerroId(perroId);
      setShowSolicitudModal(true);
      setRedirectPath(null);
    }
  }, [auth.isAuthenticated, location.search]);

  const handleSolicitud = (id) => {
    if (!auth.isAuthenticated) {
      setSelectedPerroId(id);
      setShowModal(true);
    } else {
      setSelectedPerroId(id);
      setShowSolicitudModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setShowSolicitudModal(false);
    setSelectedPerroId(null);
  };

  const handleLoginRedirect = () => {
    setRedirectPath(`/?adoptar=${selectedPerroId}`);
    navigate('/login');
  };

  return (
    <div>
      <div className="inicio-container">
      <header className="hero">
        <h1>ADOPTA, SALVA UNA VIDA, GANA UN AMIGO</h1>
        <p>Plataforma para la adopción de perros.</p>
        <div className="hero-buttons">
          <button className="solicitud-button" onClick={() => navigate('/perros')}>
            <FontAwesomeIcon icon={faDog} /> QUIERO ADOPTAR
          </button>
        </div>
      </header>
      <section className="dogs-gallery">
        {dogs.length > 0 ? (
          dogs.slice(0, 8).map(dog => (
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
                <button className="solicitud-button" onClick={() => handleSolicitud(dog.id_perro)}>
                  <FontAwesomeIcon icon={faPaperPlane} /> Enviar Solicitud
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay perros disponibles en este momento.</p>
        )}
      </section>
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Iniciar Sesión"
        className="Modal"
        overlayClassName="Overlay"
      >
        <button className="close-modal-btn" onClick={closeModal}>X</button>
        <h2>Por favor, inicie sesión primero</h2>
        <div className="button-container">
          <button onClick={handleLoginRedirect}>
            <FontAwesomeIcon icon={faShieldDog} /> Iniciar Sesión
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={showSolicitudModal}
        onRequestClose={closeModal}
        contentLabel="Solicitud de Adopción"
        className="Modal"
        overlayClassName="Overlay"
      >
        <Solicitar idAdoptante={auth.id_adoptante} idPerro={selectedPerroId} closeModal={closeModal} />
      </Modal>
      
    </div>
    <Footer />
    </div>
  );
};

export default Inicio;
