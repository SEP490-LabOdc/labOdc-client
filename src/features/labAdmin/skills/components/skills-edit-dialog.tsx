import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { SkillsForm } from './skills-form'
import { useUpdateSkill } from '@/hooks/api/skills/mutations'
import { toast } from 'sonner'
import { type SkillForm, type Skill } from '../data/schema'

interface SkillsEditDialogProps {
    isOpen: boolean
    onOpenChange: (isOpen: boolean) => void
    skill?: Skill
}

export function SkillsEditDialog({ isOpen, onOpenChange, skill }: SkillsEditDialogProps) {
    const updateMutation = useUpdateSkill()

    const handleUpdate = async (values: SkillForm) => {
        if (!skill) return

        try {
            await updateMutation.mutateAsync({
                id: skill.id,
                name: values.name,
                description: values.description || '',
            })
            toast.success('Cập nhật kỹ năng thành công!')
            onOpenChange(false)
        } catch (error) {
            toast.error('Cập nhật kỹ năng thất bại!')
        }
    }

    const handleClose = () => {
        onOpenChange(false)
    }

    const isUpdateLoading = updateMutation.isPending

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className='sm:max-w-[500px]'>
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa kỹ năng</DialogTitle>
                    <DialogDescription>
                        Cập nhật thông tin kỹ năng. Tên kỹ năng là bắt buộc.
                    </DialogDescription>
                </DialogHeader>
                {skill && (
                    <SkillsForm
                        mode='edit'
                        initialData={{
                            name: skill.name,
                            description: skill.description ?? undefined,
                            id: skill.id,
                        }}
                        onSubmit={handleUpdate}
                        onCancel={handleClose}
                        isLoading={isUpdateLoading}
                    />
                )}
            </DialogContent>
        </Dialog>
    )
}

