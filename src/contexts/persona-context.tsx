import { useLocalStorage } from '@/hooks/use-local-storage'
import { createContext, useContext, ReactNode } from 'react'

interface PersonaContextType {
    selectedPersonaId: number | null
    setSelectedPersonaId: (personaId: number) => void
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined)



export function PersonaProvider({ children }: { children: ReactNode }) {
    const [selectedPersonaId, setSelectedPersonaId] = useLocalStorage<number | null>('selectedPersonaId', null)

    return (
        <PersonaContext.Provider value={{ selectedPersonaId, setSelectedPersonaId }}>
            {children}
        </PersonaContext.Provider>
    )
}

export function usePersona() {
    const context = useContext(PersonaContext)
    if (context === undefined) {
        throw new Error('usePersona must be used within a PersonaProvider')
    }
    return context
}