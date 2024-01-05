"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedToken = typeof localStorage !== 'undefined' ? localStorage.getItem("userToken") : null;
  const storedUserID = typeof localStorage !== 'undefined' ? localStorage.getItem("userID") : null;
  const [userToken, setuserToken] = useState(storedToken);
  const [isLoading, setIsLoading] = useState(true);
  const [userID, setUserID] = useState(storedUserID);

  const logout = () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem("userToken");
    }
    setuserToken(null);
  };

  const getTokenFromLocalStorage = () => {
    return typeof localStorage !== 'undefined' ? localStorage.getItem("userToken") : null;
  };

  const getUserIDFromLocalStorage = () => {
    return typeof localStorage !== 'undefined' ? localStorage.getItem("userID") : null;
  };

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem("userToken", userToken);
    }
  }, [userToken]);

  
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem("userID", userID);
    }
  }, [userID]);

  return (
    <AuthContext.Provider
      value={{
        userID,
        setUserID,
        userToken,
        setuserToken,
        isLoading,
        setIsLoading,
        logout,
        getTokenFromLocalStorage,
        getUserIDFromLocalStorage
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
