import { create } from "zustand";

export const memberStore = create((set) => ({
  AllMembers: [],
  setAllMembers: (members) => {
    set({ AllMembers: members });
  },
}));
