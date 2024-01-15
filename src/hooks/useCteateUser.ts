import { create } from "zustand";

interface useCreateUserModalStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  type: "create" | "update";
}

export const useCreateUserModal = create<useCreateUserModalStore>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
  type: "create",
}));
