import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useCreateMilestone } from '@/hooks/api/projects/mutation'
import { toast } from 'sonner'

const createMilestoneSchema = z.object({
  title: z.string().min(1, 'Tiêu đề không được để trống'),
  description: z.string().min(1, 'Mô tả không được để trống'),
  startDate: z.string().min(1, 'Ngày bắt đầu không được để trống'),
  endDate: z.string().min(1, 'Ngày kết thúc không được để trống'),
}).refine(data => new Date(data.startDate) < new Date(data.endDate), {
  message: 'Ngày kết thúc phải sau ngày bắt đầu',
  path: ['endDate'],
})

type CreateMilestoneFormData = z.infer<typeof createMilestoneSchema>

interface CreateMilestoneModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  projectId: string
  onSuccess?: () => void
}

export const CreateMilestoneModal: React.FC<CreateMilestoneModalProps> = ({
                                                                            open,
                                                                            onOpenChange,
                                                                            projectId,
                                                                            onSuccess,
                                                                          }) => {
  const form = useForm<CreateMilestoneFormData>({
    resolver: zodResolver(createMilestoneSchema),
    defaultValues: {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
    },
  })

  const createMilestone = useCreateMilestone()

  const onSubmit = async (data: CreateMilestoneFormData) => {
    try {
      await createMilestone.mutateAsync({
        projectId,
        ...data,
      })
      toast.success('Tạo milestone thành công')
      form.reset()
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.log(error)
      toast.error('Tạo milestone thất bại')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Tạo Milestone Mới</DialogTitle>
          <DialogDescription>
            Điền thông tin để tạo milestone mới cho dự án
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu đề</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tiêu đề milestone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nhập mô tả chi tiết"
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày bắt đầu</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày kết thúc</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={createMilestone.isPending}>
                {createMilestone.isPending ? 'Đang tạo...' : 'Tạo Milestone'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
