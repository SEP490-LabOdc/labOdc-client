import { useState } from "react"
import { Search, Calendar, Users, Clock, MoreVertical, Eye, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx"
import { Progress } from "@/components/ui/progress.tsx"
// import { type Project } from '@/hooks/api/projects/types.ts'

// Mock data - replace with actual API call for user's participating projects
const mockParticipatingProjects = [
  {
    projectId: 1,
    projectName: "Website E-commerce Thời Trang",
    description: "Phát triển website bán hàng online với tính năng thanh toán, quản lý đơn hàng",
    status: "in_progress",
    role: "Frontend Developer",
    startDate: "2024-01-15",
    endDate: "2024-06-15",
    progress: 65,
    teamSize: 5,
    skills: [
      { id: 1, name: "React" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "Tailwind CSS" }
    ],
    clientName: "Fashion Store Co.",
    currentApplicants: 12
  },
  {
    projectId: 2,
    projectName: "Ứng Dụng Quản Lý Tài Chính",
    description: "Xây dựng ứng dụng mobile theo dõi thu chi cá nhân với AI insights",
    status: "completed",
    role: "Full Stack Developer",
    startDate: "2023-10-01",
    endDate: "2024-01-31",
    progress: 100,
    teamSize: 3,
    skills: [
      { id: 4, name: "React Native" },
      { id: 5, name: "Node.js" },
      { id: 6, name: "MongoDB" }
    ],
    clientName: "FinTech Startup",
    currentApplicants: 8
  },
  {
    projectId: 3,
    projectName: "Hệ Thống CRM Doanh Nghiệp",
    description: "Phát triển hệ thống quản lý khách hàng tích hợp với các kênh bán hàng",
    status: "in_progress",
    role: "Backend Developer",
    startDate: "2024-02-01",
    endDate: "2024-08-01",
    progress: 40,
    teamSize: 8,
    skills: [
      { id: 7, name: "Java" },
      { id: 8, name: "Spring Boot" },
      { id: 9, name: "PostgreSQL" }
    ],
    clientName: "Enterprise Corp",
    currentApplicants: 15
  }
]

const statusConfig = {
  pending: { label: "Chuẩn Bị", color: "bg-yellow-100 text-yellow-800" },
  in_progress: { label: "Đang Thực Hiện", color: "bg-blue-100 text-blue-800" },
  completed: { label: "Hoàn Thành", color: "bg-green-100 text-green-800" },
  paused: { label: "Tạm Dừng", color: "bg-gray-100 text-gray-800" }
}

export default function MyProjectPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("latest")

  const filteredProjects = mockParticipatingProjects.filter(project => {
    const matchesSearch = project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.skills.some(skill => skill.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || project.status === statusFilter

    return matchesSearch && matchesStatus
  }).sort((a, b) => {
    if (sortBy === "latest") return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    if (sortBy === "progress") return b.progress - a.progress
    if (sortBy === "name") return a.projectName.localeCompare(b.projectName)
    return 0
  })

  const getTimeRemaining = (endDate: string) => {
    const end = new Date(endDate)
    const now = new Date()
    const diffTime = end.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return "Đã kết thúc"
    if (diffDays === 0) return "Hôm nay"
    if (diffDays === 1) return "Còn 1 ngày"
    return `Còn ${diffDays} ngày`
  }

  return (
    <div className="mt-12">
      <div className="container mx-auto px-8 py-6">
        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6 w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Tìm kiếm dự án của tôi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Trạng Thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất Cả</SelectItem>
                <SelectItem value="pending">Chuẩn Bị</SelectItem>
                <SelectItem value="in_progress">Đang Thực Hiện</SelectItem>
                <SelectItem value="completed">Hoàn Thành</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sắp Xếp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Mới Nhất</SelectItem>
                <SelectItem value="progress">Tiến Độ</SelectItem>
                <SelectItem value="name">Tên A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Project List */}
        <div className="grid gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.projectId} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl text-gray-900">{project.projectName}</CardTitle>
                      <Badge className={statusConfig[project.status as keyof typeof statusConfig].color}>
                        {statusConfig[project.status as keyof typeof statusConfig].label}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-600 mb-3">
                      {project.description}
                    </CardDescription>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Vai trò: <span className="font-medium text-gray-700">{project.role}</span></span>
                      <span>Khách hàng: <span className="font-medium text-gray-700">{project.clientName}</span></span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Xem Chi Tiết
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Cập Nhật Tiến Độ
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Rời Khỏi Dự Án
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Tiến độ dự án</span>
                      <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <Badge key={skill.id} variant="outline" className="text-xs bg-[#e9f5f3] text-[#2a9d8f] border-[#2a9d8f]">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>

                  {/* Project Info */}
                  <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Bắt đầu: {new Date(project.startDate).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{getTimeRemaining(project.endDate)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{project.teamSize} thành viên</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      Xem Chi Tiết
                    </Button>
                    <Button
                      size="sm"
                      className="bg-[#2a9d8f] hover:bg-[#264653] flex-1"
                    >
                      Cập Nhật Tiến Độ
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">Không tìm thấy dự án nào</div>
            <p className="text-gray-400 mb-6">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("all")
              }}
            >
              Xóa Bộ Lọc
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
