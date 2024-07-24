import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import Solicitar from './Solicitar';
import Footer from '../components/Footer';
import Modal from 'react-modal';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog, faShieldDog } from '@fortawesome/free-solid-svg-icons';
import '../styles/Perros.css';


const Perros = () => {
  const { auth, setRedirectPath } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [perros, setPerros] = useState([]);
  const [filters, setFilters] = useState({
    raza: '',
    edad: '',
    tamano: '',
  });
  const [selectedPerroId, setSelectedPerroId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    fetchPerros();
  }, [filters, currentPage, limit]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const perroId = queryParams.get('adoptar');

    if (auth.isAuthenticated && perroId) {
      setSelectedPerroId(perroId);
      setModalIsOpen(true);
      setRedirectPath(null);
    }
  }, [auth.isAuthenticated, location.search]);

  const fetchPerros = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/perros', {
        params: { ...filters, estado: [1, 5], page: currentPage, limit }
      });
      setPerros(response.data.perros || []);
      setTotalPages(response.data.totalPages);
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

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
    setCurrentPage(1);
  };

  const handleAdoptar = (id) => {
    if (!auth.isAuthenticated) {
      setSelectedPerroId(id);
      setLoginPromptOpen(true);
    } else {
      setSelectedPerroId(id);
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPerroId(null);
  };

  const closeLoginPrompt = () => {
    setLoginPromptOpen(false);
    setSelectedPerroId(null);
  };

  const handleLoginRedirect = () => {
    setRedirectPath(`/perros?adoptar=${selectedPerroId}`);
    navigate('/login');
  };

  return (
    <div>
<div className="perros-container">
      <h2>
        <FontAwesomeIcon icon={faShieldDog} /> Perros Disponibles
      </h2>
      <div className="filters">
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
        <label>
          Mostrar por página:
          <input
            type="number"
            value={limit}
            onChange={handleLimitChange}
            min="1"
          />
        </label>
      </div>
      <div className="table-container">
        <table className="perros-table">
          <thead>
            <tr>
              <th></th>
              <th>Perro</th>
              <th>Nombre</th>
              <th>Raza</th>
              <th>Edad</th>
              <th>Tamaño</th>
              <th>Género</th>
              <th>Descripción</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(perros) && perros.map((perro, index) => (
              <tr key={perro.id_perro}>
                <td>{(currentPage - 1) * limit + index + 1}</td>
                <td>
                  {perro.imagen_url && (
                    <img
                      src={`http://localhost:3000/${perro.imagen_url.startsWith('http') ? perro.imagen_url : perro.imagen_url}`}
                      alt={perro.nombre}
                      width="100"
                    />
                  )}
                </td>
                <td>{perro.nombre}</td>
                <td>{perro.raza}</td>
                <td>{perro.edad}</td>
                <td>{perro.tamano}</td>
                <td>{perro.genero}</td>
                <td>{perro.descripcion}</td>
                <td>
                  <button onClick={() => handleAdoptar(perro.id_perro)}>
                    <FontAwesomeIcon icon={faDog} /> Adoptar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Solicitud de Adopción"
        className="Modal"
        overlayClassName="Overlay"
      >
        <Solicitar idAdoptante={auth.id_adoptante} idPerro={selectedPerroId} closeModal={closeModal} />
      </Modal>
      <Modal
        isOpen={loginPromptOpen}
        onRequestClose={closeLoginPrompt}
        contentLabel="Iniciar Sesión"
        className="Modal"
        overlayClassName="Overlay"
      >
        <button className="close-modal-btn" onClick={closeLoginPrompt}>X</button>
        <h2>Por favor, inicie sesión primero</h2>
        <div className="button-container">
          <button onClick={handleLoginRedirect}>
            <FontAwesomeIcon icon={faShieldDog} /> Iniciar Sesión
          </button>
        </div>
      </Modal>
    </div>
    <Footer />
      
    </div>
    
  );
};

export default Perros;
