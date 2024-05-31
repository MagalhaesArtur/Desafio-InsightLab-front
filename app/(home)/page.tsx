"use client";
import { useTheme } from "next-themes";
import { Button } from "../components/ui/button";
import useCreateSupplierModal from "@/hooks/useCreateSupplierModal";

export default function Home() {
  const { theme } = useTheme();
  const createSupplierModal = useCreateSupplierModal();

  return (
    <div className=" w-full p-2 mt-4 max-h-full">
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
    </div>
  );
}
