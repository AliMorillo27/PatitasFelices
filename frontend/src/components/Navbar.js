import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import '../styles/Navbar.css'; // Asegúrate de ajustar la ruta según la ubicación de tu archivo CSS

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);

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
          <li><Link to="/recursos">Recursos</Link></li>
          <li><Link to="/contactos">Contactos</Link></li>
          <li><Link to="/nosotros">Nosotros</Link></li>
          <li><Link to="/login">Iniciar Sesión</Link></li>
          <li><Link to="/register">Registrarse</Link></li>
        </>
      );
    }
  };

  return (
    <nav>
      <ul>
        {renderLinks()}
      </ul>
    </nav>
  );
};

export default Navbar;
