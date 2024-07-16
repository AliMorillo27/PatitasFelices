import React from 'react';
import '../styles/Contactos.css';
import Footer from '../components/Footer';

const Contactos = () => {
  return (
    <div className="contactos-container">
      <div className="contactos-header">
        <h1>Contáctanos</h1>
      </div>
      <div className="contactos-content">
        <div className="contactos-info">
          <p>Si tienes alguna pregunta, no dudes en contactarnos a través de los siguientes medios:</p>
          <ul>
            
            <li>Email:contacto@ejemplo.com</li>
            
            <li>Teléfono: +593 995191763</li>
           
            <li>Dirección: ESPOCH, Riobamba, ECUADOR</li>
          </ul>
        </div>
        <div className="contactos-message">
          <h2>Mensaje:</h2>
          <p>
            Nuestro equipo está siempre disponible para ayudarte con cualquier consulta
            que puedas tener. Ya sea que necesites información sobre nuestros productos,
            servicios o cualquier otra cosa, no dudes en ponerte en contacto con nosotros.
          </p>
          <p>
            También puedes seguirnos en nuestras redes sociales para estar al tanto de las
            últimas novedades y promociones.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contactos;



