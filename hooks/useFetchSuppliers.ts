import { fetchSuppliers } from "@/lib/api/suppliers";
import { Supplier } from "@/types";
import { useState, useEffect } from "react";

const useFetchSuppliers = () => {
  const [data, setData] = useState<Supplier[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const users = await fetchSuppliers();
        setData(users);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return { data, error, loading };
};

export default useFetchSuppliers;
