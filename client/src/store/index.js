import { create } from "zustand";

const useStore = create((set) => ({

  id: null,
  isLoading: false,
  theme: localStorage.getItem("theme") ?? "light",



  setTheme: (value) => set({ theme: value }),


  setIsLoading: (val) => set((state) => ({ isLoading: val })),
  setPostId: (val) => set((state) => ({ id: val })),
}));

export default useStore;
