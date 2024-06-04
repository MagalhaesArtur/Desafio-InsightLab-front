"use client";
import { Auth } from "@/lib/api/auth";
import { User } from "@/types";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import toast from "react-hot-toast";

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  logout: () => void;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    const loadingStoreData = async () => {
      const storageToken = localStorage.getItem("@Auth:token");

      if (storageToken) {
        const res = await Auth(storageToken);

        if (res.username == null || res.status == 500) {
          toast.error("Sessão Expirada! Faça o login novamente.");
          localStorage.clear();
          setIsAuthenticated(false);
          router.push("/");
        } else {
          setUser(res);
          setIsAuthenticated(true);
        }
      }
    };
    loadingStoreData();
  }, [AuthContext, router]);

  const logout = () => {
    localStorage.removeItem("@Auth:token");
    setIsAuthenticated(false);
    router.replace("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
