import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    hoverEffect?: boolean;
    color?: 'indigo' | 'green' | 'red';
}

export function Card({ children, className = '', hoverEffect = false, color = 'indigo', ...props }: CardProps) {
    const hoverStyles = hoverEffect
        ? `transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-${color}-500/20`
        : '';

    return (
        <div
            className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 ${hoverStyles} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
