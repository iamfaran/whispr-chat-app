import { useEffect, useState } from "react";
import axios from "axios";
import { useConversationStore } from "../zustand/useConversationStore";

const useGetConversations = () => {
  // loading
  const [loading, setLoading] = useState(true);
  const { conversations, setConversations } = useConversationStore();

  // error
  const [error, setError] = useState(false);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/api/users");
        setConversations(res.data);
      } catch (error) {
        console.error("Error in useGetConversations: ", error.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);

  return { conversations, loading, error };
};

export default useGetConversations;
