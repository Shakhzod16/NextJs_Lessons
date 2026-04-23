'use client';

import { Button } from '@/components/ui/button';
import { getStudentInitials, maskPassword } from '../_lib/studentsApi';
import { useStudentStore } from '../store/useStudentStore';

export default function StudentTable() {
	const students = useStudentStore((state) => state.students);
	const openEditDialog = useStudentStore((state) => state.openEditDialog);
	const removeStudent = useStudentStore((state) => state.removeStudent);

	return (
		<div className='overflow-hidden rounded-2xl border border-slate-200 bg-blue shadow-sm'>
			<table className='min-w-full divide-y divide-slate-200 text-left text-sm'>
				<thead className='bg-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-500'>
					<tr>
						<th className='px-6 py-3'>Student</th>
						<th className='px-6 py-3'>Email</th>
						<th className='px-6 py-3'>Phone</th>
						<th className='px-6 py-3'>Password</th>
						<th className='px-6 py-3 text-right'>Actions</th>
					</tr>
				</thead>
				<tbody className='divide-y divide-slate-100'>
					{students.map((student) => (
						<tr key={student.id} className='text-slate-700'>
							<td className='px-6 py-4'>
								<div className='flex items-center gap-3'>
									<span className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white'>
										{getStudentInitials(student.fullName)}
									</span>
									<span className='font-medium text-slate-900'>{student.fullName}</span>
								</div>
							</td>
							<td className='px-6 py-4'>{student.email}</td>
							<td className='px-6 py-4'>{student.phone}</td>
							<td className='px-6 py-4'>{maskPassword(student.password)}</td>
							<td className='px-6 py-4'>
								<div className='flex justify-end gap-2'>
									<Button variant='outline' size='sm' onClick={() => openEditDialog(student)}>
										Edit
									</Button>
									<Button variant='destructive' className='bg-warning' size='sm' onClick={() => removeStudent(student.id)}>
										Delete
									</Button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
