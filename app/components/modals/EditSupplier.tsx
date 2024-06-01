import Modal from "../Modal";
import { useEffect, useState } from "react";
import Input from "../Input";
import { Button } from "../ui/button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { SyncLoader } from "react-spinners";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context";
import useEditSupplier from "@/hooks/useEditSupplier";
import useEditSupplierModal from "@/hooks/useEditSupplierModal";
import { Supplier } from "@/types";

const EditSupplier = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { onEditSupplier, setOnEditSupplier } = useAppContext();
  const { theme } = useTheme();
  const { refresh } = useRouter();
  const { currentSupplier } = useAppContext();
  const editSupplierModal = useEditSupplierModal();
  const { data, error, loading, handleEditSupplier } = useEditSupplier();
  const onChange = (open: boolean) => {
    if (!open) {
      editSupplierModal.onClose();
    }
  };

  useEffect(() => {
    reset({
      name: currentSupplier?.name,
      document: currentSupplier?.document,
      email: currentSupplier?.email,
    });
  }, [currentSupplier]);

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      name: currentSupplier?.name,
      document: currentSupplier?.document,
      email: currentSupplier?.email,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    setIsLoading(true);
    const { email, name, document } = values;

    setTimeout(() => {
      const x = {
        id: currentSupplier.id,
        email: email,
        name: name,
        document: document,
      };
      handleEditSupplier(x);
      setIsLoading(false);
      toast.success("Fornecedor editado!");
      reset();
      refresh();
      setOnEditSupplier(!onEditSupplier);
      editSupplierModal.onClose();
    }, 1000);
  };
  return (
    <Modal
      title="Editar Fornecedor"
      description="Edite as informações do fornecedor"
      isOpen={editSupplierModal.isOpen}
      onChange={onChange}
    >
      <form
        className="h-full m-auto gap-6 w-[90%] flex flex-col items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id="name"
          className={`  ${
            theme == "light"
              ? "bg-indigo-200 placeholder:text-neutral-700 hover:bg-indigo-300 transition-all"
              : "bg-indigo-400 placeholder:text-black transition-all hover:bg-indigo-500"
          }`}
          disabled={loading}
          autoComplete="off"
          {...register("name", { required: true })}
          placeholder="Digite o nome do fornecedor..."
        />
        <Input
          className={`  ${
            theme == "light"
              ? "bg-indigo-200 placeholder:text-neutral-700 hover:bg-indigo-300 transition-all"
              : "bg-indigo-400 placeholder:text-black transition-all hover:bg-indigo-500"
          }`}
          id="email"
          disabled={loading}
          {...register("email", { required: true })}
          placeholder="Digite o email do fornecedor..."
        />{" "}
        <Input
          className={`  ${
            theme == "light"
              ? "bg-indigo-200 placeholder:text-neutral-700 hover:bg-indigo-300 transition-all"
              : "!bg-indigo-400  placeholder:text-black transition-all hover:bg-indigo-500"
          }`}
          autoComplete="off"
          id="document"
          disabled={loading}
          {...register("document", { required: true })}
          placeholder="Digite o CNPJ do fornecedor..."
        />
        <Button
          className={` w-full font-medium   ${
            theme == "light"
              ? "bg-indigo-800 hover:!bg-indigo-600"
              : "!bg-indigo-500  hover:!bg-indigo-600"
          }`}
          disabled={loading}
          type="submit"
        >
          {loading || isLoading ? (
            <SyncLoader size={8} color="#36d7b7" />
          ) : (
            <p>Enviar</p>
          )}
        </Button>
      </form>
    </Modal>
  );
};

export default EditSupplier;
