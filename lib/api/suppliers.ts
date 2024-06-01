import { Supplier } from "@/types";
import api from "./api";

export const fetchSuppliers = async (): Promise<Supplier[]> => {
  const response = await api.get<Supplier[]>("/suppliers");
  return response.data;
};

export const fetchSupplierById = async (id: string): Promise<Supplier> => {
  const response = await api.get<Supplier>(`/suppliers/${id}`);
  return response.data;
};

export const createSupplier = async (userData: Supplier): Promise<Supplier> => {
  const response = await api.post("/suppliers", userData);
  return response.data;
};

export const editSupplier = async (userData: Supplier): Promise<Supplier> => {
  const response = await api.put("/suppliers", userData);
  return response.data;
};

export const deleteSupplier = async (id: string): Promise<Supplier> => {
  const response = await api.delete("/suppliers" + "/" + id);
  return response.data;
};
