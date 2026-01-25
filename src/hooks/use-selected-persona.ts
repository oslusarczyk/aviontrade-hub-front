import { useQuery } from 'convex/react'
import { api } from 'convex/_generated/api'
import { usePersona } from '@/contexts/persona-context'

export function useSelectedPersona(userId: string) {
    const { selectedPersonaId } = usePersona()
    const clubs = useQuery(api.clubs.getUserClubs, { userId })

    const personaId = selectedPersonaId || (clubs && clubs.length > 0 ? clubs[0].personaId : null)
    const selectedClub = clubs?.find(club => club.personaId === selectedPersonaId) ||
        (clubs && clubs.length > 0 ? clubs[0] : null)

    return {
        personaId,
        selectedClub,
        clubs,
        isLoading: clubs === undefined,
    }
}
