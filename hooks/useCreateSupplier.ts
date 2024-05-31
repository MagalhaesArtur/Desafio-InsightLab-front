import { createSupplier } from "@/lib/api/suppliers";
import { Supplier } from "@/types";
import { useState } from "react";

const useCreateSupplier = () => {
  const [data, setData] = useState<Supplier | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateUser = async (userData: Supplier) => {
    setLoading(true);
    try {
      const newUser = await createSupplier(userData);
      setData(newUser);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, handleCreateUser };
};

export default useCreateSupplier;
