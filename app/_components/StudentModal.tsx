'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useStudentStore } from '../store/useStudentStore';
import type { StudentFormValues } from '../types/student';

export default function StudentModal() {
	const isDialogOpen = useStudentStore(state => state.isDialogOpen);
	const editingStudent = useStudentStore(state => state.editingStudent);
	const closeDialog = useStudentStore(state => state.closeDialog);
	const createStudent = useStudentStore(state => state.createStudent);
	const updateStudent = useStudentStore(state => state.updateStudent);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const payload: StudentFormValues = {
			fullName: String(formData.get('fullName') ?? ''),
			email: String(formData.get('email') ?? ''),
			phone: String(formData.get('phone') ?? ''),
			password: String(formData.get('password') ?? ''),
		};

		if (editingStudent) {
			await updateStudent(payload);
			return;
		}
		await createStudent(payload);
	};

	return (
		<Dialog open={isDialogOpen} onOpenChange={open => !open && closeDialog()}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{editingStudent ? 'Edit Student' : 'Add Student'}</DialogTitle>
					<DialogDescription>Fill all fields to save student information.</DialogDescription>
				</DialogHeader>

				<form key={editingStudent?.id ?? 'new'} className='space-y-4' onSubmit={handleSubmit}>
					<Input name='fullName' required placeholder='Full name' defaultValue={editingStudent?.fullName ?? ''} />
					<Input name='email' required type='email' placeholder='Email' defaultValue={editingStudent?.email ?? ''} />
					<Input name='phone' required placeholder='Phone' defaultValue={editingStudent?.phone ?? ''} />
					<Input
						name='password'
						required
						type='password'
						placeholder='Password'
						defaultValue={editingStudent?.password ?? ''}
					/>

					<DialogFooter>
						<Button variant='outline' type='button' onClick={closeDialog}>
							Cancel
						</Button>
						<Button type='submit'>{editingStudent ? 'Save changes' : 'Add student'}</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
