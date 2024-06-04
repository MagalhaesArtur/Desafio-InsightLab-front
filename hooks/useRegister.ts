import api from "@/lib/api/api";
import { login } from "@/lib/api/auth";
import { useState } from "react";

const useRegister = () => {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async (
    username: string,
    password: string,
    email: string,
    role: string
  ) => {
    setLoading(true);
    try {
      const newUser = await api.post("/auth/register", {
        username,
        email,
        password,
        role,
      });

      console.log(newUser);
      return true;
    } catch (error) {
      setError(error as Error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { token, error, loading, handleRegister, setLoading };
};

export default useRegister;
