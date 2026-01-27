import { LucideIcon } from 'lucide-react'

interface StatRowProps {
    icon?: LucideIcon
    label: string
    value: string | number
    salesProp?: boolean
    valueClassName?: string
    containerClassName?: string
    iconClassName?: string
    labelClassName?: string
}

export function StatRow({
    icon: Icon,
    label,
    value,
    salesProp = false,
    valueClassName,
    containerClassName = '',
    iconClassName = 'text-neutral-500',
    labelClassName
}: StatRowProps) {
    const textSize = salesProp ? 'text-xs' : 'text-sm';

    return (
        <div className={`flex items-center justify-between ${containerClassName}`}>
            <div className="flex items-center gap-2">
                {Icon && <Icon className={`w-4 h-4 ${iconClassName}`} />}
                <span className={labelClassName ?? `${textSize} text-neutral-400`}>{label}</span>
            </div>
            <span className={valueClassName ?? `${textSize} font-semibold text-neutral-200`}>
                {value}
            </span>
        </div>
    )
}
