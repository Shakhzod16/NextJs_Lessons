import axios from 'axios';
import type { Student, StudentFormValues } from '../types/student';

export const STUDENTS_API_URL = process.env.NEXT_PUBLIC_STUDENTS_API_URL ?? 'http://127.0.0.1:4000/students';

export async function getStudents() {
	const response = await fetch(STUDENTS_API_URL, {
		cache: 'no-store',
	});

	if (!response.ok) {
		throw new Error(`Failed to load students (${response.status})`);
	}

	return (await response.json()) as Student[];
}

export async function createStudent(payload: StudentFormValues) {
	const { data } = await axios.post<Student>(STUDENTS_API_URL, payload);
	return data;
}

export async function updateStudent(id: Student['id'], payload: StudentFormValues) {
	const { data } = await axios.patch<Student>(`${STUDENTS_API_URL}/${id}`, payload);
	return data;
}

export async function deleteStudent(id: Student['id']) {
	await axios.delete(`${STUDENTS_API_URL}/${id}`);
}

export function getRequestErrorMessage(error: unknown, fallback = 'Something went wrong. Please try again.') {
	if (axios.isAxiosError(error)) {
		if (error.code === 'ERR_NETWORK') {
			return 'JSON Server is unreachable. Start `npm run server` and try again.';
		}

		if (typeof error.response?.data === 'string' && error.response.data.trim().length > 0) {
			return error.response.data;
		}

		return error.message || fallback;
	}

	if (error instanceof Error && error.message.trim().length > 0) {
		return error.message;
	}

	return fallback;
}

export function getStudentInitials(fullName: string) {
	return fullName
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map((namePart) => namePart[0]?.toUpperCase() ?? '')
		.join('');
}

export function maskPassword(password: string) {
	return '*'.repeat(Math.max(8, Math.min(password.length, 12)));
}
