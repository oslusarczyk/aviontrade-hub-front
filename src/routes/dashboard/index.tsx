import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from 'convex/react'
import { api } from 'convex/_generated/api'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardIndex,
})

function DashboardIndex() {
  const personaId = 1969820033

  const sales = useQuery(api.trades.showSales, { personaId })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {sales === undefined ? (
        <p>Loading sales...</p>
      ) : sales && sales.length > 0 ? (
        <div className="space-y-4">
          {sales.map((sale) => (
            <div key={sale._id} className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
              <p className="text-emerald-400 font-semibold">Profit Made: {sale.profitMade}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No sales found</p>
      )}
    </div>
  )
}
