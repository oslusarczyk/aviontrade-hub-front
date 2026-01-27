import { CardHeader } from "./CardHeader";
import { ShoppingBag } from "lucide-react";
import { useQuery } from 'convex/react'
import { api } from "convex/_generated/api";
import { usePersona } from "@/contexts/persona-context";
import { SaleItem } from "./SaleItem";
import { DashboardCard } from "./DashboardCard";

export function LastSalesCard({ className }: { className?: string }) {
    const { selectedPersonaId: personaId } = usePersona();
    const result = useQuery(api.trades.showLastSales, { personaId: personaId ?? 0 })
    const creationTime = result?.creationTime ?? 0;
    const lastSales = result?.lastSales ?? [];

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
                {lastSales && lastSales.length > 0 ? (
                    <>
                        {lastSales.map(sale => (
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