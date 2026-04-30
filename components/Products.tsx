import { Product as ProductType } from '@/app/types'
import Product from './Product';

interface ProductsProps {
	products: ProductType[];
}

function Products({ products }: ProductsProps) {
	console.log('products in component:', products);
	return (
		<div className='mt-4 container mx-auto grid grid-cols-4 gap-4'>
			{products?.map(product => (
				<Product key={product.id} product={product}/>
			))}
		</div>
	);
}

export default Products;
