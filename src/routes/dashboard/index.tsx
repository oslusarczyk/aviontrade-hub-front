import { createFileRoute } from '@tanstack/react-router'
import { getUserId } from '@/server/get-user'
import { ClubSelector } from '@/components/ClubSelector'
import { useSelectedPersona } from '@/hooks/use-selected-persona'
import { TotalSalesCard } from '@/components/dashboard/TotalSalesCard'
import { TradepileInfoCard } from '@/components/dashboard/TradepileInfoCard'
import { LastSalesCard } from '@/components/dashboard/LastSalesCard'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardIndex,
  beforeLoad: async () => {
    const userId = await getUserId()
    return {
      userId: userId,
    }
  },
})

function DashboardIndex() {
  const { userId } = Route.useRouteContext()
  const { personaId } = useSelectedPersona(userId)

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 mb-6 shrink-0">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <ClubSelector userId={userId} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 grid-rows-5 flex-1 min-h-0">
        {personaId ? (
          <>
            <TotalSalesCard className="col-span-1 row-span-2 h-full" />
            <TradepileInfoCard className="col-span-1 row-span-2 h-full" />
            <LastSalesCard className="col-span-2 row-span-5 h-full" />
          </>
        ) : (
          <div className="col-span-4 row-span-5 h-full flex items-center justify-center">
            <p className="text-sm text-neutral-400">No club selected</p>
          </div>
        )}
      </div>
    </div>
  )
}