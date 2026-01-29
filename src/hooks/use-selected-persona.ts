import { useQuery } from 'convex/react'
import { api } from 'convex/_generated/api'
import { usePersona } from '@/contexts/persona-context'

export function useSelectedPersona(userId: string) {
    const { selectedPersonaId: personaId } = usePersona()
    const clubs = useQuery(api.clubs.getUserClubs, { userId })

    if (clubs === undefined) {
        return {
            personaId: null,
            selectedClub: null,
            clubs: null,
        }
    }
    const selectedClub = clubs.find(club => club.personaId === personaId)

    return {
        personaId,
        selectedClub,
        clubs
    }
}
