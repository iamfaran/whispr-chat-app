import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const useSignup = () => {
  // TODO: fix error handling

  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const signup = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/register", data);
      login(response.data);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return { error, loading, signup };
};

export default useSignup;
