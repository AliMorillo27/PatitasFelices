import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import MessageModal from './MessageModal';
import '../styles/Login.css';
import welcomeImage from '../assets/logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('');
  const [modalImage, setModalImage] = useState(null);
  const navigate = useNavigate();
  const { auth, login, redirectPath, setRedirectPath } = useContext(AuthContext);

  useEffect(() => {
    if (auth.isAuthenticated) {
      if (redirectPath) {
        navigate(redirectPath);
        setRedirectPath(null);
      } else {
        navigate('/');
      }
    }
  }, [auth.isAuthenticated, redirectPath, navigate, setRedirectPath]);

  const handleLogin = async () => {
    try {
      console.log('Datos de inicio de sesión:', { email, contrasena });
      const response = await axios.post('http://localhost:3000/api/usuarios/login', { email, contrasena });
      const { tipo, id_usuario, id_adoptante } = response.data;

      if (id_adoptante) {
        console.log('ID Adoptante:', id_adoptante);
      }

      setModalMessage('Bienvenido a Patitas Felices');
      setModalOpen(true);
      setModalType('welcome');
      setModalImage(welcomeImage);
      setTimeout(() => {
        setModalOpen(false);
        login(tipo, id_usuario, id_adoptante);
      }, 2500);
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response ? error.response.data : error.message);
      setModalMessage('Email o contraseña incorrectos');
      setModalOpen(true);
      setModalType('error');
      setModalImage(null);
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <h2 className="login-title">Iniciar Sesión</h2>
        <div className="login-icon"></div>
        <input
          className="login-input"
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>Iniciar Sesión</button>
        <div className="register-link-container">
          <Link to="/register" className="register-link">Crear cuenta</Link>
          <Link to="/recuperar-contrasena" className="register-link">Recuperar contraseña</Link>
        </div>
      </div>
      <MessageModal isOpen={modalOpen} message={modalMessage} onClose={() => setModalOpen(false)} type={modalType} image={modalImage} />
    </div>
  );
};

export default Login;
