import { create } from "zustand";
import { getProfile } from "../action";

export const useProfileStore = create((set) => ({
  profile: null,
  setProfile: (profile) => set((state) => ({ profile: profile })),
}));
