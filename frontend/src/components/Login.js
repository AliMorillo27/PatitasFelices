import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import '../styles/Login.css'; // Importa tu archivo de estilos CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/usuarios/login', { email, contrasena });
      const { tipo, id_usuario } = response.data; // Obtener id_usuario de la respuesta de inicio de sesión
      
      if (tipo === 'adoptante') {
        // Solo intentar obtener id_adoptante si el usuario es un adoptante
        try {
          const adoptanteResponse = await axios.get(`http://localhost:3000/api/adoptantes/usuario/${id_usuario}`);
          const { id_adoptante } = adoptanteResponse.data; // Obtener id_adoptante de la respuesta
          console.log('Login response:', response.data);  // Verificar respuesta de inicio de sesión
          console.log('Adoptante response:', adoptanteResponse.data);  // Verificar respuesta de adoptante
          login(tipo, id_adoptante);
        } catch (adoptanteError) {
          console.error('Error al obtener adoptante:', adoptanteError.response?.data || adoptanteError.message);
          alert('Error al obtener adoptante');
        }
      } else {
        // Si no es un adoptante, no intentar obtener el id_adoptante
        login(tipo, null);
      }
      
      navigate('/');
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response?.data || error.message);
      alert('Email o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Correo Electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
      />
      <button onClick={handleLogin}>Iniciar Sesión</button>
    </div>
  );
};

export default Login;
