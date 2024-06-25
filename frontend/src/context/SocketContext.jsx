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

  const startTyping = (recipientId) => {
    console.log("start typing", recipientId);
    // Emit an event to the server
    // will be called when the user starts typing
    socket.emit("startTyping", { recipientId, senderId: user._id });
  };

  const stopTyping = (recipientId) => {
    // Emit an event to the server
    // will be called when the user stops typing
    console.log("stop typing", recipientId);
    socket.emit("stopTyping", { recipientId, senderId: user._id });
  };

  //TODO: refactor use user.id as the useEffect dependency
  useEffect(() => {
    if (user) {
      const isDevelopment = process.env.NODE_ENV === "development";
      const socketUrl = isDevelopment
        ? "http://localhost:5000"
        : "https://whispr-chat-app.onrender.com/";
      const newSocket = io(socketUrl);

      setSocket(newSocket);
      newSocket.emit("userConnected", { userId: user._id });

      newSocket.on("onlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        newSocket.close();
      };
    }
  }, [user]);

  return (
    <SocketContext.Provider
      value={{ onlineUsers, socket, startTyping, stopTyping }}
    >
      {children}
    </SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node,
};

export { SocketProvider, useSocketContext };
