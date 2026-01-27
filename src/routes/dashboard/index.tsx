import { createFileRoute } from '@tanstack/react-router'
import { getUserId } from '@/server/get-user'
import { ClubSelector } from '@/components/ClubSelector'
import { useSelectedPersona } from '@/hooks/use-selected-persona'
import { TotalSalesCard } from '@/components/dashboard/TotalSalesCard'
import { TradepileInfoCard } from '@/components/dashboard/TradepileInfoCard'

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
  const { isLoading, personaId } = useSelectedPersona(userId)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        {!isLoading && <ClubSelector userId={userId} />}
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {personaId && (
          <>
            <TotalSalesCard />
            <TradepileInfoCard />
          </>
        )}
      </div>
    </div>
  )
}