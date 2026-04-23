import StudentsDashboard from './_components/StudentsDashboard';
import { getRequestErrorMessage, getStudents } from './_lib/studentsApi';
import type { Student } from './types/student';

export default async function Page() {
	let initialStudents: Student[] = [];
	let initialError: string | null = null;

	try {
		initialStudents = await getStudents();
	} catch (error) {
		initialError = getRequestErrorMessage(error, 'Could not load students.');
	}

	return (
		<main className='mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8'>
			<StudentsDashboard initialStudents={initialStudents} initialError={initialError} />
		</main>
	);
}
