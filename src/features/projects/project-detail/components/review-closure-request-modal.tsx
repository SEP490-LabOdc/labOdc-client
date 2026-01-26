import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useCompanyReviewClosureRequest, useLabAdminReviewClosureRequest } from '@/hooks/api/projects/mutation'
import { useState } from 'react'

const reviewClosureRequestSchema = z.object({
  comment: z.string().optional(),
})

type ReviewClosureRequestFormData = z.infer<typeof reviewClosureRequestSchema>

interface ReviewClosureRequestModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  projectId: string
  requestId: string
  onSuccess?: () => void
  reviewType?: 'lab-admin' | 'company'
}

export function ReviewClosureRequestModal({
  open,
  onOpenChange,
  projectId,
  requestId,
  onSuccess,
  reviewType = 'lab-admin'
}: ReviewClosureRequestModalProps) {
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null)
  
  const form = useForm<ReviewClosureRequestFormData>({
    resolver: zodResolver(reviewClosureRequestSchema),
    defaultValues: {
      comment: '',
    },
  })

  const labAdminMutation = useLabAdminReviewClosureRequest()
  const companyMutation = useCompanyReviewClosureRequest()

  const { mutateAsync: reviewRequest, isPending } = reviewType === 'company' ? companyMutation : labAdminMutation

  const handleAction = async (data: ReviewClosureRequestFormData, approved: boolean) => {
    // Manual validation for rejection
    if (!approved && !data.comment?.trim()) {
      form.setError('comment', { 
        type: 'manual', 
        message: 'Vui lòng nhập lý do từ chối' 
      })
      return
    }

    try {
      setActionType(approved ? 'approve' : 'reject')
      await reviewRequest({
        projectId,
        requestId,
        approved,
        comment: data.comment?.trim() || '',
      })

      toast.success(approved ? 'Đã duyệt yêu cầu thành công' : 'Đã từ chối yêu cầu thành công')
      form.reset()
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error(error)
      toast.error('Có lỗi xảy ra khi xử lý yêu cầu')
    } finally {
      setActionType(null)
    }
  }

  const handleClose = () => {
    if (!isPending) {
      form.reset()
      onOpenChange(false)
    }
  }

  const isLabAdminReview = reviewType === 'lab-admin'

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Duyệt yêu cầu đóng dự án</DialogTitle>
          <DialogDescription>
            {isLabAdminReview 
              ? 'Xem xét và đưa ra quyết định duyệt hoặc từ chối yêu cầu đóng dự án này. Việc duyệt sẽ gửi yêu cầu này đến Doanh nghiệp.'
              : 'Xem xét và đưa ra quyết định duyệt hoặc từ chối yêu cầu đóng dự án này. Việc duyệt sẽ hoàn tất quá trình đóng dự án.'
            }
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nhận xét / Lý do <span className="text-muted-foreground font-normal text-xs ml-1">(Bắt buộc nếu từ chối)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Nhập nhận xét hoặc lý do từ chối..."
                      rows={4}
                      disabled={isPending}
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 sm:gap-0 pt-4">
              <div className="flex w-full justify-between items-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isPending}
                >
                  Hủy bỏ
                </Button>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="destructive"
                    disabled={isPending}
                    onClick={form.handleSubmit((data) => handleAction(data, false))}
                  >
                    {isPending && actionType === 'reject' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Từ chối
                  </Button>
                  <Button
                    type="button"
                    className="bg-green-600 hover:bg-green-700 text-white"
                    disabled={isPending}
                    onClick={form.handleSubmit((data) => handleAction(data, true))}
                  >
                    {isPending && actionType === 'approve' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Duyệt yêu cầu
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  )
}