import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { FileUpload } from '@/components/file/FileUpload'
import { useRejectMilestone } from '@/hooks/api/projects/mutation'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useState } from 'react'

const rejectMilestoneSchema = z.object({
  feedbackContent: z.string().min(1, 'Vui lòng nhập nội dung phản hồi'),
})

type RejectMilestoneFormData = z.infer<typeof rejectMilestoneSchema>

interface RejectMilestoneModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  milestoneId: string
  onSuccess?: () => void
}

export function RejectMilestoneModal({
  open,
  onOpenChange,
  milestoneId,
  onSuccess
}: RejectMilestoneModalProps) {
  const [attachmentUrls, setAttachmentUrls] = useState<string[]>([])

  const form = useForm<RejectMilestoneFormData>({
    resolver: zodResolver(rejectMilestoneSchema),
    defaultValues: {
      feedbackContent: '',
    },
  })

  const { mutateAsync: rejectMilestone, isPending } = useRejectMilestone()

  const handleFileChange = (url: string | null) => {
    if (url) {
      setAttachmentUrls(prev => [...prev, url])
    }
  }

  const onSubmit = async (data: RejectMilestoneFormData) => {
    try {
      await rejectMilestone({
        milestoneId,
        feedbackContent: data.feedbackContent.trim(),
        attachmentUrls
      })

      toast.success('Milestone đã bị từ chối')
      form.reset()
      setAttachmentUrls([])
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error(error)
      toast.error('Không thể từ chối milestone')
    }
  }

  const handleClose = () => {
    if (!isPending) {
      form.reset()
      setAttachmentUrls([])
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Từ chối Milestone</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="feedbackContent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="required">Nội dung phản hồi</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Nhập lý do từ chối và các yêu cầu chỉnh sửa..."
                      rows={6}
                      disabled={isPending}
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>File đính kèm (không bắt buộc)</FormLabel>
              <FileUpload
                value={null}
                onChange={handleFileChange}
                placeholder="Tải lên file đính kèm"
                disabled={isPending}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
              />
            </div>

            {attachmentUrls.length > 0 && (
              <div className="text-sm text-gray-600">
                Đã tải lên {attachmentUrls.length} file đính kèm
              </div>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isPending}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-red-600 hover:bg-red-700"
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Từ chối Milestone
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
