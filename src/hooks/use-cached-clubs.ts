import { useQuery } from '@tanstack/react-query'
import { api } from 'convex/_generated/api'
import { convexQuery } from '@convex-dev/react-query'

// interface Club {

const ONE_DAY_MS = 24 * 60 * 60 * 1000

export function useCachedClubs(userId: string) {
    const { data: clubs, isLoading } = useQuery({
        ...convexQuery(api.clubs.getUserClubs, { userId }),
        staleTime: ONE_DAY_MS, // Data is considered fresh for 1 day
        gcTime: ONE_DAY_MS, // Cache persists for 1 day after component unmounts
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false, // Don't refetch on reconnect if data is still fresh
    })

    return {
        clubs: clubs ?? null,
        isLoading
    }
}