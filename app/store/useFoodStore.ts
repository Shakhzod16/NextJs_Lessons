import { create } from 'zustand';
import { createFood, deleteFood, getRequestErrorMessage, updateFood } from '../_lib/foodsApi';
import type { Food, FoodFormValues } from '../types/food';

interface FoodState {
	foods: Food[];
	error: string | null;
	isDialogOpen: boolean;
	editingFood: Food | null;
	bootstrap: (foods: Food[], initialError: string | null) => void;
	clearError: () => void;
	openCreateDialog: () => void;
	openEditDialog: (food: Food) => void;
	closeDialog: () => void;
	createFood: (payload: FoodFormValues) => Promise<void>;
	updateFood: (payload: FoodFormValues) => Promise<void>;
	removeFood: (foodId: Food['id']) => Promise<void>;
}

export const useFoodStore = create<FoodState>((set, get) => ({
	foods: [],
	error: null,
	isDialogOpen: false,
	editingFood: null,
	bootstrap: (foods, initialError) => set({ foods, error: initialError }),
	clearError: () => set({ error: null }),
	openCreateDialog: () => set({ isDialogOpen: true, editingFood: null, error: null }),
	openEditDialog: food => set({ isDialogOpen: true, editingFood: food, error: null }),
	closeDialog: () => set({ isDialogOpen: false, editingFood: null }),
	createFood: async payload => {
		try {
			const createdFood = await createFood(payload);
			set(state => ({
				foods: [createdFood, ...state.foods],
				isDialogOpen: false,
				editingFood: null,
				error: null,
			}));
		} catch (error) {
			set({ error: getRequestErrorMessage(error, 'Could not create food.') });
		}
	},
	updateFood: async payload => {
		const foodToEdit = get().editingFood;
		if (!foodToEdit) return;

		try {
			const updatedFood = await updateFood(foodToEdit.id, payload);
			set(state => ({
				foods: state.foods.map(food => (food.id === updatedFood.id ? updatedFood : food)),
				isDialogOpen: false,
				editingFood: null,
				error: null,
			}));
		} catch (error) {
			set({ error: getRequestErrorMessage(error, 'Could not update food.') });
		}
	},
	removeFood: async foodId => {
		try {
			await deleteFood(foodId);
			set(state => ({
				foods: state.foods.filter(food => food.id !== foodId),
				error: null,
			}));
		} catch (error) {
			set({ error: getRequestErrorMessage(error, 'Could not delete food.') });
		}
	},
}));
