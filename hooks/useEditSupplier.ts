import { editSupplier } from "@/lib/api/suppliers";
import { Supplier } from "@/types";
import { useState } from "react";

const useEditSupplier = () => {
  const [data, setData] = useState<Supplier | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleEditSupplier = async (userData: Supplier) => {
    setLoading(true);
    try {
      const newUser = await editSupplier(userData);
      setData(newUser);
    } catch (error) {
      const x = error as Error;
      throw new Error(x.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, handleEditSupplier, setLoading };
};

export default useEditSupplier;
