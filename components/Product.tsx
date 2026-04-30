import Image from 'next/image';
import { Button } from './ui/button';
import { Product as ProductType } from '@/app/types';

interface ProductProps {
	product: ProductType;
}

function Product({ product }: ProductProps) {
	return (
		<div className='bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs mb-10 relative'>
			{product.imageUrl && (
				<Image className='rounded-base' src={product.imageUrl} alt={product.title} width={200} height={200} />
			)}
			<h5 className='mt-6 mb-2 text-2xl font-semibold tracking-tight text-heading line-clamp-1'>{product.title}</h5>
			<p className='mb-6 text-body line-clamp-2'>{product.description}</p>
			<div className='px-4 py-2 rounded-lg bg-gray-400 w-15 text-xs flex items-center justify-center absolute top-3 right-3'>
				{product.category?.name}
			</div>
			<Button className='cursor-pointer'>${product.price.toLocaleString()}UZS</Button>
		</div>
	);
}

export default Product;
