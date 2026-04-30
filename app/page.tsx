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
	const params = await searchParams;

	const { data: categoryData } = await supabase.from('categories').select('*');
	const { data: productData } = params.categoryId
		? await supabase.from('products').select('*, category:categories(id,name)').eq('categoryId', params.categoryId)
		: await supabase.from('products').select('*, category:categories(id,name)');

	return (
		<div className=''>
			<Header />
			<Categories categories={categoryData as Category[]} />
			<Products products={productData as Product[]} />
		</div>
	);
};

export default Home;
