import Categories from '@/components/Categories';
import Header from '@/components/Header';
import Products from '@/components/Products';
import { createClient } from '@/utils/supabase/server';
import { Category, Product } from './types';

type SearchParams = { [key: string]: string | string[] | undefined };
interface Props {
	searchParams: Promise<SearchParams>;
}

const Home = async ({ searchParams }: Props) => {
	const supabase = await createClient();
  const prams = await searchParams;

	const { data: categoryData } = await supabase.from('categories').select('*')
	const { data: productData } = await supabase
		.from('products')
		.select('*, category:categories(name)')
		.eq('categoryId', prams.categoryId);;

	return (
		<div className=''>
			<Header />
			<Categories categories={categoryData as Category[]} />
			<Products products={productData as Product[]} />
		</div>
	);
};

export default Home;
