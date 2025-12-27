import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { SkillsForm } from './skills-form'
import { useCreateSkill } from '@/hooks/api/skills/mutations'
import { toast } from 'sonner'
import { type SkillForm } from '../data/schema'

interface SkillsCreateDialogProps {
    isOpen: boolean
    onOpenChange: (isOpen: boolean) => void
}

export function SkillsCreateDialog({ isOpen, onOpenChange }: SkillsCreateDialogProps) {
    const createMutation = useCreateSkill()

    const handleCreate = async (values: SkillForm) => {
        try {
            await createMutation.mutateAsync({
                name: values.name,
                description: values.description || '',
            })
            toast.success('Tạo kỹ năng thành công!')
            onOpenChange(false)
        } catch (error) {
            toast.error('Tạo kỹ năng thất bại!')
        }
    }

    const handleClose = () => {
        onOpenChange(false)
    }

    const isCreateLoading = createMutation.isPending

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className='sm:max-w-[500px]'>
                <DialogHeader>
                    <DialogTitle>Tạo kỹ năng mới</DialogTitle>
                    <DialogDescription>
                        Thêm kỹ năng mới vào hệ thống. Tên kỹ năng là bắt buộc.
                    </DialogDescription>
                </DialogHeader>
                <SkillsForm
                    mode='create'
                    onSubmit={handleCreate}
                    onCancel={handleClose}
                    isLoading={isCreateLoading}
                />
            </DialogContent>
        </Dialog>
    )
}

