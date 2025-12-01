import { useState } from "react"
import { Send, AlertCircle, FileText } from "lucide-react"
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
import { useGetMySubmittedCv } from '@/hooks/api/users/queries.ts'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx"

interface ApplyProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

interface SubmittedCv {
  projectName: string
  submittedAt: string
  fileLink: string
  fileName: string
}

export function ApplyProjectModal({ project, isOpen, onClose }: ApplyProjectModalProps) {
  const [cvUrl, setCvUrl] = useState<string | null>(null)
  const [selectedMode, setSelectedMode] = useState<'existing' | 'new'>('existing')
  const [selectedExistingCv, setSelectedExistingCv] = useState<string | null>(null)
  const { user } = useAuthStore()
  const createApplicationMutation = useCreateProjectApplication()
  const { data: submittedCvs, isLoading: isLoadingCvs } = useGetMySubmittedCv()

  if (!project) return null

  const handleSubmit = async () => {
    if (!user?.userId) return

    const finalCvUrl = selectedMode === 'existing' ? selectedExistingCv : cvUrl
    if (!finalCvUrl) return

    try {
      await createApplicationMutation.mutateAsync({
        userId: user.userId,
        projectId: project.projectId,
        cvUrl: finalCvUrl
      })

      // Reset form và đóng modal
      setCvUrl(null)
      setSelectedExistingCv(null)
      setSelectedMode('existing')
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

  const isFormValid = selectedMode === 'existing' ? selectedExistingCv !== null : cvUrl !== null
  const isSubmitting = createApplicationMutation.isPending

  const existingCvList = (submittedCvs?.data || []) as SubmittedCv[]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn("max-w-4xl max-h-[90vh] overflow-y-auto")}>
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
              Bạn có thể chọn CV đã upload trước đó hoặc tải lên CV mới để ứng tuyển dự án này.
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

          <div className="space-y-4">
            <Label className="text-base font-medium">Chọn Phương Thức Upload CV *</Label>

            <RadioGroup value={selectedMode} onValueChange={(value) => setSelectedMode(value as 'existing' | 'new')}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="existing" id="existing" />
                <Label htmlFor="existing" className="cursor-pointer">Chọn từ CV đã tải lên</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="new" id="new" />
                <Label htmlFor="new" className="cursor-pointer">Tải lên CV mới</Label>
              </div>
            </RadioGroup>

            {selectedMode === 'existing' && (
              <div className="mt-4">
                {isLoadingCvs ? (
                  <div className="text-center py-4">Đang tải danh sách CV...</div>
                ) : existingCvList.length === 0 ? (
                  <Alert>
                    <AlertDescription>
                      Bạn chưa có CV nào. Vui lòng chọn "Tải lên CV mới".
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-2">
                    {existingCvList.map((cv: SubmittedCv, index: number) => (
                      <div
                        key={`${cv.fileLink}-${index}`}
                        className={cn(
                          "border rounded-lg p-4 cursor-pointer transition-colors",
                          selectedExistingCv === cv.fileLink
                            ? "border-[#2a9d8f] bg-[#e9f5f3]"
                            : "border-gray-200 hover:border-[#2a9d8f]"
                        )}
                        onClick={() => setSelectedExistingCv(cv.fileLink)}
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-[#2a9d8f]" />
                          <div className="flex-1">
                            <p className="font-medium">{cv.fileName || cv.projectName}</p>
                            <p className="text-sm text-gray-500">
                              Dự án: {cv.projectName}
                            </p>
                            <p className="text-sm text-gray-500">
                              Đã nộp: {new Date(cv.submittedAt).toLocaleDateString('vi-VN')}
                            </p>
                          </div>
                          {selectedExistingCv === cv.fileLink && (
                            <Badge className="bg-[#2a9d8f]">Đã chọn</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {selectedMode === 'new' && (
              <div className="mt-4">
                <FileUpload
                  value={cvUrl}
                  onChange={setCvUrl}
                  accept=".pdf,.doc,.docx"
                  maxSize={10}
                  placeholder="Chọn CV để tải lên"
                  disabled={isSubmitting}
                  className="w-full"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Hỗ trợ định dạng: PDF, DOC, DOCX (tối đa 10MB)
                </p>
              </div>
            )}
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
