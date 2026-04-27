import type { PostgrestError } from '@supabase/supabase-js';
import { createClient as createBrowserClient } from '@/utils/supabase/client';
import type { Food, FoodFormValues } from '../types/food';

const FOODS_TABLE = 'foods';

export function normalizeFood(row: Record<string, unknown>): Food {
	return {
		id: String(row.id ?? ''),
		name: String(row.name ?? ''),
		description: String(row.description ?? ''),
		price: Number(row.price ?? 0),
		imageUrl: String(row.image_url ?? ''),
		isAvailable: Boolean(row.is_available),
	};
}

export async function createFood(payload: FoodFormValues) {
	const supabase = createBrowserClient();
	const { data, error } = await supabase
		.from(FOODS_TABLE)
		.insert({
			name: payload.name,
			description: payload.description,
			price: payload.price,
			image_url: payload.imageUrl,
			is_available: payload.isAvailable,
		})
		.select('*')
		.single();

	if (error) {
		throw error;
	}

	return normalizeFood(data as Record<string, unknown>);
}

export async function updateFood(id: Food['id'], payload: FoodFormValues) {
	const supabase = createBrowserClient();
	const { data, error } = await supabase
		.from(FOODS_TABLE)
		.update({
			name: payload.name,
			description: payload.description,
			price: payload.price,
			image_url: payload.imageUrl,
			is_available: payload.isAvailable,
		})
		.eq('id', id)
		.select('*')
		.single();

	if (error) {
		throw error;
	}

	return normalizeFood(data as Record<string, unknown>);
}

export async function deleteFood(id: Food['id']) {
	const supabase = createBrowserClient();
	const { error } = await supabase.from(FOODS_TABLE).delete().eq('id', id);

	if (error) {
		throw error;
	}
}

export function getRequestErrorMessage(error: unknown, fallback = 'Something went wrong. Please try again.') {
	const supabaseError = error as PostgrestError | undefined;
	if (supabaseError?.message) {
		return supabaseError.message;
	}

	if (error instanceof Error && error.message.trim().length > 0) {
		return error.message;
	}

	return fallback;
}

export function formatPrice(price: number) {
	return `${price.toLocaleString('uz-UZ')} so'm`;
}
