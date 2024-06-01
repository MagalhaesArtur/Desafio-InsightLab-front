import { create } from "zustand";

interface EditSupplierModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditSupplierModal = create<EditSupplierModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditSupplierModal;
