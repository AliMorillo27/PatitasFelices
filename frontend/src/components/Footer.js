import React from 'react';
import '../styles/Footer.css';
import logo from '../assets/logo.png'; // Asegúrate de que la ruta sea correcta
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const handleHelpClick = () => {
    window.open('https://enlace-de-ayuda.com', '_blank'); // Abre el enlace en una nueva pestaña
  };

  const handleLocationClick = () => {
    window.open('https://www.google.com.ec/maps/dir//albergues+google+maps/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x91d599820c8a7717:0xa51ba159a37c6e49?sa=X&ved=1t:3061&ictx=111', '_blank'); // Abre el enlace en una nueva pestaña
  };

  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section horario">
          <h4>Horario de Atención</h4>
          <p>Lunes a Viernes: 9:00 AM - 5:00 PM</p>
          <p>Sábado: 10:00 AM - 2:00 PM</p>
          <p>Domingo: Cerrado</p>
          <button className="location-button" onClick={handleLocationClick}>
            Ubicación
          </button>
        </div>
        <div className="footer-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="footer-section social-media">
          <h4>Redes Sociales</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} className="social-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className="social-icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} className="social-icon" />
            </a>
          </div>
          <button className="help-button" onClick={handleHelpClick}>
            Ayuda
          </button>
        </div>
      </div>
      <div className="footer-section">
        <p>2024 Plataforma de Adopción de Perros. Todos los derechos reservados.</p>
      </div>
      <div className="footer-section contact-info">
        <p>Contacto: <a href="mailto:patitasfelices7@outlook.com">patitasfelices7@outlook.com</a></p>
      </div>
    </footer>
  );
};

export default Footer;
