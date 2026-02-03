import { createFileRoute } from '@tanstack/react-router'
import { usePersona } from '@/contexts/persona-context'

export const Route = createFileRoute('/dashboard/tradepile')({
  component: TradepilePage,
})

function TradepilePage() {
  const { selectedPersonaId } = usePersona()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 ml-12 lg:ml-0">Tradepile</h1>
      <p className="text-neutral-400">
        {selectedPersonaId
          ? `Viewing tradepile for Persona ID: ${selectedPersonaId}`
          : 'Please select a club from the sidebar'
        }
      </p>
    </div>
  )
}
