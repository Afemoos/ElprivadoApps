import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'ghost' | 'outline';
    color?: 'indigo' | 'green' | 'red';
    isLoading?: boolean;
    icon?: ReactNode;
    children: ReactNode;
}

export function Button({
    variant = 'primary',
    color = 'indigo',
    isLoading,
    icon,
    children,
    className = '',
    disabled,
    ...props
}: ButtonProps) {

    const baseStyles = "flex items-center justify-center gap-2 rounded-xl transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

    const colorStyles = {
        indigo: {
            primary: "bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30",
            ghost: "bg-white/5 hover:bg-white/10 text-white hover:text-indigo-400",
            outline: "border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10"
        },
        green: {
            primary: "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white shadow-lg shadow-green-500/20 hover:shadow-green-500/30",
            ghost: "bg-white/5 hover:bg-white/10 text-white hover:text-green-400",
            outline: "border border-green-500/30 text-green-400 hover:bg-green-500/10"
        },
        red: {
            primary: "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/30",
            ghost: "bg-white/5 hover:bg-white/10 text-white hover:text-red-400",
            outline: "border border-red-500/30 text-red-400 hover:bg-red-500/10"
        }
    };

    const sizeStyles = "py-3 px-6";

    return (
        <button
            className={`${baseStyles} ${colorStyles[color][variant]} ${sizeStyles} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : icon}
            {children}
        </button>
    );
}
