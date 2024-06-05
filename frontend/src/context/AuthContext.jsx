import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";

// Create the AuthContext
const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

// Create the AuthProvider component
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Check for existing token in local storage and decode it
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        setUser(decodedToken);
      } else {
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setUser(jwtDecode(token));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = { user, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Create a custom hook to access the AuthContext value
function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
