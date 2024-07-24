import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faUserLarge, faClock, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Footer from '../components/Footer';
import '../styles/Contactos.css';

const Contactos = () => {
  return (
    <div>
      <div className="contactos-wrapper">
      <div className="content">
        <h1><FontAwesomeIcon icon={faAddressCard} /> Contactos</h1>
        
        <div className="contact-info box">
          <h2><FontAwesomeIcon icon={faUserLarge} /> Información de Contacto Básica</h2>
          <p><strong>Dirección:</strong> Av. Los Amores 123, Colonia Las Flores, Ciudad Esperanza, CP 45678</p>
          <p><strong>Teléfono:</strong> +593 978070835</p>
          <p><strong>Correo Electrónico:</strong> patitasfelices7@outlook.com</p>
        </div>

        <div className="contact-hours box">
          <h2><FontAwesomeIcon icon={faClock} /> Horario de Atención</h2>
          <p>Lunes a Viernes: 9:00 AM - 5:00 PM</p>
          <p>Sábado: 10:00 AM - 2:00 PM</p>
          <p>Domingo: Cerrado</p>
        </div>

        <div className="contact-social box">
          <h2><FontAwesomeIcon icon={faThumbsUp} /> Redes Sociales</h2>
          <div className="social-icons">
            <a href="https://www.facebook.com/profile.php?id=100064353828410&locale=es_LA" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} /> 
            </a>
            <a href="https://www.instagram.com/adoptameecuador/?hl=es" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} /> 
            </a>
            <a href="https://twitter.com/mascotasadopcio?lang=es" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} /> 
            </a>
          </div>
        </div>
      </div>
      
    </div>
    <Footer />
    </div>
   
  );
};

export default Contactos;
