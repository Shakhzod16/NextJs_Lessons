'use client';

import { useRouter } from 'next/navigation';
import { Category as CategoryType } from '@/app/types';
import CategoryCard from './CategoryCard';

interface CategoriesProps {
	categories: CategoryType[];
}

function Categories({ categories }: CategoriesProps) {
	const router = useRouter();

	const handleClick = (categoryId: string) => {
		router.push(`/?categoryId=${categoryId}`);
	};

	return (
		<div className='container mx-auto mt-4 flex items-center gap-4 overflow-x-auto'>
			<CategoryCard name='All' onClick={() => handleClick('')} />
			{categories?.map(category => (
				<CategoryCard name={category.name} key={category.id} onClick={() => handleClick(category.id)} />
			))}
		</div>
	);
}

export default Categories;
