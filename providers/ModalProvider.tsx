"use client";

import CreateSupplier from "@/app/components/modals/CreateSupplier";
import DeleteSupplier from "@/app/components/modals/DeleteSupplier";
import EditSupplier from "@/app/components/modals/EditSupplier";

import { useEffect, useState } from "react";

interface ModalProviderProps {}

const ModalProvider: React.FC<ModalProviderProps> = ({}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateSupplier />
      <DeleteSupplier />
      <EditSupplier />
    </>
  );
};

export default ModalProvider;
