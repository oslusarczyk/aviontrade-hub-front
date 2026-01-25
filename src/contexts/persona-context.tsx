import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface PersonaContextType {
    selectedPersonaId: number | null
    setSelectedPersonaId: (personaId: number) => void
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined)
const STORAGE_KEY = 'selectedPersonaId'

export function PersonaProvider({ children }: { children: ReactNode }) {
    const [selectedPersonaId, setSelectedPersonaId] = useState<number | null>(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(STORAGE_KEY)
            return stored ? Number(stored) : null
        }
        return null
    })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (selectedPersonaId !== null) {
                localStorage.setItem(STORAGE_KEY, String(selectedPersonaId))
            } else {
                localStorage.removeItem(STORAGE_KEY)
            }
        }
    }, [selectedPersonaId])

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
