import { create } from "zustand";

interface CreateSupplierModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCreateSupplierModal = create<CreateSupplierModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCreateSupplierModal;
