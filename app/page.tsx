import StudentsDashboard from './_components/StudentsDashboard';
import { getRequestErrorMessage, normalizeFood } from './_lib/foodsApi';
import type { Food } from './types/food';
import { createClient } from '@/utils/supabase/server';

export default async function Page() {
	let initialStudents: Food[] = [];
	let initialError: string | null = null;

	try {
		const supabase = await createClient();
		const { data, error } = await supabase.from('foods').select('*').order('created_at', { ascending: false });
		if (error) {
			throw error;
		}
		initialStudents = (data ?? []).map(row => normalizeFood(row as Record<string, unknown>));
	} catch (error) {
		initialError = getRequestErrorMessage(error, 'Could not load foods.');
	}

	return (
		<main className='mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8'>
			<StudentsDashboard initialStudents={initialStudents} initialError={initialError} />
		</main>
	);
}
