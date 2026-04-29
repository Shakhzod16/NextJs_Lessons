import Image from 'next/image';
import { Button } from './ui/button';

function Product() {
	return (
		<div>
			<div className='bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs mb-10'>
				<Image className='rounded-base' src='/docs/images/blog/image-1.jpg' alt='' width={200} height={200} />

				<h5 className='mt-6 mb-2 text-2xl font-semibold tracking-tight text-heading line-clamp-1'>
					Streamlining your design process today.
				</h5>

				<p className='mb-6 text-body line-clamp-2'>
					In today’s fast-paced digital landscape, fostering seamless collaboration among Developers and IT Operations.
				</p>
				<Button className='cursor-pointer'>Add to Cart</Button>
			</div>
		</div>
	);
}

export default Product;
