import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false, userType: null, id_adoptante: null });

  useEffect(() => {
    // Cargar el estado de autenticación desde localStorage al cargar la aplicación
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, []);

  const login = (userType, id_adoptante) => {
    const newAuth = { isAuthenticated: true, userType, id_adoptante };
    setAuth(newAuth);
    localStorage.setItem('auth', JSON.stringify(newAuth));
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, userType: null, id_adoptante: null });
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
