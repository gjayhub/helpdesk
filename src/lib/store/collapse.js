import { create } from "zustand";
import { getProfile } from "../action";

export const useCollapsed = create((set) => ({
  isCollapsed: false,
  setIsCollapsed: (collapsed) => set((state) => ({ collapsed: collapsed })),
}));
