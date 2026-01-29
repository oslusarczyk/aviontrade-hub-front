import { CardHeader } from "./CardHeader";
import { ShoppingBag } from "lucide-react";
import { useQuery } from '@tanstack/react-query'
import { convexQuery } from "@convex-dev/react-query";
import { api } from "convex/_generated/api";
import { usePersona } from "@/contexts/persona-context";
import { SaleItem } from "./SaleItem";
import { DashboardCard } from "./DashboardCard";

type LastSale = {
    tradeId: number;
    player: string;
    overall: number;
    cardType: string;
    position: string;
    price: number;
    sellPrice: number;
    profit: number;
};

type LastSalesData = {
    creationTime: number;
    lastSales: LastSale[];
};

export function LastSalesCard({ className }: { className?: string }) {
    const { selectedPersonaId: personaId } = usePersona();
    const { data: result } = useQuery({
        ...convexQuery(api.trades.showLastSales, personaId ? { personaId } : "skip"),
        placeholderData: (previousData: LastSalesData | undefined) => previousData,
    });

    if (!result) {
        return (
            <DashboardCard className={`flex flex-col h-full ${className}`}>
                <CardHeader
                    icon={ShoppingBag}
                    title="Last Sales"
                    description="No sales data available"
                />
                <div className="flex flex-col gap-2 mt-4 flex-1 min-h-0 overflow-y-auto pr-2 pb-1">
                    <p className="text-sm text-neutral-400">No recent sales</p>
                </div>
            </DashboardCard>
        );
    }

    const { creationTime, lastSales } = result;

    return (
        <DashboardCard className={`flex flex-col h-full ${className}`}>
            <CardHeader
                icon={ShoppingBag}
                title="Last Sales"
                description={`Sales last updated at ${new Date(creationTime).toLocaleString()}`}
            />
            <div className="flex flex-col gap-2 mt-4 flex-1 min-h-0 overflow-y-auto pr-2 pb-1 custom-scrollbar"
                style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#00bc7d #262626'
                }}
            >
                {lastSales.length > 0 ? (
                    <>
                        {lastSales.map((sale: LastSale) => (
                            <SaleItem
                                key={sale.tradeId}
                                sale={sale}
                            />
                        ))}
                        <div className="h-1" />
                    </>
                ) : (
                    <p className="text-sm text-neutral-400">No recent sales</p>
                )}
            </div>
        </DashboardCard>
    )
}