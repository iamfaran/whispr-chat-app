import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useConversationStore } from "../zustand/useConversationStore";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { setMessages, messages } = useConversationStore();

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (message) => {
        setMessages([...messages, message]);
      });
    }

    return () => {
      if (socket) {
        socket.off("newMessage");
      }
    };
  }, [socket, setMessages, messages]);
};

export default useListenMessages;
