export interface Student {
	id: string | number;
	fullName: string;
	email: string;
	phone: string;
	password: string;
}

export type StudentFormValues = Omit<Student, 'id'>;
