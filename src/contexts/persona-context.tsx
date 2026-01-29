// src/contexts/persona-context.tsx
import { useLocalStorage } from '@/hooks/use-local-storage'
import { createContext, useContext, ReactNode } from 'react'

interface PersonaContextType {
    selectedPersonaId: number | undefined
    setSelectedPersonaId: (personaId: number) => void
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined)

export function PersonaProvider({ children }: { children: ReactNode }) {
    const [selectedPersonaId, setSelectedPersonaId] = useLocalStorage<number | undefined>(
        'selectedPersonaId',
        undefined
    )

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
