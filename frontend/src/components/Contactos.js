import React from 'react';
import '../styles/Contactos.css';

const Contactos = () => {
  return (
    <div className="contactos-container">
      <h1>Contactos</h1>
      <div className="contactos-content">
        <p>Si tienes alguna pregunta, no dudes en contactarnos a través de los siguientes medios:</p>
        <ul>
          <li>Email: contacto@ejemplo.com</li>
          <li>Teléfono: +123 456 7890</li>
          <li>Dirección: Calle Falsa 123, Ciudad, País</li>
        </ul>
      </div>
    </div>
  );
};

export default Contactos;

