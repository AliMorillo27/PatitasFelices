import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import Solicitar from './Solicitar';
import MessageModal from './MessageModal'; // Importa el componente MessageModal
import '../styles/RecomendarVisitante.css'; // Importa el archivo CSS

const RecomendarVisitante = () => {
  const { auth, setRedirectPath } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [numRecommendations, setNumRecommendations] = useState(1);
  const [preferences, setPreferences] = useState({
    tiene_ninos: '',
    tiene_mascota: '',
    nivel_actividad: '',
    nivel_energia: '',
    tamano_perro_preferido: '',
    experiencia_con_perros: ''
  });
  const [recommendations, setRecommendations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('');
  const [modalImage, setModalImage] = useState(null);
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const [selectedPerroId, setSelectedPerroId] = useState(null);
  const [showSolicitudModal, setShowSolicitudModal] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const perroId = queryParams.get('adoptar');

    if (auth.isAuthenticated && perroId) {
      setSelectedPerroId(perroId);
      setShowSolicitudModal(true);
      setRedirectPath(null);
    }
  }, [auth.isAuthenticated, location.search]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPreferences({
      ...preferences,
      [name]: value
    });
  };

  const handleRecommend = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/recomendar-visitante', {
        preferences,
        numRecommendations: parseInt(numRecommendations, 10),
      });
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setModalMessage('Error al obtener recomendaciones');
      setModalType('error');
      setModalOpen(true);
    }
  };

  const handleAdoptar = (id) => {
    if (!auth.isAuthenticated) {
      setSelectedPerroId(id);
      setLoginPromptOpen(true);
    } else {
      setSelectedPerroId(id);
      setShowSolicitudModal(true);
    }
  };

  const closeLoginPrompt = () => {
    setLoginPromptOpen(false);
    setSelectedPerroId(null);
  };

  const closeSolicitudModal = () => {
    setShowSolicitudModal(false);
    setSelectedPerroId(null);
  };

  const handleLoginRedirect = () => {
    setRedirectPath(`/recomendar-visitante?adoptar=${selectedPerroId}`);
    navigate('/login');
  };

  return (
    <div className="recomendar-container">
      <h1>Recomendar un Perro</h1>
      <div>
        <label>
          Tiene niños:
          <select name="tiene_ninos" value={preferences.tiene_ninos} onChange={handleInputChange}>
            <option value="">Seleccione</option>
            <option value="SI">Sí</option>
            <option value="NO">No</option>
          </select>
        </label>
        <label>
          Tiene mascota:
          <select name="tiene_mascota" value={preferences.tiene_mascota} onChange={handleInputChange}>
            <option value="">Seleccione</option>
            <option value="SI">Sí</option>
            <option value="NO">No</option>
          </select>
        </label>
        <label>
          Nivel de actividad:
          <select name="nivel_actividad" value={preferences.nivel_actividad} onChange={handleInputChange}>
            <option value="">Seleccione</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <label>
          Nivel de energía:
          <select name="nivel_energia" value={preferences.nivel_energia} onChange={handleInputChange}>
            <option value="">Seleccione</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <label>
          Tamaño del perro preferido:
          <select name="tamano_perro_preferido" value={preferences.tamano_perro_preferido} onChange={handleInputChange}>
            <option value="">Seleccione</option>
            <option value="PEQUEÑO">Pequeño</option>
            <option value="MEDIANO">Mediano</option>
            <option value="GRANDE">Grande</option>
          </select>
        </label>
        <label>
          Experiencia con perros:
          <select name="experiencia_con_perros" value={preferences.experiencia_con_perros} onChange={handleInputChange}>
            <option value="">Seleccione</option>
            <option value="PRINCIPIANTE">Principiante</option>
            <option value="INTERMEDIO">Intermedio</option>
            <option value="EXPERTO">Experto</option>
          </select>
        </label>
        <label htmlFor="numRecommendations">Número de Recomendaciones:</label>
        <input
          type="number"
          id="numRecommendations"
          value={numRecommendations}
          onChange={(e) => setNumRecommendations(e.target.value)}
          min="1"
          placeholder="Número de Recomendaciones"
        />
        <button className="recomendar-button" onClick={handleRecommend}>Recomendar</button>
      </div>

      {recommendations.length > 0 && (
        <ul>
          {recommendations.map((rec, index) => (
            <li key={index}>
              <img src={rec.imagen_url} alt={rec.nombre} />
              <p>Nombre: {rec.nombre}</p>
              <p>Edad: {rec.edad}</p>
              <p>Raza: {rec.raza}</p>
              <p>Tamaño: {rec.tamano}</p>
              <p>Género: {rec.genero}</p>
              <p>Puntaje de Similitud: {rec.puntaje_similitud}</p>
              <div className="similarity-bar-container">
                <div className="similarity-bar" style={{ width: `${rec.puntaje_similitud * 100}%` }}></div>
              </div>
              <button onClick={() => handleAdoptar(rec.id_perro)}>Adoptar</button>
            </li>
          ))}
        </ul>
      )}

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
          <button onClick={handleLoginRedirect}>Iniciar Sesión</button>
          <button className="close-btn" onClick={closeLoginPrompt}>Cerrar</button>
        </div>
      </Modal>

      <Modal
        isOpen={showSolicitudModal}
        onRequestClose={closeSolicitudModal}
        contentLabel="Solicitud de Adopción"
        className="Modal"
        overlayClassName="Overlay"
      >
        <Solicitar idAdoptante={auth.id_adoptante} idPerro={selectedPerroId} closeModal={closeSolicitudModal} />
      </Modal>

      <MessageModal isOpen={modalOpen} message={modalMessage} onClose={() => setModalOpen(false)} type={modalType} image={modalImage} />
    </div>
  );
};

export default RecomendarVisitante;
