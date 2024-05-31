"use client";

import CreateSupplier from "@/app/components/modals/CreateSupplier";

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
    </>
  );
};

export default ModalProvider;
