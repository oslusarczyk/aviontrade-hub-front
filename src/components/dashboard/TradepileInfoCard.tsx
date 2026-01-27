import { usePersona } from '@/contexts/persona-context'
import { api } from 'convex/_generated/api'
import { useQuery } from 'convex/react'
import { formatNumber, formatProfit } from '@/lib/utils'
import { ShoppingBag, CheckCircle2, Coins, TrendingUp, Clock } from 'lucide-react'
import { StatRow } from './StatRow'
import { TradepileCountBox } from './TradepileCountBox'
import { CardHeader } from './CardHeader'
import { DashboardCard } from './DashboardCard'

export function TradepileInfoCard({ className }: { className?: string }) {
    const { selectedPersonaId: personaId } = usePersona()
    const tradepileData = useQuery(api.tradepile.getTradepile, { personaId: personaId ?? 0 })
    const { tradepileCount = 0, tradepileItemsSold = 0, tradepileSum = 0, tradepileProfit = 0, lastUpdated = 0 } = tradepileData ?? {}
    const profitColor = tradepileProfit > 0 ? 'text-emerald-400' : 'text-red-400'
    const profitBgColor = tradepileProfit > 0 ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'
    const potentialProfit = formatProfit(tradepileProfit)

    return (
        <DashboardCard className={className}>
            <div className="relative z-10">
                <CardHeader
                    icon={Coins}
                    title="Tradepile Info"
                />

                <div className="grid grid-cols-2 gap-4 mb-2">
                    <TradepileCountBox
                        icon={ShoppingBag}
                        label="Active"
                        value={tradepileCount}
                    />

                    <TradepileCountBox
                        icon={CheckCircle2}
                        label="Sold"
                        value={tradepileItemsSold}
                    />
                </div>

                <div className="space-y-3 pt-4 border-t border-neutral-700/50">
                    <StatRow
                        icon={Coins}
                        label="Total Value"
                        value={formatNumber(tradepileSum)}
                    />

                    <StatRow
                        icon={TrendingUp}
                        label="Potential Profit"
                        value={`${potentialProfit}`}
                        valueClassName={`text-sm font-bold ${profitColor}`}
                        containerClassName={`p-3 rounded-lg border ${profitBgColor}`}
                        iconClassName={profitColor}
                        labelClassName="text-xs font-medium text-neutral-300"
                    />

                    {lastUpdated > 0 && (
                        <div className="flex items-center gap-2 pt-2 border-t border-neutral-700/30">
                            <Clock className="w-3.5 h-3.5 text-neutral-500" />
                            <span className="text-xs text-neutral-500">
                                Last Updated: {new Date(lastUpdated).toLocaleString()}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </DashboardCard>
    )
}