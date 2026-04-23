import { create } from 'zustand';
import { createStudent, deleteStudent, getRequestErrorMessage, updateStudent } from '../_lib/studentsApi';
import type { Student, StudentFormValues } from '../types/student';

interface StudentState {
	students: Student[];
	error: string | null;
	isDialogOpen: boolean;
	editingStudent: Student | null;
	bootstrap: (students: Student[], initialError: string | null) => void;
	clearError: () => void;
	openCreateDialog: () => void;
	openEditDialog: (student: Student) => void;
	closeDialog: () => void;
	createStudent: (payload: StudentFormValues) => Promise<void>;
	updateStudent: (payload: StudentFormValues) => Promise<void>;
	removeStudent: (studentId: Student['id']) => Promise<void>;
}

export const useStudentStore = create<StudentState>((set, get) => ({
	students: [],
	error: null,
	isDialogOpen: false,
	editingStudent: null,
	bootstrap: (students, initialError) => set({ students, error: initialError }),
	clearError: () => set({ error: null }),
	openCreateDialog: () => set({ isDialogOpen: true, editingStudent: null, error: null }),
	openEditDialog: student => set({ isDialogOpen: true, editingStudent: student, error: null }),
	closeDialog: () => set({ isDialogOpen: false, editingStudent: null }),
	createStudent: async payload => {
		try {
			const createdStudent = await createStudent(payload);
			set(state => ({
				students: [...state.students, createdStudent],
				isDialogOpen: false,
				editingStudent: null,
				error: null,
			}));
		} catch (error) {
			set({ error: getRequestErrorMessage(error, 'Could not create student.') });
		}
	},
	updateStudent: async payload => {
		const studentToEdit = get().editingStudent;
		if (!studentToEdit) return;

		try {
			const updatedStudent = await updateStudent(studentToEdit.id, payload);
			set(state => ({
				students: state.students.map(student => (student.id === updatedStudent.id ? updatedStudent : student)),
				isDialogOpen: false,
				editingStudent: null,
				error: null,
			}));
		} catch (error) {
			set({ error: getRequestErrorMessage(error, 'Could not update student.') });
		}
	},
	removeStudent: async studentId => {
		try {
			await deleteStudent(studentId);
			set(state => ({
				students: state.students.filter(student => student.id !== studentId),
				error: null,
			}));
		} catch (error) {
			set({ error: getRequestErrorMessage(error, 'Could not delete student.') });
		}
	},
}));
