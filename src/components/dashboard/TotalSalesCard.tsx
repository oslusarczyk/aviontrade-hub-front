import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from 'convex/_generated/api'
import { formatNumber } from '@/lib/utils'
import { convexQuery } from '@convex-dev/react-query'

interface TotalSalesCardProps {
    personaId: number
}

export function TotalSalesCard({ personaId }: TotalSalesCardProps) {
    const [selectedPeriod, setSelectedPeriod] = useState<number>(7)

    const { data: salesData } = useQuery({
        ...convexQuery(api.trades.showSales, {
            personaId,
            period: selectedPeriod,
        }),
        placeholderData: (previousData) => previousData,
    })

    const { amountSold = 0, totalSales = 0 } = salesData ?? {}

    return (
        <div className="relative bg-neutral-800 border border-emerald-500/30 rounded-xl p-4">
            <div className="absolute top-2 right-2 flex gap-1.5">
                {[1, 7, 30, 365].map((days) => (
                    <button
                        key={days}
                        onClick={() => setSelectedPeriod(days)}
                        className={`px-2 py-1 rounded text-xs font-medium transition-colors ${selectedPeriod === days
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-neutral-700/50 hover:bg-neutral-700 text-neutral-300 border border-transparent'
                            }`}
                    >
                        {days}d
                    </button>
                ))}
            </div>

            <div className="pr-28">
                <p className="text-neutral-400 text-xs mb-1">Total Sales</p>
                <p className="text-emerald-400 text-2xl font-bold mb-0.5">
                    {formatNumber(totalSales)}
                </p>
                <p className="text-neutral-500 text-xs">
                    {formatNumber(amountSold)} items
                </p>
            </div>
        </div>
    )
}