import { LucideIcon } from 'lucide-react'

interface CardHeaderProps {
    icon: LucideIcon
    title: string
    description?: string
}

export function CardHeader({
    icon: Icon,
    title,
    description = '',
}: CardHeaderProps) {
    return (
        <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <Icon className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-sm font-semibold text-neutral-300
            uppercase tracking-wide">{title}</h3>
            <p className="text-xs text-neutral-400 ml-auto">{description}</p>
        </div>
    )
}
