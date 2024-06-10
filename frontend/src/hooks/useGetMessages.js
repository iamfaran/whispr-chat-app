import { useEffect, useState } from "react";
import axios from "axios";
import { useConversationStore } from "../zustand/useConversationStore";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } =
    useConversationStore();

  useEffect(() => {
    const id = selectedConversation?._id;
    const getMessages = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/messages/${id}`);
        setMessages(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [setMessages, selectedConversation?._id]);

  return { messages, loading };
};

export default useGetMessages;
