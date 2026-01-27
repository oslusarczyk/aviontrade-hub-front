import { formatNumber, formatProfit } from '@/lib/utils'

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
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-xs text-neutral-400">OVR</span>
                        <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded border border-emerald-500/30">
                            {overall}
                        </span>
                        <span className="text-xs text-neutral-400">POS</span>
                        <span className="px-1.5 py-0.5 bg-neutral-600/50 text-neutral-300 text-xs font-medium rounded border border-neutral-600/50">
                            {position}
                        </span>
                        <span className="text-xs text-neutral-400">TEAM</span>
                        <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-medium rounded border border-blue-500/30">
                            {cardType}
                        </span>
                    </div>
                </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-neutral-700/50">
                <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Card bought for</span>
                    <span className="text-neutral-300 font-medium">{formatNumber(sellPrice)}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Card sold for</span>
                    <span className="text-neutral-300 font-medium">{formatNumber(price)}</span>
                </div>
                <div className={`flex items-center justify-between text-xs font-semibold mt-2 pt-2 border-t border-neutral-700/30 ${profitColor}`}>
                    <span>Profit</span>
                    <span className={profitColor}>
                        {formatProfit(profit)}
                    </span>
                </div>
            </div>
        </div>
    )
}
