"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";
import { HashLoader } from "react-spinners";
import Input from "../components/Input";
import { Button } from "../components/ui/button";
import useRegister from "@/hooks/useRegister";

const Register: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const { setIsAuthenticated, isAuthenticated } = useAuth();
  const router = useRouter();
  const { theme } = useTheme();
  const { loading, handleRegister } = useRegister();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      password: "",
      email: "",

      passwordConfirm: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated, router]);

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    setIsLoading(true);

    const { username, password, email, passwordConfirm } = values;

    if (passwordConfirm == password) {
      const isLoginSucess = await handleRegister(
        username,
        password,
        email,
        "USER"
      );

      setTimeout(() => {
        if (isLoginSucess) {
          setIsLoading(false);
          toast.success("Usuário registrado!");
          router.replace("/");
          reset();
          setIsLoading(false);
        } else {
          toast.error("Senha ou usuário/email incorretos");
          setIsLoading(false);
          setIsError(true);

          setTimeout(() => {
            setIsError(false);
          }, 3000);
        }
      }, 1000);
    } else {
      setIsPasswordError(true);
      toast.error("Senhas não coincidem!");
      setTimeout(() => {
        setIsPasswordError(false);
      }, 3000);
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return null;
  } else {
    return (
      <div className="min-h-screen  flex items-center justify-center bg-gradient-to-r ">
        <div className="w-[350px] md:w-[700px]  lg:w-[900px]  bg-white rounded-lg shadow-md overflow-hidden ">
          <div className="md:flex ">
            <div className="w-full flex justify-center items-center p-4 py-6 sm:p-6 md:p-8 bg-gradient-to-r from-[#1b1919]  to-indigo-600 text-white">
              <h2 className="text-3xl font-bold text-center mb-4">
                Bem Vindo!
              </h2>
            </div>
            <div className="w-full p-4 py-6 sm:p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-700 text-center">
                Cadastro
              </h2>
              <p className="text-sm text-gray-600 text-center">
                Bem Vindo! Crie sua nova conta.
              </p>
              <form
                className="mt-8 space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <Input
                    id="username"
                    className={`transition-all  ${
                      theme == "light"
                        ? "bg-indigo-200 placeholder:text-neutral-700 hover:bg-indigo-300 "
                        : "bg-white text-black  hover:shadow-customDark border-indigo-600"
                    } `}
                    disabled={loading}
                    type="text"
                    autoComplete="off"
                    {...register("username", { required: true })}
                    placeholder="Digite o seu username..."
                  />
                </div>
                <div>
                  <Input
                    id="email"
                    className={`transition-all  ${
                      theme == "light"
                        ? "bg-indigo-200 autofill:bg-green-500 placeholder:text-neutral-700 hover:bg-indigo-300 "
                        : "bg-white text-black  hover:shadow-customDark border-indigo-600"
                    } `}
                    disabled={loading}
                    type="email"
                    autoComplete="on"
                    {...register("email", { required: true })}
                    placeholder="Digite o seu email..."
                  />
                </div>
                <div>
                  <Input
                    id="password"
                    className={`transition-all  ${
                      theme == "light"
                        ? "bg-indigo-200 placeholder:text-neutral-700 hover:bg-indigo-300 "
                        : "bg-white text-black  hover:shadow-customDark border-indigo-600"
                    } ${isPasswordError ? "border-red-600" : ""}`}
                    disabled={loading}
                    type="password"
                    autoComplete="off"
                    {...register("password", { required: true })}
                    placeholder="Digite a sua senha..."
                  />
                </div>
                <div>
                  <Input
                    id="passwordConfirm"
                    className={`transition-all  ${
                      theme == "light"
                        ? "bg-indigo-200 placeholder:text-neutral-700 hover:bg-indigo-300 "
                        : "bg-white text-black  hover:shadow-customDark border-indigo-600"
                    } ${isPasswordError ? "border-red-600" : ""}`}
                    disabled={loading}
                    type="password"
                    autoComplete="off"
                    {...register("passwordConfirm", { required: true })}
                    placeholder="Confirme a sua senha..."
                  />
                </div>
                <div className="flex items-center justify-between"></div>
                <div>
                  <Button
                    type="submit"
                    className="transition-all hover:shadow-customDark w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    {loading || isLoading ? (
                      <HashLoader size={25} color="#36d7b7" />
                    ) : (
                      "Signup"
                    )}
                  </Button>
                </div>
              </form>
              <p className="mt-2 text-center text-sm text-gray-600">
                Já tem uma conta?{" "}
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Register;
