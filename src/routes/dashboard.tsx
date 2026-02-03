import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useState } from 'react'
import { PersonaProvider } from '@/contexts/persona-context'
import { DashboardSidebar } from '@/components/DashboardSidebar'
import { Menu } from 'lucide-react'

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
})

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <PersonaProvider>
      <div className="flex h-screen bg-neutral-900 text-white">
        <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main className="flex-1 lg:ml-64 overflow-y-auto flex flex-col">
          {!isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-neutral-800/50 border border-neutral-700/50 backdrop-blur-sm text-neutral-400 hover:bg-neutral-700/50 hover:text-neutral-200 transition-colors"
              aria-label="Open sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}

          <div className="p-4 md:p-6 lg:p-8 flex-1 flex flex-col min-h-0">
            <Outlet />
          </div>
        </main>
      </div>
    </PersonaProvider>
  )
}
