import React from 'react';
import '../styles/Nosotros.css';
import dogImage from '../assets/nosotros.png'; // Ensure this path is correct
import Footer from '../components/Footer';

const Nosotros = () => {
  return (
    <div className="nosotros-container">
      <div className="content">
        <h1>Sobre Nosotros</h1>
        <br></br>
        <img src={dogImage} alt="Dog" className="dog-image" />
        <h2>Perfil de la Fundación</h2>
        <p>
          Patitas Felices es un centro de adopción dedicado a encontrar hogares amorosos
          para perros rescatados. Fundado en 2021, nuestro objetivo es proporcionar una
          segunda oportunidad a los perros abandonados y promover la tenencia responsable
          de mascotas.
        </p>
        <h2>Misión</h2>
        <p>
          Promover la protección y el bienestar de los animales mediante acciones directas
          y la concienciación de la comunidad en el respeto que merecen y se debe tener hacia
          las demás especies.
        </p>
        <h2>Visión</h2>
        <p>
          Ser una organización autosustentable, reconocida como referente nacional en bienestar
          animal, responsable del cambio en la relación humano-animal en nuestra comunidad.
        </p>
        <h2>Principios</h2>
        <p>
        Libertad de hambre, sed y malnutrición.
        <br></br>
        Libertad de miedo, ansiedad y angustia.
        <br></br>
        Libertad de incomodidad por condiciones físicas o térmicas.
        <br></br>
        Libertad de dolor, lesiones y enfermedades.
        <br></br>
        Libertad para expresar un comportamiento normal.
        </p>

      
      </div>
      <Footer/>
    </div>
    
  );
};

export default Nosotros;


