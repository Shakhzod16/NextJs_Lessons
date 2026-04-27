'use client';

import { Button } from '@/components/ui/button';
import { formatPrice } from '../_lib/foodsApi';
import { useFoodStore } from '../store/useFoodStore';

export default function StudentTable() {
	const foods = useFoodStore(state => state.foods);
	const openEditDialog = useFoodStore(state => state.openEditDialog);
	const removeFood = useFoodStore(state => state.removeFood);

	return (
		<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
			{foods.map(food => (
				<article key={food.id} className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
					<img src={food.imageUrl} alt={food.name} className='h-44 w-full object-cover' />
					<div className='space-y-4 p-5'>
						<div className='flex items-start justify-between gap-3'>
							<h3 className='text-2xl font-semibold text-slate-900'>{food.name}</h3>
							<span className='whitespace-nowrap text-xl font-semibold text-slate-900'>{formatPrice(food.price)}</span>
						</div>
						<p className='text-lg text-slate-600'>{food.description}</p>
						<span
							className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
								food.isAvailable ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
							}`}
						>
							{food.isAvailable ? 'Mavjud' : 'Mavjud emas'}
						</span>
						<div className='flex justify-end gap-2'>
							<Button variant='outline' size='sm' onClick={() => openEditDialog(food)}>
								Edit
							</Button>
							<Button variant='destructive' size='sm' onClick={() => removeFood(food.id)}>
								Delete
							</Button>
						</div>
					</div>
				</article>
			))}
		</div>
	);
}
