"use client";
import { useTheme } from "next-themes";
import { Button } from "../components/ui/button";
import useCreateSupplierModal from "@/hooks/useCreateSupplierModal";
import SuppliersList from "../components/SuppliersList";
import useFetchSuppliers from "@/hooks/useFetchSuppliers";
import { BounceLoader } from "react-spinners";
import { useEffect, useState } from "react";

import { Supplier } from "@/types";
import { fetchSuppliers } from "@/lib/api/suppliers";
import { useAppContext } from "@/context";

export default function Home() {
  const [data1, setData] = useState<Supplier[] | null>(null);
  const { onCreateSupplier, onDeleteSupplier, onEditSupplier } =
    useAppContext();

  const { theme } = useTheme();

  const createSupplierModal = useCreateSupplierModal();
  const { data, error, loading, setLoading } = useFetchSuppliers();

  const aux = async () => {
    const supp = await fetchSuppliers();
    setData(supp);
    console.log(supp);
  };

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      aux();
      setLoading(false);
    }, 1000);
  }, [data, onCreateSupplier, onDeleteSupplier, onEditSupplier]);

  return (
    <div className=" w-full flex flex-col p-2 mt-4 max-h-full">
      <div className="flex items-center justify-between">
        <h1
          className={`font-bold text-2xl  ${
            theme == "light" ? "text-indigo-800" : "!text-indigo-500 "
          }`}
        >
          Fornecedores
        </h1>

        <Button
          className={` font-medium   ${
            theme == "light"
              ? "bg-indigo-800 hover:!bg-indigo-600"
              : "!bg-indigo-500 hover:!bg-indigo-600"
          }`}
          onClick={() => {
            createSupplierModal.onOpen();
          }}
        >
          Adicionar Fornecedor
        </Button>
      </div>
      {loading ? (
        <BounceLoader className="m-auto" color="#4338ca" />
      ) : (
        <SuppliersList suppliers={data1} />
      )}
    </div>
  );
}
