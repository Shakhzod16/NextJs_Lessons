'use client';

import { useProductStore } from '@/app/store/UseProductStore';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from '@/components/ui/textarea';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createClient } from '@/utils/supabase/client';
import { useCategoryStore } from '@/app/store/useCategoryStore';
import { Category } from '@/app/types';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'

function Header() {
	const { modalOpen, setVisible, changeForm, productForm, resetForm } = useProductStore();
	const { categories, setCategories } = useCategoryStore();
	const supabase = createClient();
	const router = useRouter();

	useEffect(() => {
		fetchCategories();
	}, []);

	const fetchCategories = async () => {
		const { data, error } = await supabase.from('categories').select('*');
		if (error) {
			console.error(error);
			setCategories([]);
			return;
		}
		setCategories(data as Category[]);
	};

	const handleSave = async () => {
		if (!productForm.title || !productForm.price) {
			alert('Title va Price majburiy!');
			return;
		}

		const { data, error } = await supabase.from('products').insert([
			{
				...productForm,
				price: parseFloat(productForm.price),
				categoryId: productForm.categoryId || null,
			},
		]);

		console.log('error:', error);
		if (error) return;
		setVisible(false);
		router.refresh();
		resetForm();
	};

	const handleImage = async (file: File) => {
		const { data, error } = await supabase.storage.from('Users').upload(`image_${Date.now()}`, file);
		if (error) {
			console.error(error);
			return;
		}
		const { data: urlData } = supabase.storage.from('Users').getPublicUrl(data.path);
		changeForm('imageUrl', urlData.publicUrl);
	};

	return (
		<div className='py-4 shadow-md'>
			<div className='container mx-auto flex items-center justify-between'>
				<h1 className='font-medium'>Shop</h1>
				<Input placeholder='Search' type='search' className='max-w-lg' />
				<Button onClick={() => setVisible(true)}>+ Product</Button>
			</div>
			<Dialog open={modalOpen} onOpenChange={() => setVisible(false)} modal={false}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add Product</DialogTitle>
						<div className='mt-4'>
							<div className='flex items-center justify-center w-full'>
								<label
									htmlFor='dropzone-file'
									className='flex flex-col items-center justify-center w-full h-32 bg-neutral-secondary-medium border border-dashed border-default-strong rounded-base cursor-pointer hover:bg-neutral-tertiary-medium'>
									<div className='flex flex-col items-center justify-center text-body pt-5 pb-6'>
										<svg
											className='w-8 h-8 mb-4'
											aria-hidden='true'
											xmlns='http://www.w3.org/2000/svg'
											width='24'
											height='24'
											fill='none'
											viewBox='0 0 24 24'>
											<path
												stroke='currentColor'
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												d='M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2'
											/>
										</svg>
										<p className='mb-2 text-sm'>
											<span className='font-semibold'>Click to upload</span>
										</p>
									</div>
									<input
										onChange={e => handleImage(e.target.files![0])}
										id='dropzone-file'
										type='file'
										className='hidden'
									/>
								</label>
							</div>
						</div>
						<Input
							value={productForm.title}
							onChange={e => changeForm('title', e.target.value)}
							type='text'
							placeholder='title...'
							className='mt-2'
						/>
						<Textarea
							value={productForm.description}
							onChange={e => changeForm('description', e.target.value)}
							placeholder='description'
						/>
						<Input
							value={productForm.price}
							onChange={e => changeForm('price', e.target.value)}
							type='number'
							placeholder='price...'
							required
							className='mt-2'
						/>
						<Select value={productForm.categoryId} onValueChange={value => changeForm('categoryId', value)}>
							<SelectTrigger className='mt-2 w-full'>
								<SelectValue placeholder='Choose Category' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{categories?.map(category => (
										<SelectItem key={category.id} value={category.id}>
											{category.name}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
						<Button onClick={handleSave} className='mt-4 w-full'>
							Save
						</Button>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default Header;
