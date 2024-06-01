import useCreateSupplierModal from "@/hooks/useCreateSupplierModal";
import Modal from "../Modal";
import { useState } from "react";
import Input from "../Input";
import { Button } from "../ui/button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useCreateSupplier from "@/hooks/useCreateSupplier";
import { SyncLoader } from "react-spinners";
import { useTheme } from "next-themes";
import { Island_Moments } from "next/font/google";
import toast from "react-hot-toast";

const CreateSupplier = () => {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const createSupplierModal = useCreateSupplierModal();
  const { data, error, loading, handleCreateUser } = useCreateSupplier();
  const onChange = (open: boolean) => {
    if (!open) {
      createSupplierModal.onClose();
    }
  };

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      document: "",
      email: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    setIsLoading(true);
    const { email, name, document } = values;

    setTimeout(() => {
      handleCreateUser({ email, name, document });
      setIsLoading(false);
      toast.success("Fornecedor cadastrado!");
      reset();
      createSupplierModal.onClose();
    }, 1000);
  };

  return (
    <Modal
      title="Cadastrar Fornecedor"
      description="Insira as informações do fornecedor"
      isOpen={createSupplierModal.isOpen}
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

export default CreateSupplier;