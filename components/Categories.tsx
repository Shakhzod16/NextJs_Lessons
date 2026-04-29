import CategoryCard from './CategoryCard';

function Categories() {
	return (
		<div className='container mx-auto mt-4 flex items-center gap-4 overflow-x-auto'>
			<CategoryCard />
			<CategoryCard />
			<CategoryCard />
			<CategoryCard />
			<CategoryCard />
			<CategoryCard />
		</div>
	);
}

export default Categories;
