import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useDeleteSkill } from '@/hooks/api/skills/mutations'
import { toast } from 'sonner'
import type { Skill } from '../data/schema'

interface SkillsConfirmDialogProps {
    isOpen: boolean
    onOpenChange: (isOpen: boolean) => void
    skill?: Skill
}

export function SkillsConfirmDialog({ isOpen, onOpenChange, skill }: SkillsConfirmDialogProps) {
    const deleteMutation = useDeleteSkill()

    const handleDelete = async () => {
        if (!skill) return

        try {
            await deleteMutation.mutateAsync(skill.id)
            toast.success('Xóa kỹ năng thành công!')
            onOpenChange(false)
        } catch (error) {
            toast.error('Xóa kỹ năng thất bại!')
        }
    }

    const handleClose = () => {
        onOpenChange(false)
    }

    const isDeleteLoading = deleteMutation.isPending

    return (
        <AlertDialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) {
                    handleClose()
                }
            }}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Xác nhận xóa kỹ năng</AlertDialogTitle>
                    <AlertDialogDescription>
                        Bạn có chắc chắn muốn xóa kỹ năng &quot;
                        {skill?.name}&quot;? Hành động này không thể hoàn tác.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleteLoading}>Hủy</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isDeleteLoading}
                        className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                    >
                        {isDeleteLoading ? 'Đang xóa...' : 'Xóa'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

