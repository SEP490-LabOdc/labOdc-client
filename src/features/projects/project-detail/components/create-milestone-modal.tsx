import React, { useMemo } from 'react'
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
import { FileUpload } from '@/components/file/FileUpload'
import type { ProjectDetail } from '@/hooks/api/projects/types'
import { DatePicker } from '@/components/date-picker'
import { toLocalISOString } from '@/helpers/datetime'

const createMilestoneSchema = z.object({
  title: z.string().min(1, 'Tiêu đề không được để trống'),
  description: z.string().min(1, 'Mô tả không được để trống'),
  percentage: z.number().min(0, 'Phần trăm phải lớn hơn 0').max(100, 'Phần trăm không được vượt quá 100'),
  startDate: z.string().min(1, 'Ngày bắt đầu không được để trống'),
  endDate: z.string().min(1, 'Ngày kết thúc không được để trống'),
  attachmentUrls: z.array(z.object({
    name: z.string(),
    fileName: z.string(),
    url: z.string(),
  })).optional(),
}).refine((data) => {
  if (!data.startDate || !data.endDate) return true
  return new Date(data.startDate) < new Date(data.endDate)
}, {
  message: 'Ngày kết thúc phải sau ngày bắt đầu',
  path: ['endDate'],
})

type CreateMilestoneFormData = z.infer<typeof createMilestoneSchema>

interface CreateMilestoneModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  projectId: string
  projectData?: ProjectDetail
  onSuccess?: () => void
}

export const CreateMilestoneModal: React.FC<CreateMilestoneModalProps> = ({
  open,
  onOpenChange,
  projectId,
  projectData,
  onSuccess,
}) => {
  const form = useForm<CreateMilestoneFormData>({
    resolver: zodResolver(createMilestoneSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      percentage: 0,
      startDate: '',
      endDate: '',
      attachmentUrls: [],
    },
  })

  const createMilestone = useCreateMilestone()
  const [attachments, setAttachments] = React.useState<Array<{ name: string; fileName: string; url: string }>>([])

  const percentage = form.watch('percentage')

  const budgetInfo = useMemo(() => {
    const projectBudget = projectData?.budget || 0
    const remainingBudget = projectData?.remainingBudget ?? projectBudget
    const currentPercentage = percentage || 0
    const allocatedBudget = (remainingBudget * currentPercentage) / 100
    const budgetAfterAllocation = remainingBudget - allocatedBudget

    return {
      projectBudget,
      remainingBudget,
      allocatedBudget,
      budgetAfterAllocation: Math.max(0, budgetAfterAllocation),
      isValid: budgetAfterAllocation >= 0,
    }
  }, [percentage, projectData])

  const handleFileUploaded = (url: string, fileName: string) => {
    const newAttachment = {
      name: fileName,
      fileName: fileName,
      url: url,
    }
    setAttachments(prev => [...prev, newAttachment])
  }

  const onSubmit = async (data: CreateMilestoneFormData) => {
    if (!budgetInfo.isValid) {
      toast.error('Ngân sách phân bổ vượt quá ngân sách còn lại')
      return
    }

    console.log(data);

    try {
      await createMilestone.mutateAsync({
        projectId,
        ...data,
        attachmentUrls: attachments,
      })
      toast.success('Tạo milestone thành công')
      form.reset()
      setAttachments([])
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
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
            <FormField
              control={form.control}
              name="percentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phần trăm ngân sách (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Nhập phần trăm ngân sách"
                      {...field}
                      onChange={(e) => {
                        const value = Number(e.target.value)
                        field.onChange(value)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Ngân sách dự án:</span>
                      <span className="font-medium text-foreground">
                        {budgetInfo.projectBudget.toLocaleString('vi-VN')} VND
                      </span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Ngân sách còn lại:</span>
                      <span className="font-medium text-foreground">
                        {budgetInfo.remainingBudget.toLocaleString('vi-VN')} VND
                      </span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Ngân sách phân bổ:</span>
                      <span className="font-medium text-secondary">
                        {budgetInfo.allocatedBudget.toLocaleString('vi-VN')} VND
                      </span>
                    </div>
                    <div className="flex justify-between text-muted-foreground pt-1 border-t border-primary/20">
                      <span>Còn lại sau phân bổ:</span>
                      <span className={`font-bold ${budgetInfo.isValid ? 'text-secondary' : 'text-destructive'}`}>
                        {budgetInfo.budgetAfterAllocation.toLocaleString('vi-VN')} VND
                      </span>
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              {/* <FormField
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
              /> */}
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => {
                  // Tính minDate: sau 5 ngày từ hôm nay
                  const today = new Date()
                  today.setHours(0, 0, 0, 0)
                  const minStartDate = new Date(today)
                  // minStartDate.setDate(minStartDate.getDate() + )

                  return (
                    <FormItem>
                      <FormLabel className="text-base font-medium">Ngày bắt đầu</FormLabel>
                      <FormControl>
                        <DatePicker
                          selected={
                            field.value
                              ? new Date(field.value)
                              : undefined
                          }
                          onSelect={(date) => {
                            field.onChange(
                              date
                                ? toLocalISOString(date)
                                : ''
                            )
                          }}
                          placeholder="Chọn ngày bắt đầu"
                          minDate={minStartDate}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-gray-500 mt-1">
                        Ngày bắt đầu không được chọn ngày quá khứ
                      </p>
                    </FormItem>
                  )
                }}
              />
              {/* <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày kết thúc dự kiến</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              {/* --- NGÀY KẾT THÚC --- */}
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => {
                  // Tính minDate: sau ngày bắt đầu
                  const startDate = form.watch('startDate')
                  const minEndDate = startDate ? (() => {
                    const min = new Date(startDate)
                    min.setDate(min.getDate() + 1) // Phải sau ngày bắt đầu
                    min.setHours(0, 0, 0, 0)
                    return min
                  })() : undefined

                  return (
                    <FormItem>
                      <FormLabel className="text-base font-medium">Ngày kết thúc dự kiến</FormLabel>
                      <FormControl>
                        <DatePicker
                          selected={
                            field.value
                              ? new Date(field.value)
                              : undefined
                          }
                          onSelect={(date) => {
                            field.onChange(
                              date
                                ? toLocalISOString(date)
                                : ''
                            )
                          }}
                          placeholder="Chọn ngày kết thúc"
                          disabled={!startDate}
                          minDate={minEndDate}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-gray-500 mt-1">
                        {startDate
                          ? 'Ngày kết thúc phải sau ngày bắt đầu'
                          : 'Vui lòng chọn ngày bắt đầu trước'}
                      </p>
                    </FormItem>
                  )
                }}
              />
            </div>

            <div className="space-y-2">
              <FormLabel>Tệp đính kèm</FormLabel>
              <FileUpload
                value={null}
                onChange={(url) => {
                  if (url) {
                    // Get the last uploaded file name from the FileUpload component's internal state
                    const fileName = url.split('/').pop() || 'attachment'
                    handleFileUploaded(url, fileName)
                  }
                }}
                placeholder="Chọn file để tải lên"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
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
              <Button
                type="submit"
                disabled={createMilestone.isPending}
              >
                {createMilestone.isPending ? 'Đang tạo...' : 'Tạo Milestone'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog >
  )
}
