// src/features/company-admin/projects/detail/components/create-milestone-dialog.tsx
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import * as z from 'zod'

// TODO: Định nghĩa schema validation với Zod
// const milestoneSchema = z.object({ ... })

type CreateMilestoneDialogProps = {
    projectId: string
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

export function CreateMilestoneDialog({
    projectId: _projectId,
    isOpen,
    onOpenChange,
}: CreateMilestoneDialogProps) {
    const form = useForm({
        // resolver: zodResolver(milestoneSchema),
        defaultValues: {
            title: '',
            description: '',
            startDate: '',
            endDate: '',
            status: 'PENDING',
        },
    })

    // TODO: Dùng useMutation để create
    // const { mutate, isPending } = useCreateMilestone()

    const onSubmit = (values: any) => {
        console.log('Form values:', values)
        // mutate({ ...values, projectId })
        onOpenChange(false) // Đóng dialog sau khi submit
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Create New Milestone</DialogTitle>
                        <DialogDescription>
                            Fill in the details for the new milestone.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input id="title" {...form.register('title')} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                {...form.register('description')}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="startDate" className="text-right">
                                Start Date
                            </Label>
                            <Input
                                id="startDate"
                                type="date"
                                {...form.register('startDate')}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="endDate" className="text-right">
                                End Date
                            </Label>
                            <Input
                                id="endDate"
                                type="date"
                                {...form.register('endDate')}
                                className="col-span-3"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            {/* {isPending ? 'Saving...' : 'Save Milestone'} */}
                            Save Milestone
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}