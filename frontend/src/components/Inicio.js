import React, { useEffect, useState } from 'react';
import '../styles/Inicio.css';
import Footer from '../components/Footer';

const Inicio = () => {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/perros')  // Ajusta la URL según tu API
      .then(response => response.json())
      .then(data => setDogs(data))
      .catch(error => console.error('Error fetching dogs:', error));
  }, []);

  return (
    <div className="inicio-container">
      <header className="hero">
        <h1>ADOPTA, SALVA UNA VIDA, GANA UN AMIGO</h1>
        <p>Plataforma para la adopción de perros.</p>
        <div className="hero-buttons">
          <button>QUIERO ADOPTAR</button>
        </div>
      </header>
      <section className="dogs-gallery">
        {dogs.length > 0 ? (
          dogs.map(dog => (
            <div className="dog-card" key={dog.id_perro}>
              <img src={dog.imagen_url} alt={dog.nombre} />
              <div>{dog.nombre}<br />{dog.genero}, {dog.edad} años</div>
            </div>
          ))
        ) : (
          <p>No hay perros disponibles en este momento.</p>
        )}
      </section>
      <Footer/>
    </div>
  );
};

export default Inicio;

