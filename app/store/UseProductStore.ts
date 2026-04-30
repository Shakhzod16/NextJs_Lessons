import { create } from 'zustand';

type ProductForm = {
	title: string;
	description: string;
	price: string;
	imageUrl: string;
	categoryId: string;
};

type Store = {
	modalOpen: boolean;
	productForm: ProductForm;
	setVisible: (open: boolean) => void;
	changeForm: (field: keyof ProductForm, value: string) => void;
	resetForm: () => void;
};

const initialForm: ProductForm = {
	title: '',
	description: '',
	price: '',
	imageUrl: '',
	categoryId: '',
};

export const useProductStore = create<Store>(set => ({
	modalOpen: false,
	productForm: initialForm,

	setVisible: visible => set({ modalOpen: visible }),

	changeForm: (field, value) =>
		set(state => ({
			productForm: {
				...state.productForm,
				[field]: value,
			},
		})),

	resetForm: () => set({ productForm: initialForm }),
}));
