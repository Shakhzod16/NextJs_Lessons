'use client';

import Image from 'next/image'

export default function Page() {
	return (
		<section className='space-y-10'>
			<h1 className='text-4xl font-bold'>Xabarlar ro&apos;yxati</h1>
			<p className='text-center text-xl text-gray-700'>Yangi xabarlarni kashf qilish uchun qidiruvdan foydalaning.</p>
			<Image src='' alt='' width={100} height={400} loading='lazy'/>
			{/* <button onClick={test}>hello world</button> */}
		</section>
	);
}
