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
  const [socket, setSocket] = useState(null);
  //TODO: refactor use user.id as the useEffect dependency
  useEffect(() => {
    if (user) {
      const newSocket = io("http://localhost:5000");

      setSocket(newSocket);
      newSocket.emit("userConnected", { userId: user._id });

      newSocket.on("onlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        console.log("disconnecting socket");
        newSocket.close();
      };
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ onlineUsers, socket }}>
      {children}
    </SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node,
};

export { SocketProvider, useSocketContext };
