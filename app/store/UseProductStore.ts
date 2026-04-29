import { create } from 'zustand';

type Store = {
	modalOpen: boolean;
	productForm: {
		title: string;
		description: string;
		price: string;
		imageUrl: string;
		categoryId: string;
	};
	setVisible: (open: boolean) => void;
	changeForm: (field: string, value: string) => void;
};

export const useProductStore = create<Store>(set => ({
	modalOpen: false,
	productForm: {
		title: '',
		description: '',
		price: '',
		imageUrl: '',
		categoryId: '',
	},

	setVisible: visible => set({ modalOpen: visible }),
	changeForm: (field, value) =>
		set(state => ({
			productForm: {
				...state.productForm,
				[field]: value,
			},
		})),
}));
