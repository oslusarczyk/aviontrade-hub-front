import { useQuery } from '@tanstack/react-query'
import { api } from 'convex/_generated/api'
import { formatNumber } from '@/lib/utils'
import { convexQuery } from '@convex-dev/react-query'
import { usePersona } from '@/contexts/persona-context'
import { TrendingUp, Package, DollarSign, Award } from 'lucide-react'
import { StatRow } from './StatRow'
import { CardHeader } from './CardHeader'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { DashboardCard } from './DashboardCard'

export function TotalSalesCard({ className }: { className?: string }) {
    const [selectedPeriod, setSelectedPeriod] = useLocalStorage<number>('selectedPeriod', 7)
    const { selectedPersonaId: personaId } = usePersona()

    const { data: salesData } = useQuery({
        ...convexQuery(api.trades.showSales, personaId ? { personaId, period: selectedPeriod } : "skip"),
        placeholderData: (previousData) => previousData,
    })

    const handlePeriodChange = (days: number) => {
        setSelectedPeriod(days)
    }

    const { amountSold = 0, totalSales = 0, profitAverage = 0, biggestSingleProfit = 0 } = salesData ?? {}

    return (
        <DashboardCard className={className}>
            <div className="absolute top-2 right-2 flex gap-2 z-10">
                {[1, 7, 30, 365].map((days) => (
                    <button
                        key={days}
                        onClick={() => handlePeriodChange(days)}
                        className={`flex items-center justify-center min-w-10 h-8 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 cursor-pointer ${selectedPeriod === days
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm shadow-emerald-500/20'
                            : 'bg-neutral-700/40 hover:bg-neutral-700/60 text-neutral-300 border border-neutral-600/30 hover:border-neutral-600/50'
                            }`}
                    >
                        {days}d
                    </button>
                ))}
            </div>

            <div className="relative z-10">
                <CardHeader
                    icon={TrendingUp}
                    title="Total Sales"
                />


                <div className="mb-6">
                    <p className="text-3xl font-bold text-emerald-400 mb-1">
                        {formatNumber(totalSales)}
                    </p>
                    <p className="text-xs text-neutral-400">Total profit</p>
                </div>

                <div className="space-y-3 pt-4 border-t border-neutral-700/50">
                    <StatRow
                        icon={Package}
                        label="Cards sold in period"
                        value={formatNumber(amountSold)}
                    />

                    <StatRow
                        icon={DollarSign}
                        label="Average profit per card"
                        value={formatNumber(profitAverage)}
                    />

                    <StatRow
                        icon={Award}
                        label="Best single profit"
                        value={formatNumber(biggestSingleProfit)}
                        valueClassName="text-sm font-semibold text-emerald-400"
                    />
                </div>
            </div>
        </DashboardCard>
    )
}