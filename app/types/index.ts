export type Category = {
	id: string;
	name: string;
	created_at: string;
};
export type Product = {
	id: string;
	title: string;
	description: string;
	price: number;
	imageUrl: string;
	categoryId: string;
};
