import * as React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
type ButtonSize = 'default' | 'sm' | 'icon';

const buttonVariants: Record<ButtonVariant, string> = {
	default: 'bg-slate-950 text-white shadow-sm hover:bg-slate-800',
	secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
	outline: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
	ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
	destructive: 'border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100',
};

const buttonSizes: Record<ButtonSize, string> = {
	default: 'h-10 px-4 py-2',
	sm: 'h-9 px-3 text-sm',
	icon: 'h-10 w-10',
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant = 'default', size = 'default', type = 'button', ...props }, ref) => {
		return (
			<button
				ref={ref}
				type={type}
				className={cn(
					'inline-flex shrink-0 items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 disabled:pointer-events-none disabled:opacity-50',
					buttonVariants[variant],
					buttonSizes[size],
					className,
				)}
				{...props}
			/>
		);
	},
);

Button.displayName = 'Button';

export { Button };
