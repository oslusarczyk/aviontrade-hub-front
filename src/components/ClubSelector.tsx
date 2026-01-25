import { useState, useEffect } from 'react'
import { usePersona } from '@/contexts/persona-context'
import { useSelectedPersona } from '@/hooks/use-selected-persona'
import { ChevronDown } from 'lucide-react'

interface ClubSelectorProps {
    userId: string
}

export function ClubSelector({ userId }: ClubSelectorProps) {
    const { selectedPersonaId, setSelectedPersonaId } = usePersona()
    const { clubs, selectedClub } = useSelectedPersona(userId)
    const [isSelectOpen, setIsSelectOpen] = useState(false)

    // Auto-select first club if none is selected
    useEffect(() => {
        if (clubs && clubs.length > 0 && !selectedPersonaId) {
            setSelectedPersonaId(clubs[0].personaId)
        }
    }, [clubs, selectedPersonaId, setSelectedPersonaId])

    const showClubSelector = clubs && clubs.length > 1

    if (!showClubSelector) {
        return selectedClub ? (
            <div className="text-sm text-neutral-400">
                Club: {selectedClub.clubName}
            </div>
        ) : null
    }

    return (
        <div className="relative">
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation()
                    setIsSelectOpen(!isSelectOpen)
                }}
                className="flex items-center gap-2 px-4 py-2 bg-neutral-800/50 border border-neutral-700/50 rounded-lg text-neutral-300 hover:border-emerald-500/50 transition-colors min-w-[200px] justify-between"
            >
                <span>{selectedClub?.clubName || 'Select Club'}</span>
                <ChevronDown
                    className={`w-4 h-4 transition-transform ${isSelectOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isSelectOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsSelectOpen(false)}
                    />
                    <div className="absolute left-0 top-full mt-2 w-full bg-neutral-800 border border-neutral-700/50 rounded-lg shadow-lg z-20 overflow-hidden">
                        {clubs?.map((club) => (
                            <button
                                key={club._id}
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedPersonaId(club.personaId)
                                    setIsSelectOpen(false)
                                }}
                                className={`w-full text-left px-4 py-2 text-sm transition-colors 
                                    ${selectedPersonaId === club.personaId
                                        ? 'bg-emerald-500/20 text-emerald-400'
                                        : 'text-neutral-300 hover:bg-neutral-700/50'
                                    }`}
                            >
                                {club.clubName}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
