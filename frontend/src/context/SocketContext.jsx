import { createContext } from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { useAuth } from "./AuthContext";
import io from "socket.io-client";
import PropTypes from "prop-types";

const SocketContext = createContext();

const useSocketContext = () => {
  return useContext(SocketContext);
};
// connect to the server
const SocketProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const socket = io("http://localhost:5000");

      return () => {
        socket.close();
      };
    }
  }, [user?._id]);

  return (
    <SocketContext.Provider value={onlineUsers}>
      {children}
    </SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node,
};

export { SocketProvider, useSocketContext };
