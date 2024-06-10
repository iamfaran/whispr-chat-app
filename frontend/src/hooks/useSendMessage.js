import { useState } from "react";
import { useConversationStore } from "../zustand/useConversationStore";
import axios from "axios";

const useSendMessage = () => {
  console.log("Rendering useSendMessage...");
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } =
    useConversationStore();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      // ID of the user we are sending the message to
      const id = selectedConversation._id;
      // Send the message to the backend
      const response = await axios.post(`/api/messages/send/${id}`, {
        message,
      });
      // Update the messages in the store
      setMessages([...messages, response.data]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return { sendMessage, loading };
};

export default useSendMessage;
