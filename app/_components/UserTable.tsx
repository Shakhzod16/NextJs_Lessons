'use client';

import axios from 'axios';
import { useState } from 'react';
import { USERS_API_URL } from '../_lib/usersApi';

type User = {
	id: number;
	name: string;
	age: number;
	isStudent: boolean;
};

interface UserTableProps {
	users: Array<Partial<User>>;
}

const UserTable = ({ users }: UserTableProps) => {
	const [rows, setRows] = useState<User[]>(
		users.map((user, index) => ({
			id: typeof user.id === 'number' ? user.id : index + 1,
			name: user.name?.trim() || 'No name',
			age: typeof user.age === 'number' ? user.age : 0,
			isStudent: typeof user.isStudent === 'boolean' ? user.isStudent : false,
		})),
	);
	const [name, setName] = useState('');
	const [age, setAge] = useState('');
	const [isStudent, setIsStudent] = useState(false);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [requestError, setRequestError] = useState<string | null>(null);

	const getRequestErrorMessage = (error: unknown) => {
		if (axios.isAxiosError(error)) {
			if (error.code === 'ERR_NETWORK') {
				return 'Cannot connect to Users API';
			}

			if (typeof error.response?.data === 'string' && error.response.data.length > 0) {
				return error.response.data;
			}

			return error.message;
		}

		return 'Please try again.';
	};

	const resetForm = () => {
		setName('');
		setAge('');
		setIsStudent(false);
		setEditingId(null);
	};

	const saveUser = async () => {
		const trimmedName = name.trim();
		const parsedAge = Number(age);
		if (!trimmedName || Number.isNaN(parsedAge)) {
			return;
		}

		try {
			if (editingId !== null) {
				const { data: updatedUser } = await axios.patch<User>(`${USERS_API_URL}/${editingId}`, {
					name: trimmedName,
					age: parsedAge,
					isStudent,
				});

				setRows((prevRows) => prevRows.map((user) => (user.id === editingId ? updatedUser : user)));
				setRequestError(null);
				resetForm();
				return;
			}

			const { data: createdUser } = await axios.post<User>(USERS_API_URL, {
				name: trimmedName,
				age: parsedAge,
				isStudent,
			});

			setRows((prevRows) => [...prevRows, createdUser]);
			setRequestError(null);
			resetForm();
		} catch (error) {
			setRequestError(getRequestErrorMessage(error));
		}
	};

	const handleDelete = async (id: number) => {
		try {
			await axios.delete(`${USERS_API_URL}/${id}`);
			setRows((prevRows) => prevRows.filter((user) => user.id !== id));
			setRequestError(null);
			if (editingId === id) {
				resetForm();
			}
		} catch (error) {
			setRequestError(getRequestErrorMessage(error));
		}
	};

	const handleEdit = (user: User) => {
		setName(user.name);
		setAge(String(user.age));
		setIsStudent(user.isStudent);
		setEditingId(user.id);
	};

	return (
		<div>
			{requestError && (
				<div className='alert alert-danger' role='alert' aria-live='polite'>
					{requestError}
				</div>
			)}

			<div className='card mx-auto mb-2' style={{ maxWidth: '300px' }}>
				<div className='card-header bg-dark text-white text-center'>{editingId === null ? 'Add User' : 'Edit User'}</div>
				<div>
					<div className='card-body'>
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							type='text'
							placeholder='name...'
							className='form-control'
						/>
						<input
							value={age}
							onChange={(e) => setAge(e.target.value)}
							type='number'
							placeholder='age...'
							className='form-control mt-2'
						/>
						<input
							checked={isStudent}
							onChange={(e) => setIsStudent(e.target.checked)}
							type='checkbox'
							className='form-check-input mt-2'
						/>
					</div>
					<div className='card-footer'>
						<button type='button' className='btn btn-dark w-100' onClick={saveUser}>
							{editingId === null ? 'Save' : 'Update'}
						</button>
					</div>
				</div>
			</div>

			<div className='table-responsive'>
				<table className='table'>
					<thead className='table-dark'>
						<tr>
							<th>N</th>
							<th>Name</th>
							<th>Age</th>
							<th>IsStudent</th>
							<th>Actions</th>
						</tr>
					</thead>

					<tbody>
						{rows.map((user, index) => (
							<tr key={user.id}>
								<td>{index + 1}</td>
								<td>{user.name}</td>
								<td>{user.age}</td>
								<td>{String(user.isStudent)}</td>
								<td>
									<button type='button' className='btn btn-danger btn-sm me-2' onClick={() => handleDelete(user.id)}>
										x
									</button>
									<button type='button' className='btn btn-warning btn-sm' onClick={() => handleEdit(user)}>
										edit
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default UserTable;
