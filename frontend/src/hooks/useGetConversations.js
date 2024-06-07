import { useEffect, useState } from "react";
import axios from "axios";

const useGetConversations = () => {
  // get user conversations
  // set the value on useEffect
  const [conversations, setConversations] = useState([]);
  // loading
  const [loading, setLoading] = useState(true);

  // error
  const [error, setError] = useState(false);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/api/conversations");
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
