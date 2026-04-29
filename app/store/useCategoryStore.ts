import { Category } from '../types';
import { create } from 'zustand';

type Store = {
	categories: Category[];
	setCategories: (categories: Category[]) => void;
};

export const useCategoryStore = create<Store>(set => ({
	categories: [],
	setCategories: categories => set({ categories }),
}));
