interface DashboardCardProps {
    children: React.ReactNode;
    className?: string;
    accentColor?: 'emerald' | 'blue';
}

export function DashboardCard({
    children,
    className = '',
    accentColor = 'emerald'
}: DashboardCardProps) {
    const blurColor = accentColor === 'emerald' ? 'bg-emerald-500/5' : 'bg-blue-500/5';
    const borderColor = accentColor === 'emerald'
        ? 'border-emerald-500/30 hover:border-emerald-500/50'
        : 'border-blue-500/30 hover:border-blue-500/50';

    return (
        <div className={`relative bg-linear-to-br from-neutral-800 to-neutral-800/90 border 
            ${borderColor} rounded-xl p-6 shadow-lg transition-all duration-300 overflow-hidden ${className}`}>
            <div className={`absolute top-0 right-0 w-32 h-32 ${blurColor} rounded-full blur-3xl -mr-16 -mt-16`} />
            {children}
        </div>
    );
}
