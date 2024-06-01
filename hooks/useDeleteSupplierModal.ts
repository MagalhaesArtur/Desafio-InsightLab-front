import { create } from "zustand";

interface DeleteSupplierModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useDeleteSupplierModal = create<DeleteSupplierModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useDeleteSupplierModal;
