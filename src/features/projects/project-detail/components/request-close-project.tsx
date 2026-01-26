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
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useClosureRequests } from '@/hooks/api/projects/mutation'

const requestCloseProjectSchema = z.object({
  reason: z.string().min(1, 'Vui lòng nhập lý do đóng dự án'),
  summary: z.string().min(1, 'Vui lòng nhập tóm tắt kết quả dự án'),
})

type RequestCloseProjectFormData = z.infer<typeof requestCloseProjectSchema>

interface RequestCloseProjectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  projectId: string
  onSuccess?: () => void
}

export function RequestCloseProjectModal({
  open,
  onOpenChange,
  projectId,
  onSuccess
}: RequestCloseProjectModalProps) {
  const form = useForm<RequestCloseProjectFormData>({
    resolver: zodResolver(requestCloseProjectSchema),
    defaultValues: {
      reason: '',
      summary: '',
    },
  })

  const { mutateAsync: requestClosure, isPending } = useClosureRequests()

  const onSubmit = async (data: RequestCloseProjectFormData) => {
    try {
      await requestClosure({
        projectId,
        reason: data.reason.trim(),
        summary: data.summary.trim()
      })

      toast.success('Đã gửi yêu cầu đóng dự án thành công')
      form.reset()
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error(error)
    }
  }

  const handleClose = () => {
    if (!isPending) {
      form.reset()
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Yêu cầu đóng dự án</DialogTitle>
          <DialogDescription>
            Vui lòng cung cấp lý do và tóm tắt kết quả để quản trị viên xem xét đóng dự án.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="required">Lý do đóng dự án</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="VD: Dự án đã hoàn thành, Thay đổi kế hoạch kinh doanh..."
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="required">Tóm tắt kết quả/tình trạng</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Mô tả tóm tắt kết quả đạt được hoặc tình trạng hiện tại của dự án..."
                      rows={5}
                      disabled={isPending}
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isPending}
              >
                Hủy bỏ
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Gửi yêu cầu
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}