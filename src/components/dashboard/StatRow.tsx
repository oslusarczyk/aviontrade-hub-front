import { LucideIcon } from 'lucide-react'

interface StatRowProps {
    icon: LucideIcon
    label: string
    value: string | number
    valueClassName?: string
    containerClassName?: string
    iconClassName?: string
    labelClassName?: string
}

export function StatRow({
    icon: Icon,
    label,
    value,
    valueClassName = 'text-sm font-semibold text-neutral-200',
    containerClassName = '',
    iconClassName = 'text-neutral-500',
    labelClassName = 'text-sm text-neutral-400'
}: StatRowProps) {
    return (
        <div className={`flex items-center justify-between ${containerClassName}`}>
            <div className="flex items-center gap-2">
                <Icon className={`w-4 h-4 ${iconClassName}`} />
                <span className={labelClassName}>{label}</span>
            </div>
            <span className={valueClassName}>
                {value}
            </span>
        </div>
    )
}
