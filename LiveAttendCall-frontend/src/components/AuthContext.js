import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create AuthContext
const AuthContext = createContext();

// AuthContext Provider
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Function to log in the user
  const login = (token, userDetails) => {
    setAuthToken(token);
    setUser(userDetails);

    // Store token and user details in localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(userDetails));
  };

  // Function to log out the user
  const logout = () => {
    setAuthToken(null);
    setUser(null);

    // Clear localStorage and navigate to login page
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Load the token and user details from localStorage on initial render
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setAuthToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Value provided by the context
  const contextValue = {
    authToken,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
