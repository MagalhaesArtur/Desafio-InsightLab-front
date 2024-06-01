import { createSupplier, deleteSupplier } from "@/lib/api/suppliers";
import { Supplier } from "@/types";
import { useState } from "react";

const useDeleteSupplier = () => {
  const [data, setData] = useState<Supplier | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteSupplier = async (userId: string) => {
    try {
      const newUser = await deleteSupplier(userId);
      setData(newUser);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, handleDeleteSupplier, setLoading };
};

export default useDeleteSupplier;
