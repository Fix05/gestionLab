import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';


export const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const newUser = {
          id: decoded.id,
          email: decoded.sub,
          role: decoded.role
        };

        console.log("SETEAR", newUser);
        setUser(newUser);
      } catch (error) {
        console.log("Error decoding token: ", error);
      }
    }
    setLoading(false);
  }, []);

  const login = (newUser, token, refreshToken) => {

    console.log("Login");
    setUser(newUser);
    localStorage.setItem('token', token);  
    localStorage.setItem('refreshToken', refreshToken);  
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setLoading(true);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};