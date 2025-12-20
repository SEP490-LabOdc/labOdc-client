import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSkills } from './skills-provider'

export function SkillsPrimaryButtons() {
    const { setOpen } = useSkills()

    return (
        <Button
            onClick={() => {
                setOpen('create')
            }}
        >
            <Plus className='mr-2 h-4 w-4' />
            Tạo kỹ năng mới
        </Button>
    )
}

