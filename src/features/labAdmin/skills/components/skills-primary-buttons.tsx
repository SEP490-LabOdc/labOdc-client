import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

type SkillsPrimaryButtonsProps = {
    onOpenCreate: () => void
}

export function SkillsPrimaryButtons({ onOpenCreate }: SkillsPrimaryButtonsProps) {
    return (
        <Button onClick={onOpenCreate}>
            <Plus className='mr-2 h-4 w-4' />
            Tạo kỹ năng mới
        </Button>
    )
}

