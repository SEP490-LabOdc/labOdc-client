import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type Skill } from '../data/schema'

type SkillsDialogType = 'create' | 'edit' | 'delete'

type SkillsContextType = {
    open: SkillsDialogType | null
    setOpen: (str: SkillsDialogType | null) => void
    currentRow: Skill | null
    setCurrentRow: React.Dispatch<React.SetStateAction<Skill | null>>
}

const SkillsContext = React.createContext<SkillsContextType | null>(null)

export function SkillsProvider({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useDialogState<SkillsDialogType>(null)
    const [currentRow, setCurrentRow] = useState<Skill | null>(null)

    return (
        <SkillsContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
            {children}
        </SkillsContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSkills = () => {
    const skillsContext = React.useContext(SkillsContext)

    if (!skillsContext) {
        throw new Error('useSkills has to be used within <SkillsProvider>')
    }

    return skillsContext
}

