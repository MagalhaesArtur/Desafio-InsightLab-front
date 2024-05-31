import useCreateSupplierModal from "@/hooks/useCreateSupplierModal";
import Modal from "../Modal";
import { useState } from "react";
import Input from "../Input";
import { Button } from "../ui/button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useCreateSupplier from "@/hooks/useCreateSupplier";

const CreateSupplier = () => {
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
    const { email, name, document } = values;

    handleCreateUser({ email, name, document });
  };

  return (
    <Modal
      title="Cadastrar Fornecedor"
      description="Insira as informações do fornecedor"
      isOpen={createSupplierModal.isOpen}
      onChange={onChange}
    >
      <form
        className="h-full m-auto gap-4 w-[90%] flex flex-col items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl">Seja bem vindo(a)!</h1>
        <h2 className="text-gray-300 text-base text-center">
          Digite o seu nome para que possamos te conhecer melhor.
        </h2>
        <Input
          id="name"
          disabled={loading}
          {...register("name", { required: true })}
          placeholder="Digite o nome do fornecedor..."
        />
        <Input
          id="email"
          disabled={loading}
          {...register("email", { required: true })}
          placeholder="Digite o email do fornecedor..."
        />{" "}
        <Input
          id="document"
          disabled={loading}
          {...register("document", { required: true })}
          placeholder="Digite o CNPJ do fornecedor..."
        />
        <Button disabled={loading} type="submit">
          Enviar
        </Button>
      </form>
    </Modal>
  );
};

export default CreateSupplier;
