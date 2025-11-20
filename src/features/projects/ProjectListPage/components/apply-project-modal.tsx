import { useState } from "react"
import { Send, AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Label } from "@/components/ui/label.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import { Alert, AlertDescription } from "@/components/ui/alert.tsx"
import { FileUpload } from "@/components/file/FileUpload.tsx"
import { toast } from "sonner"
import type { Project } from '@/hooks/api/projects'
import { useCreateProjectApplication } from '@/hooks/api/projects/mutation.ts'
import { useAuthStore } from '@/stores/auth-store.ts'
import { cn } from '@/lib/utils.ts'

interface ApplyProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ApplyProjectModal({ project, isOpen, onClose }: ApplyProjectModalProps) {
  const [cvUrl, setCvUrl] = useState<string | null>(null)
  const { user } = useAuthStore()
  const createApplicationMutation = useCreateProjectApplication()

  if (!project) return null

  const handleSubmit = async () => {
    if (!user?.userId || !cvUrl) return

    try {
      await createApplicationMutation.mutateAsync({
        userId: user.userId,
        projectId: project.projectId,
        cvUrl: cvUrl
      })

      // Reset form và đóng modal
      setCvUrl(null)
      onClose()

      toast.success("Gửi đơn ứng tuyển thành công!", {
        description: "Chúng tôi sẽ phản hồi trong vòng 24-48 giờ."
      })
    } catch (error) {
      console.error('Error submitting application:', error)
      toast.error("Gửi đơn ứng tuyển thất bại", {
        description: "Có lỗi xảy ra. Vui lòng thử lại sau."
      })
    }
  }

  const isFormValid = cvUrl !== null
  const isSubmitting = createApplicationMutation.isPending

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn("max-w-4xl")}>
        <DialogHeader>
          <DialogTitle className="text-[#264653] text-xl">Ứng Tuyển Dự Án</DialogTitle>
          <DialogDescription className="text-base">
            <span className="font-medium text-[#2a9d8f]">{project.projectName}</span>
            <br />
            Thời gian: {new Date(project.startDate).toLocaleDateString('vi-VN')} - {new Date(project.endDate).toLocaleDateString('vi-VN')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Bạn chỉ cần upload CV để ứng tuyển dự án này. Hãy đảm bảo CV của bạn thể hiện được kỹ năng phù hợp.
            </AlertDescription>
          </Alert>

          <div>
            <h4 className="font-semibold mb-3 text-[#264653]">Kỹ Năng Yêu Cầu</h4>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <Badge key={skill.id} variant="outline" className="bg-[#e9f5f3] text-[#2a9d8f] border-[#2a9d8f]">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="cv-upload" className="text-base font-medium">
              Upload CV/Resume *
            </Label>
            <div className="mt-2">
              <FileUpload
                value={cvUrl}
                onChange={setCvUrl}
                accept=".pdf,.doc,.docx"
                maxSize={10}
                placeholder="Chọn CV để tải lên"
                disabled={isSubmitting}
                className="w-full"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Hỗ trợ định dạng: PDF, DOC, DOCX (tối đa 10MB)
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-[#264653] mb-2">💡 Lưu ý quan trọng</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Đảm bảo CV có thông tin liên hệ đầy đủ</li>
              <li>• Nêu rõ kinh nghiệm liên quan đến các kỹ năng yêu cầu</li>
              <li>• Include portfolio hoặc link GitHub nếu có</li>
              <li>• CV nên được cập nhật và phù hợp với dự án</li>
            </ul>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Hủy Bỏ
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-[#2a9d8f] hover:bg-[#264653]"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? (
                <>Đang gửi...</>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Gửi Đơn Ứng Tuyển
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
