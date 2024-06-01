import useDeleteSupplierModal from "@/hooks/useDeleteSupplierModal";
import Modal from "../Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useDeleteSupplier from "@/hooks/useDeleteSupplier";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "@/context";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";

const DeleteSupplier = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentSupplier, onDeleteSupplier, setOnDeleteSupplier } =
    useAppContext();
  const { theme } = useTheme();

  const { data, error, loading, handleDeleteSupplier } = useDeleteSupplier();

  const deleteSupplierModal = useDeleteSupplierModal();
  const onChange = (open: boolean) => {
    if (!open) {
      deleteSupplierModal.onClose();
    }
  };
  const { register, handleSubmit, reset } = useForm<FieldValues>({});

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    setIsLoading(true);

    setTimeout(() => {
      handleDeleteSupplier(currentSupplier.id);
      setIsLoading(false);
      toast.success("Fornecedor deletado!");
      reset();
      setOnDeleteSupplier(!onDeleteSupplier);
      deleteSupplierModal.onClose();
    }, 1000);
  };
  return (
    <Modal
      title="Deletar fornecedor?"
      description="Clique no botão para confirmar"
      isOpen={deleteSupplierModal.isOpen}
      onChange={onChange}
    >
      <form
        className="h-full m-auto gap-6 w-[90%] flex flex-col items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Button
          className={` w-full font-medium   ${
            theme == "light"
              ? "bg-indigo-800 hover:!bg-red-600"
              : "!bg-indigo-500  hover:!bg-red-600"
          }`}
          disabled={loading || isLoading}
          type="submit"
        >
          Deletar
        </Button>
      </form>
    </Modal>
  );
};

export default DeleteSupplier;
