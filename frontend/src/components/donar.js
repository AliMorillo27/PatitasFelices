import React from 'react';
import '../styles/Donar.css';
import Footer from '../components/Footer';
import logo from '../assets/logo.png'; // Asegúrate de tener esta imagen en la carpeta assets
import bankIcon from '../assets/banco.png'; // Asegúrate de tener esta imagen en la carpeta assets

const Donar = () => {
  return (
    <div className="donar-container">
      <div className="header">
        <img src={logo} alt="Logo" className="logo-icon" />
        <h1>¡Muchas gracias por apoyar a Patitas Felices! Tu donación ayuda a salvar vidas.</h1>
      </div>
      <div className="donar-content">
        <h2>Transferencia Bancaria Electrónica</h2>
        <p>Donación mensual o única</p>
        <div className="banco-info">
          <img src={bankIcon} alt="Banco Pichincha Icono" className="bank-icon" />
          <p>Banco Pichincha</p>
        </div>
        <p>Número de cuenta: 2203627253</p>
        <p>No se cobran tarifas de procesamiento. ¡Descubre cómo tu donación hace la diferencia!</p>
        
        <h2>Cómo Ayuda Tu Donación</h2>
        <div className="donar-section">
          <h3>Cubriendo Facturas Veterinarias</h3>
          <p>
            Muchas de los animales que llegan a nuestro cuidado están desnutridos o enfermos. 
            Patitas Felices trabaja en estrecha colaboración con veterinarios para ayudar a que nuestros perros y gatos se sientan saludables y felices. 
            Este es nuestro mayor costo porque nunca abandonaremos a un animal enfermo y haremos lo que sea necesario. 
            ¡Al donar, estás ayudando directamente a los animales más indefensos y vulnerables a recuperar su salud!
          </p>
          <div className="image vet-image"></div>
        </div>

        <div className="donar-section">
          <h3>Programa de Esterilización y Devolución</h3>
          <p>
            Patitas Felices lleva a cabo un programa de captura, esterilización y devolución para ayudar a controlar la población de perros callejeros. 
            Creemos que la única forma de detener el creciente número de perros que nacen y sufren en las calles es atraparlos y esterilizarlos de forma humanitaria. 
            Una vez que los perros se recuperan, los devolvemos a su territorio original y continuamos vigilándolos, alimentándolos y cuidándolos con la ayuda de la comunidad local.
          </p>
          <div className="image spay-neuter-image"></div>
        </div>

        <div className="donar-section">
          <h3>Alimentación y Cuidados Continuos</h3>
          <p>
            Durante todo el año, cuidamos a numerosos animales que necesitan atención constante. 
            Pueden pasar meses hasta que un animal de acogida se recupere y esté listo para su hogar definitivo. 
            Además, seguimos alimentando y controlando a los perros callejeros durante el resto de sus vidas y también ayudamos a los dueños de mascotas con bajos ingresos a cuidar y alimentar a sus animales.
          </p>
          <div className="image care-image"></div>
        </div>

        <p>¡Gracias por tu generosidad y por hacer una diferencia en la vida de tantos animales!</p>
      </div>
      <Footer />
    </div>
  );
};

export default Donar;


