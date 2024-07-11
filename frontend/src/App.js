import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './components/Inicio';
import Perros from './components/Perros';
import Contactos from './components/Contactos';
import Nosotros from './components/Nosotros';
import Recursos from './components/Recursos';
import Recomendar from './components/Recomendar';
import RecomendarVisitante from './components/RecomendarVisitante';
import Solicitar from './components/Solicitar';
import Login from './components/Login';
import Register from './components/Register';
import GestionarPerros from './components/GestionarPerros'; // Importa el nuevo componente
import GestionarSolicitudes from './components/GestionarSolicitudes';
import GestionarAdoptantes from './components/GestionarAdoptantes';
import Navbar from './components/Navbar';
import AuthProvider from './AuthContext';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/perros" element={<Perros />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/recursos" element={<Recursos />} />
          <Route path="/recomendar" element={<Recomendar />} />
          <Route path="/recomendar-visitante" element={<RecomendarVisitante />} />
          <Route path="/solicitar" element={<Solicitar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/gestionar/perros" element={<GestionarPerros />} /> 
          <Route path="/gestionar/solicitudes" element={<GestionarSolicitudes />} />
          <Route path="/gestionar/adoptantes" element={<GestionarAdoptantes />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
