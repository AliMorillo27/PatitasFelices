import React from 'react';
import '../styles/Contactos.css';
import Footer from '../components/Footer';
const Contactos = () => {
  return (
    <div className="contactos-container">
      <h1>Contactenos</h1>
      <div className="contactos-content">
        <p>Si tienes alguna pregunta, no dudes en contactarnos a través de los siguientes medios:</p>
        <ul>
        <h2>Email:</h2>
          <li>contacto@ejemplo.com</li>
          <h2>Teléfono:</h2>
          <li> +593 995191763</li>
           <h2>Dirección:</h2>
          <li>Dirección: ESPOCH, Riobamba, ECUADOR</li>
        </ul>
      </div>
      <Footer/>
    </div>
  );
};

export default Contactos;

