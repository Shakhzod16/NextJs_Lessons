'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import type { Food } from '../types/food';
import StudentModal from './StudentModal';
import StudentTable from './StudentTable';
import { useFoodStore } from '../store/useFoodStore';

interface StudentsDashboardProps {
	initialStudents: Food[];
	initialError: string | null;
}

export default function StudentsDashboard({ initialStudents, initialError }: StudentsDashboardProps) {
	const bootstrap = useFoodStore(state => state.bootstrap);
	const openCreateDialog = useFoodStore(state => state.openCreateDialog);
	const error = useFoodStore(state => state.error);
	const clearError = useFoodStore(state => state.clearError);

	useEffect(() => {
		bootstrap(initialStudents, initialError);
	}, [bootstrap, initialError, initialStudents]);

	return (
		<section className='space-y-6'>
			<div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
				<div className='space-y-1'>
					<h1 className='text-5xl font-semibold tracking-tight text-slate-950'>Menu</h1>
				</div>

				<Button className='self-start rounded-full px-5' onClick={openCreateDialog}>
					<span className='text-base leading-none'>+</span>
					Food
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
