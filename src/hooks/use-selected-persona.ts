import { usePersona } from '@/contexts/persona-context'
import { useCachedClubs } from '@/hooks/use-cached-clubs'

export function useSelectedPersona(userId: string) {
    const { selectedPersonaId: personaId } = usePersona()
    const { clubs, isLoading } = useCachedClubs(userId)

    // selectedClub is now available immediately from TanStack Query cache!
    const selectedClub = clubs?.find(club => club.personaId === personaId) ?? null
    const validPersonaId = selectedClub ? personaId : null

    return {
        personaId: validPersonaId ?? null,
        selectedClub,
        clubs: clubs ?? null,
        isLoading
    }
}