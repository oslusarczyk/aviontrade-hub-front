import { formatNumber, formatProfit } from '@/lib/utils'
import { StatRow } from './StatRow'

interface SaleItemProps {
    sale: {
        tradeId: number;
        player: string;
        overall: number;
        cardType: string;
        position: string;
        price: number;
        sellPrice: number;
        profit: number;
    };
}

export function SaleItem({ sale }: SaleItemProps) {
    const { player, overall, price, sellPrice, profit, cardType, position } = sale;
    const profitColor = profit > 0 ? 'text-emerald-400' : profit < 0 ? 'text-red-400' : 'text-neutral-400'

    return (
        <div className="bg-neutral-700/30 rounded-lg p-3 border border-neutral-600/30 hover:border-neutral-600/50 transition-colors">
            <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-neutral-200 truncate">
                        {player}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                        <span className="text-xs text-neutral-400">OVR</span>
                        <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded border border-emerald-500/30 shrink-0">
                            {overall}
                        </span>
                        <span className="text-xs text-neutral-400">POS</span>
                        <span className="px-1.5 py-0.5 bg-neutral-600/50 text-neutral-300 text-xs font-medium rounded border border-neutral-600/50 shrink-0">
                            {position}
                        </span>
                        <span className="text-xs text-neutral-400">TEAM</span>
                        <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-medium rounded border border-blue-500/30 shrink-0">
                            {cardType}
                        </span>
                    </div>
                </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-neutral-700/50">
                <StatRow
                    label="Card bought for"
                    salesProp
                    value={formatNumber(sellPrice)}
                />
                <StatRow
                    label="Card sold for"
                    salesProp
                    value={formatNumber(price)}
                />
                <StatRow
                    label="Profit"
                    salesProp
                    value={formatProfit(profit)}
                    valueClassName={`text-xs font-semibold ${profitColor}`}
                    iconClassName={profitColor}
                    labelClassName="text-xs font-medium text-neutral-300"
                    containerClassName="mt-2 pt-2 border-t border-neutral-700/30"
                />
            </div>
        </div>
    )
}