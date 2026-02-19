import { createFileRoute } from '@tanstack/react-router'
import { getUserId } from '@/server/get-user'
import { ClubSelector } from '@/components/ClubSelector'
import { TotalSalesCard } from '@/components/dashboard/TotalSalesCard'
import { TradepileInfoCard } from '@/components/dashboard/TradepileInfoCard'
import { LastSalesCard } from '@/components/dashboard/LastSalesCard'
import { ChartCard } from '@/components/dashboard/ChartCard'
import { useSelectedPersona } from '@/hooks/use-selected-persona'
import { Loader2 } from 'lucide-react'

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
  const { isLoading } = useSelectedPersona(userId)

  if (isLoading) {
    return <div className="text-neutral-400 flex items-center justify-center h-full">Loading data... <Loader2 className="w-10 h-10 animate-spin" /></div>
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 mb-6 shrink-0 ml-12 lg:ml-0">
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <ClubSelector userId={userId} />
      </div>
      <div className="flex flex-col gap-2 lg:grid lg:grid-cols-2 2xl:grid-cols-4 2xl:grid-rows-5 flex-1 2xl:min-h-0">
        <TotalSalesCard className="2xl:row-span-2 2xl:h-full" />
        <TradepileInfoCard className="2xl:row-span-2 2xl:h-full" />
        <LastSalesCard className="h-[500px] lg:col-span-2 2xl:row-span-5 2xl:h-full" />
        <ChartCard className="h-[500px] lg:col-span-2 2xl:row-span-3 2xl:h-full" />
      </div>
    </div >
  )
}