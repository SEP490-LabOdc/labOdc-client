import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { useSkills } from './skills-provider'
import { SkillsForm } from './skills-form'
import { useCreateSkill, useUpdateSkill, useDeleteSkill } from '@/hooks/api/skills/mutations'
import { useQueryClient } from '@tanstack/react-query'
import { skillKeys } from '@/hooks/api/skills/query-keys'
import { toast } from 'sonner'
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
import { type SkillForm } from '../data/schema'

export function SkillsDialogs() {
    const { open, setOpen, currentRow, setCurrentRow } = useSkills()
    const queryClient = useQueryClient()

    const createMutation = useCreateSkill()
    const updateMutation = useUpdateSkill()
    const deleteMutation = useDeleteSkill()

    const handleCreate = async (values: SkillForm) => {
        try {
            await createMutation.mutateAsync({
                name: values.name,
                description: values.description || '',
            })
            toast.success('Tạo kỹ năng thành công!')
            queryClient.invalidateQueries({ queryKey: skillKeys.list() })
            setOpen(null)
        } catch (error) {
            toast.error('Tạo kỹ năng thất bại!')
        }
    }

    const handleUpdate = async (values: SkillForm) => {
        if (!currentRow) return

        try {
            await updateMutation.mutateAsync({
                id: currentRow.id,
                name: values.name,
                description: values.description || '',
            })
            toast.success('Cập nhật kỹ năng thành công!')
            queryClient.invalidateQueries({ queryKey: skillKeys.list() })
            queryClient.invalidateQueries({ queryKey: skillKeys.byId(currentRow.id) })
            setOpen(null)
            setCurrentRow(null)
        } catch (error) {
            toast.error('Cập nhật kỹ năng thất bại!')
        }
    }

    const handleDelete = async () => {
        if (!currentRow) return

        try {
            await deleteMutation.mutateAsync(currentRow.id)
            toast.success('Xóa kỹ năng thành công!')
            queryClient.invalidateQueries({ queryKey: skillKeys.list() })
            setOpen(null)
            setCurrentRow(null)
        } catch (error) {
            toast.error('Xóa kỹ năng thất bại!')
        }
    }

    const handleClose = () => {
        setOpen(null)
        if (open !== 'delete') {
            setCurrentRow(null)
        }
    }

    const isCreateLoading = createMutation.isPending
    const isUpdateLoading = updateMutation.isPending
    const isDeleteLoading = deleteMutation.isPending

    return (
        <>
            {/* Create Dialog */}
            <Dialog open={open === 'create'} onOpenChange={handleClose}>
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

            {/* Edit Dialog */}
            <Dialog open={open === 'edit'} onOpenChange={handleClose}>
                <DialogContent className='sm:max-w-[500px]'>
                    <DialogHeader>
                        <DialogTitle>Chỉnh sửa kỹ năng</DialogTitle>
                        <DialogDescription>
                            Cập nhật thông tin kỹ năng. Tên kỹ năng là bắt buộc.
                        </DialogDescription>
                    </DialogHeader>
                    {currentRow && (
                        <SkillsForm
                            mode='edit'
                            initialData={currentRow}
                            onSubmit={handleUpdate}
                            onCancel={handleClose}
                            isLoading={isUpdateLoading}
                        />
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <AlertDialog
                open={open === 'delete'}
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
                            {currentRow?.name}&quot;? Hành động này không thể hoàn tác.
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
        </>
    )
}

