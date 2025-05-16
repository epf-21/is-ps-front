// context/authContext.tsx
'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Al montar intenta recuperar el usuario de localStorage(lo comparamos como esta en el boton reserva)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Escuchar cambios en otras pestañas (para la lista de carros)
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "user") {
        const updatedUser = event.newValue ? JSON.parse(event.newValue) : null;
        setUser(updatedUser);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Logout automático al cerrar la pestaña(revisar si funciona en otrs navegadores el beforeunload)
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("user");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
