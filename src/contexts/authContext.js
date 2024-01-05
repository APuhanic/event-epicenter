"use client";

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setuserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AuthContext.Provider value={{ userToken, setuserToken, isLoading, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
