import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(null);   // null = not logged in
  const [lang, setLang]   = useState('ES');   // 'ES' | 'EN'
  const [token, setToken] = useState(null);

  const login = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, lang, setLang, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// Role helpers
export const isSeller = (user) => user?.role === 'seller';
export const isBuyer  = (user) => user?.role === 'buyer';
export const isAdmin  = (user) => user?.role === 'admin';
