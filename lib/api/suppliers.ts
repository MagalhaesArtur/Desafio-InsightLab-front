import { Supplier } from "@/types";
import api from "./api";

export const fetchSuppliers = async (): Promise<Supplier[]> => {
  const token = localStorage.getItem("@Auth:token"); // Obtenha o token JWT do localStorage

  const response = await api.get<Supplier[]>("/suppliers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchSupplierById = async (id: string): Promise<Supplier> => {
  const response = await api.get<Supplier>(`/suppliers/${id}`);
  return response.data;
};

export const createSupplier = async (userData: Supplier): Promise<Supplier> => {
  const token = localStorage.getItem("@Auth:token");

  try {
    const response = await api.post("/suppliers", userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e: any) {
    throw new Error(e.response.data.message);
  }
};

export const editSupplier = async (userData: Supplier): Promise<Supplier> => {
  const response = await api.put("/suppliers", userData);
  return response.data;
};

export const deleteSupplier = async (id: string): Promise<Supplier> => {
  const token = localStorage.getItem("@Auth:token");

  const response = await api.delete("/suppliers" + "/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
