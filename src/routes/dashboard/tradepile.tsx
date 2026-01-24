import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/tradepile')({
  component: TradepilePage,
})

function TradepilePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tradepile</h1>
      <p className="text-neutral-400">Tradepile content goes here...</p>
    </div>
  )
}
