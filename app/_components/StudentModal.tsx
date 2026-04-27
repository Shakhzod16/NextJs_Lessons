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
import { useFoodStore } from '../store/useFoodStore';
import type { FoodFormValues } from '../types/food';

export default function StudentModal() {
	const isDialogOpen = useFoodStore(state => state.isDialogOpen);
	const editingFood = useFoodStore(state => state.editingFood);
	const closeDialog = useFoodStore(state => state.closeDialog);
	const createFood = useFoodStore(state => state.createFood);
	const updateFood = useFoodStore(state => state.updateFood);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const payload: FoodFormValues = {
			name: String(formData.get('name') ?? ''),
			description: String(formData.get('description') ?? ''),
			imageUrl: String(formData.get('imageUrl') ?? ''),
			price: Number(formData.get('price') ?? 0),
			isAvailable: formData.get('isAvailable') === 'on',
		};

		if (editingFood) {
			await updateFood(payload);
			return;
		}
		await createFood(payload);
	};

	return (
		<Dialog open={isDialogOpen} onOpenChange={open => !open && closeDialog()}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{editingFood ? 'Edit Food' : 'Add Food'}</DialogTitle>
					<DialogDescription>Ovqat ma&apos;lumotlarini to&apos;ldirib saqlang.</DialogDescription>
				</DialogHeader>

				<form key={editingFood?.id ?? 'new'} className='space-y-4' onSubmit={handleSubmit}>
					<Input name='name' required placeholder='Ovqat nomi' defaultValue={editingFood?.name ?? ''} />
					<Input name='imageUrl' required type='url' placeholder='Rasm URL' defaultValue={editingFood?.imageUrl ?? ''} />
					<Input
						name='description'
						required
						placeholder='Description'
						defaultValue={editingFood?.description ?? ''}
					/>
					<Input
						name='price'
						required
						type='number'
						min='0'
						step='1000'
						placeholder='Narxi'
						defaultValue={editingFood?.price ?? ''}
					/>
					<label className='flex items-center gap-2 text-sm text-slate-700'>
						<input
							name='isAvailable'
							type='checkbox'
							className='h-4 w-4 rounded border-slate-300'
							defaultChecked={editingFood?.isAvailable ?? true}
						/>
						Mavjud
					</label>

					<DialogFooter>
						<Button variant='outline' type='button' onClick={closeDialog}>
							Cancel
						</Button>
						<Button type='submit'>{editingFood ? 'Save changes' : 'Add food'}</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
