'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type DialogContextValue = {
	onOpenChange: (open: boolean) => void;
};

const DialogContext = React.createContext<DialogContextValue | null>(null);

function useDialogContext() {
	const context = React.useContext(DialogContext);

	if (!context) {
		throw new Error('Dialog components must be used inside <Dialog>.');
	}

	return context;
}

interface DialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: React.ReactNode;
}

function Dialog({ open, onOpenChange, children }: DialogProps) {
	React.useEffect(() => {
		if (!open) {
			return;
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onOpenChange(false);
			}
		};

		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			document.body.style.overflow = originalOverflow;
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [open, onOpenChange]);

	if (!open) {
		return null;
	}

	return <DialogContext.Provider value={{ onOpenChange }}>{children}</DialogContext.Provider>;
}

type DialogContentProps = React.HTMLAttributes<HTMLDivElement>;

function DialogContent({ className, children, ...props }: DialogContentProps) {
	const { onOpenChange } = useDialogContext();

	return (
		<div className='fixed inset-0 z-50'>
			<div className='absolute inset-0 bg-slate-950/45 backdrop-blur-sm' onClick={() => onOpenChange(false)} />
			<div className='absolute left-1/2 top-1/2 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2'>
				<div
					role='dialog'
					aria-modal='true'
					className={cn(
						'relative rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_30px_80px_-32px_rgba(15,23,42,0.45)]',
						className,
					)}
					{...props}
				>
					<button
						type='button'
						aria-label='Close dialog'
						onClick={() => onOpenChange(false)}
						className='absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900'
					>
						<svg viewBox='0 0 24 24' className='h-4 w-4' fill='none' stroke='currentColor' strokeWidth='2'>
							<path strokeLinecap='round' strokeLinejoin='round' d='M6 6l12 12M18 6L6 18' />
						</svg>
					</button>
					{children}
				</div>
			</div>
		</div>
	);
}

function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={cn('mb-6 space-y-2', className)} {...props} />;
}

function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
	return <h2 className={cn('pr-10 text-2xl font-semibold tracking-tight text-slate-950', className)} {...props} />;
}

function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
	return <p className={cn('text-sm text-slate-500', className)} {...props} />;
}

function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={cn('mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end', className)} {...props} />;
}

export { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle };
