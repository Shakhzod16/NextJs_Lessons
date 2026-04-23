'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import type { Student } from '../types/student';
import StudentModal from './StudentModal';
import StudentTable from './StudentTable';
import { useStudentStore } from '../store/useStudentStore';

interface StudentsDashboardProps {
	initialStudents: Student[];
	initialError: string | null;
}

export default function StudentsDashboard({ initialStudents, initialError }: StudentsDashboardProps) {
	const bootstrap = useStudentStore((state) => state.bootstrap);
	const openCreateDialog = useStudentStore((state) => state.openCreateDialog);
	const error = useStudentStore((state) => state.error);
	const clearError = useStudentStore((state) => state.clearError);

	useEffect(() => {
		bootstrap(initialStudents, initialError);
	}, [bootstrap, initialError, initialStudents]);

	return (
		<section className='space-y-6'>
			<div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
				<div className='space-y-1'>
					<h1 className='text-3xl font-semibold tracking-tight text-slate-950'>Students</h1>
				</div>

				<Button className='self-start rounded-full px-5' onClick={openCreateDialog}>
					<span className='text-base leading-none'>+</span>
					Student
				</Button>
			</div>

			{error && (
				<div className='flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-700 sm:flex-row sm:items-center sm:justify-between'>
					<p>{error}</p>
					<Button variant='ghost' size='sm' className='self-start text-amber-700 hover:bg-amber-100' onClick={clearError}>
						Dismiss
					</Button>
				</div>
			)}

			<StudentTable />
			<StudentModal />
		</section>
	);
}
