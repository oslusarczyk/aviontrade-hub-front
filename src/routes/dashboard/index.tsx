import { createFileRoute } from '@tanstack/react-router'
import { getUserId } from '@/lib/get-user'
import { ClubSelector } from '@/components/ClubSelector'
import { useSelectedPersona } from '@/hooks/use-selected-persona'

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
  const { isLoading, selectedClub } = useSelectedPersona(userId)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        {!isLoading && <ClubSelector userId={userId} />}
      </div>
      {/* Dashboard content will go here */}
      {selectedClub && <p>{selectedClub.clubName}</p>}
    </div>
  )
}