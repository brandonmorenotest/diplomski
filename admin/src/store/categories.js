import { create } from "zustand";

const useCategoriesStore = create((set) => ({
  categories: ["NEWS", "SPORTS", "CODING", "EDUCATION", "FASHION"],
  addCategory: (category) => set((state) => ({ categories: [...state.categories, category] })),
}));

export default useCategoriesStore;
