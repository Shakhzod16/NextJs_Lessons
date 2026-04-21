import axios from 'axios';
import UsersTable from './_components/UsersTable';
import { USERS_API_URL } from './_lib/usersApi';

const HomePage = async () => {
	let data: Array<Record<string, unknown>> = [];

	try {
		const response = await axios.get<Array<Record<string, unknown>>>(USERS_API_URL);
		data = response.data;
	} catch (error) {
		console.error('Users API is not available:', error);
	}

	return (
		<div className='min-vh-100 bg-light py-4'>
			<div className='container'>
				<UsersTable users={data} />
			</div>
		</div>
	);
};

export default HomePage;
