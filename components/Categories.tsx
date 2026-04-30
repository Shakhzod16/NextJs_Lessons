'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Category as CategoryType } from '@/app/types';
import CategoryCard from './CategoryCard';

interface CategoriesProps {
	categories: CategoryType[];
}

function Categories({ categories }: CategoriesProps) {
	const router = useRouter();

	const params = useSearchParams();

	const handleClick = (categoryId: string) => {
		router.push(`/?categoryId=${categoryId}`);
	};

	return (
		<div className='container mx-auto mt-4 flex items-center gap-4 overflow-x-auto'>
			<CategoryCard isActive={params.get('categoryId') === null} name='All' onClick={() => router.push(`/`)} />
			{categories?.map(category => (
				<CategoryCard
					name={category.name}
					key={category.id}
					onClick={() => handleClick(category.id)}
					isActive={category.id === params.get('categoryId')}
				/>
			))}
		</div>
	);
}

export default Categories;
