import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import '../styles/Navbar.css'; // Asegúrate de ajustar la ruta según la ubicación de tu archivo CSS
import logoImage from '../assets/logo.png'; // Importa la imagen del logo

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const renderLinks = () => {
    if (auth.isAuthenticated) {
      if (auth.userType === 'administrador') {
        return (
          <>
            <li><Link to="/gestionar/perros">Gestionar Perros</Link></li>
            <li><Link to="/gestionar/empleados">Gestionar Empleados</Link></li>
            <li><Link to="/gestionar/adoptantes">Gestionar Adoptantes</Link></li>
            <li><Link to="/gestionar/solicitudes">Gestionar Solicitudes</Link></li>
            <li><Link to="/gestionar/recursos">Gestionar Recursos</Link></li>
            <li><button onClick={logout}>Cerrar Sesión</button></li>
          </>
        );
      } else if (auth.userType === 'empleado') {
        return (
          <>
            <li><Link to="/gestionar/perros">Gestionar Perros</Link></li>
            <li><Link to="/gestionar/adoptantes">Gestionar Adoptantes</Link></li>
            <li><Link to="/gestionar/solicitudes">Gestionar Solicitudes</Link></li>
            <li><Link to="/gestionar/recursos">Gestionar Recursos</Link></li>
            <li><button onClick={logout}>Cerrar Sesión</button></li>
          </>
        );
      } else if (auth.userType === 'adoptante') {
        return (
          <>
            <li><Link to="/perros">Ver Perros</Link></li>
            <li><Link to="/solicitar">Solicitar Adopción</Link></li>
            <li><Link to="/recomendar">Recomendar</Link></li>
            <li><button onClick={logout}>Cerrar Sesión</button></li>
          </>
        );
      }
    } else {
      return (
        <>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/perros">Perros</Link></li>
          <li><Link to="/recomendar-visitante">Recomendar</Link></li>
          <li><Link to="/donar">Donar</Link></li>
          <li><Link to="/contactos">Contactos</Link></li>
          <li><Link to="/nosotros">Nosotros</Link></li>
          <div className="auth-links">
            <li><Link to="/login">Iniciar Sesión</Link></li>
            <li><Link to="/register">Registrarse</Link></li>
          </div>
        </>
      );
    }
  };

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <Link to="/">
            <img src={logoImage} alt="Logo" className="logo-image" />
          </Link>
        </div>
        <div className="menu-icon" onClick={handleToggle}>
          &#9776;
        </div>
        <ul className={`nav-links ${isOpen ? 'nav-active' : ''}`}>
          {renderLinks()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
