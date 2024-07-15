// src/App.js
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
import CrearPerro from './components/GestionarPerros/CrearPerro';
import ListarPerros from './components/GestionarPerros/ListarPerros';
import CrearAdoptante from './components/GestionarAdoptantes/CrearAdoptante';
import ListarAdoptantes from './components/GestionarAdoptantes/ListarAdoptantes';
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
          <Route path="/gestionar/perros/crear" element={<CrearPerro />} />
          <Route path="/gestionar/perros/listar" element={<ListarPerros />} />
          <Route path="/gestionar/adoptantes/crear" element={<CrearAdoptante />} />
          <Route path="/gestionar/adoptantes/listar" element={<ListarAdoptantes />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
