import Product from './Product';

function Products() {
	return (
		<div className='mt-4 container mx-auto grid grid-cols-4 gap-4'>
			<Product />
			<Product />
		</div>
	);
}

export default Products;
