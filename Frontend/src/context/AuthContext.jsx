import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('furneater_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('furneater_token');
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('furneater_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('furneater_user');
    }
    
    if (token) {
      localStorage.setItem('furneater_token', token);
    } else {
      localStorage.removeItem('furneater_token');
    }
  }, [user, token]);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
