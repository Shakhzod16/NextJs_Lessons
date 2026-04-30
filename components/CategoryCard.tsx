interface CategoryProps {
	name: string;
	onClick: () => void;
}

function CategoryCard({ name, onClick }: CategoryProps) {
	return (
		<div
			onClick={onClick}
			className='w-50 h-17.5 border rounded-lg flex items-center justify-center font-medium cursor-pointer active:scale-110 transition-all duration-300 mt-4 mb-4 hover:bg-gray-100 shrink-0'>
			{name}
		</div>
	);
}

export default CategoryCard;
