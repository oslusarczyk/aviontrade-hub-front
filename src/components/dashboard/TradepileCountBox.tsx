import { LucideIcon } from 'lucide-react'

interface TradepileCountBoxProps {
    icon: LucideIcon
    label: string
    value: number
}

export function TradepileCountBox({
    icon: Icon,
    label,
    value,
}: TradepileCountBoxProps) {
    return (
        <div className="bg-neutral-700/30 rounded-lg p-3 border border-neutral-600/30">
            <div className="flex items-center gap-2 mb-1">
                <Icon className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-neutral-400">{label}</span>
            </div>
            <p className="text-xl font-bold text-emerald-400">
                {value}
            </p>
        </div>
    )
}
