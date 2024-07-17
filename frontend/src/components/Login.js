import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import '../styles/Login.css'; // Asegúrate de tener un archivo CSS separado para los estilos

const Login = () => {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/usuarios/login', { email, contrasena });
      const { tipo, id_usuario } = response.data;

      if (tipo === 'adoptante') {
        try {
          const adoptanteResponse = await axios.get(`http://localhost:3000/api/adoptantes/usuario/${id_usuario}`);
          const { id_adoptante } = adoptanteResponse.data;
          login(tipo, id_adoptante);
        } catch (adoptanteError) {
          console.error('Error al obtener adoptante:', adoptanteError.response?.data || adoptanteError.message);
          alert('Error al obtener adoptante');
        }
      } else {
        login(tipo, null);
      }

      navigate('/');
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response?.data || error.message);
      alert('Email o contraseña incorrectos');
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
      </div>
    </div>
  );
};

export default Login;
