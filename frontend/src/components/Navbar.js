import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import '../styles/Navbar.css'; // Asegúrate de ajustar la ruta según la ubicación de tu archivo CSS

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const [dropdown, setDropdown] = useState(null);

  const handleDropdown = (menu) => {
    setDropdown(dropdown === menu ? null : menu);
  };

  const renderLinks = () => {
    if (auth.isAuthenticated) {
      if (auth.userType === 'administrador') {
        return (
          <>
            <li>
              <button onClick={() => handleDropdown('perros')}>Gestionar Perros</button>
              {dropdown === 'perros' && (
                <ul className="dropdown-menu">
                  <li><Link to="/gestionar/perros/crear">Crear</Link></li>
                  <li><Link to="/gestionar/perros/listar">Listar</Link></li>
                </ul>
              )}
            </li>
            <li>
              <button onClick={() => handleDropdown('empleados')}>Gestionar Empleados</button>
              {dropdown === 'empleados' && (
                <ul className="dropdown-menu">
                  <li><Link to="/gestionar/empleados/crear">Crear</Link></li>
                  <li><Link to="/gestionar/empleados/listar">Listar</Link></li>
                </ul>
              )}
            </li>
            <li>
              <button onClick={() => handleDropdown('adoptantes')}>Gestionar Adoptantes</button>
              {dropdown === 'adoptantes' && (
                <ul className="dropdown-menu">
                  <li><Link to="/gestionar/adoptantes/crear">Crear</Link></li>
                  <li><Link to="/gestionar/adoptantes/listar">Listar</Link></li>
                </ul>
              )}
            </li>
            <li>
              <button onClick={() => handleDropdown('solicitudes')}>Gestionar Solicitudes</button>
              {dropdown === 'solicitudes' && (
                <ul className="dropdown-menu">
                  <li><Link to="/gestionar/solicitudes/crear">Crear</Link></li>
                  <li><Link to="/gestionar/solicitudes/listar">Listar</Link></li>
                </ul>
              )}
            </li>
            <li>
              <button onClick={() => handleDropdown('recursos')}>Gestionar Recursos</button>
              {dropdown === 'recursos' && (
                <ul className="dropdown-menu">
                  <li><Link to="/gestionar/recursos/crear">Crear</Link></li>
                  <li><Link to="/gestionar/recursos/listar">Listar</Link></li>
                </ul>
              )}
            </li>
            <li><button onClick={logout}>Cerrar Sesión</button></li>
          </>
        );
      } else if (auth.userType === 'empleado') {
        return (
          <>
            <li>
              <button onClick={() => handleDropdown('perros')}>Gestionar Perros</button>
              {dropdown === 'perros' && (
                <ul className="dropdown-menu">
                  <li><Link to="/gestionar/perros/crear">Crear</Link></li>
                  <li><Link to="/gestionar/perros/listar">Listar</Link></li>
                </ul>
              )}
            </li>
            <li>
              <button onClick={() => handleDropdown('adoptantes')}>Gestionar Adoptantes</button>
              {dropdown === 'adoptantes' && (
                <ul className="dropdown-menu">
                  <li><Link to="/gestionar/adoptantes/crear">Crear</Link></li>
                  <li><Link to="/gestionar/adoptantes/listar">Listar</Link></li>
                </ul>
              )}
            </li>
            <li>
              <button onClick={() => handleDropdown('solicitudes')}>Gestionar Solicitudes</button>
              {dropdown === 'solicitudes' && (
                <ul className="dropdown-menu">
                  <li><Link to="/gestionar/solicitudes/crear">Crear</Link></li>
                  <li><Link to="/gestionar/solicitudes/listar">Listar</Link></li>
                </ul>
              )}
            </li>
            <li>
              <button onClick={() => handleDropdown('recursos')}>Gestionar Recursos</button>
              {dropdown === 'recursos' && (
                <ul className="dropdown-menu">
                  <li><Link to="/gestionar/recursos/crear">Crear</Link></li>
                  <li><Link to="/gestionar/recursos/listar">Listar</Link></li>
                </ul>
              )}
            </li>
            <li><button onClick={logout}>Cerrar Sesión</button></li>
          </>
        );
      } else if (auth.userType === 'adoptante') {
        return (
          <>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/perros">Perros</Link></li>
            <li><Link to="/solicitar">Solicitar Adopción</Link></li>
            <li><Link to="/recomendar">Recomendar</Link></li>
            <li><Link to="/recursos">Recursos</Link></li>
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
