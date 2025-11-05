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
import { Input } from "@/components/ui/input.tsx"
import { Textarea } from "@/components/ui/textarea.tsx"
import { Label } from "@/components/ui/label.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import { Alert, AlertDescription } from "@/components/ui/alert.tsx"
import type { Project } from '@/hooks/api/projects'

interface ApplyProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ApplyProjectModal({ project, isOpen, onClose }: ApplyProjectModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    experience: '',
    expectedSalary: '',
    availableStartDate: '',
    portfolio: '',
    linkedIn: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!project) return null

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log('Submitting application:', formData)

      // Reset form and close modal
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        coverLetter: '',
        experience: '',
        expectedSalary: '',
        availableStartDate: '',
        portfolio: '',
        linkedIn: ''
      })

      setIsSubmitting(false)
      onClose()

      // Show success message (you can implement toast notification here)
      alert('Đã gửi đơn ứng tuyển thành công! Chúng tôi sẽ phản hồi trong vòng 24-48 giờ.')
    }, 2000)
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const isFormValid = formData.fullName && formData.email && formData.coverLetter && formData.experience

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#264653] text-xl">Ứng Tuyển Dự Án</DialogTitle>
          <DialogDescription className="text-base">
            <span className="font-medium text-[#2a9d8f]">{project.title}</span>
            <br />
            Ngân sách: <span className="font-semibold">${project.budget.toLocaleString()}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Hãy điền đầy đủ thông tin để tăng cơ hội được chọn. Các trường có dấu (*) là bắt buộc.
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="full-name">Họ và Tên *</Label>
              <Input
                id="full-name"
                placeholder="Nguyễn Văn A"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Số Điện Thoại</Label>
              <Input
                id="phone"
                placeholder="0123456789"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="start-date">Có Thể Bắt Đầu</Label>
              <Input
                id="start-date"
                type="date"
                value={formData.availableStartDate}
                onChange={(e) => handleChange('availableStartDate', e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="cover-letter">Thư Xin Việc *</Label>
            <Textarea
              id="cover-letter"
              placeholder="Giới thiệu bản thân, lý do ứng tuyển và cách bạn có thể đóng góp cho dự án này..."
              rows={5}
              value={formData.coverLetter}
              onChange={(e) => handleChange('coverLetter', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="experience">Kinh Nghiệm Liên Quan *</Label>
            <Textarea
              id="experience"
              placeholder="Mô tả kinh nghiệm làm việc, dự án đã thực hiện có liên quan đến yêu cầu của dự án này..."
              rows={4}
              value={formData.experience}
              onChange={(e) => handleChange('experience', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="portfolio">Link Portfolio/GitHub</Label>
              <Input
                id="portfolio"
                placeholder="https://github.com/yourname hoặc portfolio link"
                value={formData.portfolio}
                onChange={(e) => handleChange('portfolio', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn Profile</Label>
              <Input
                id="linkedin"
                placeholder="https://linkedin.com/in/yourname"
                value={formData.linkedIn}
                onChange={(e) => handleChange('linkedIn', e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="expected-salary">Mức Lương Mong Muốn (USD)</Label>
            <Input
              id="expected-salary"
              placeholder="Ví dụ: 2000-3000/tháng hoặc có thể thương lượng"
              value={formData.expectedSalary}
              onChange={(e) => handleChange('expectedSalary', e.target.value)}
            />
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
