import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false, userType: '', id_adoptante: null });

  const login = (userType, id_adoptante) => {
    setAuth({ isAuthenticated: true, userType, id_adoptante });
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, userType: '', id_adoptante: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
