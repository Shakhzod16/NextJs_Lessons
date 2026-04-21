"use client"

import { useCounterStore } from './store/useCounterStore';

export default function Home() {
	const { count, increment, decrement, reset, increseByTen } = useCounterStore();

	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<h1 className='text-4xl font-bold'>Counter: {count}</h1>
			<div className='space-x-4 flex gap-3'>
				<button onClick={increment} className='px-4 py-2 bg-green-500 text-white rounded'>Increment</button>
				<button onClick={decrement} className='px-4 py-2 bg-red-500 text-white rounded'>Decrement</button>
				<button onClick={reset} className='px-4 py-2 bg-gray-500 text-white rounded'>Reset</button>
				<button onClick={increseByTen} className='px-4 py-2 bg-blue-500 text-white rounded'>Increment by 10</button>
			</div>
		</main>
	);
}