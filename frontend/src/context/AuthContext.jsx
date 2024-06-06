import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

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
    const userData = localStorage.getItem("userInfo");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = (userInfo) => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    setUser(userInfo);
  };

  const logout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        localStorage.removeItem("userInfo");
        setUser(null);
      }
    } catch (error) {
      console.error(error);
    }
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
