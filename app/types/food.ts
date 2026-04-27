export interface Food {
	id: string;
	name: string;
	description: string;
	price: number;
	imageUrl: string;
	isAvailable: boolean;
}

export interface FoodFormValues {
	name: string;
	description: string;
	price: number;
	imageUrl: string;
	isAvailable: boolean;
}
