import { createFileRoute, Outlet } from '@tanstack/react-router'
import { PersonaProvider } from '@/contexts/persona-context'
import { DashboardSidebar } from '@/components/DashboardSidebar'

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <PersonaProvider>
      <div className="flex h-screen bg-neutral-900 text-white">
        <DashboardSidebar />

        <main className="flex-1 ml-64 overflow-hidden flex flex-col">
          <div className="p-8 flex-1 flex flex-col min-h-0">
            <Outlet />
          </div>
        </main>
      </div>
    </PersonaProvider>
  )
}
