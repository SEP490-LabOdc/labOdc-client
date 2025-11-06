import { useState } from "react"
import { Search, Filter, Clock, DollarSign, Users, Star } from "lucide-react"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx"
import { projects } from "../data/project-data.ts"
import { type Project, ProjectTypes } from '@/hooks/api/projects/types.ts'
import { ProjectDetailModal } from "./components/ProjectDetailModal"
import { ApplyProjectModal } from "./components/ApplyProjectModal"


export default function ProjectListPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedDuration, setSelectedDuration] = useState("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showApplyModal, setShowApplyModal] = useState(false)

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.skills.some((skill) => skill.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = selectedType === "all" || project.status === selectedType
    return matchesSearch && matchesType
  })

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project)
    setShowDetailModal(true)
  }

  const handleApplyProject = (project: Project) => {
    setSelectedProject(project)
    setShowApplyModal(true)
  }

  const getStatusText = (status: ProjectTypes): string => {
    const statusMap: Record<ProjectTypes, string> = {
      [ProjectTypes.OPEN]: 'Đang Mở',
      [ProjectTypes.IN_PROGRESS]: 'Đang Thực Hiện',
      [ProjectTypes.COMPLETED]: 'Hoàn Thành',
      [ProjectTypes.CLOSED]: 'Đã Đóng'
    }
    return statusMap[status] || status
  }

  const getStatusColor = (status: ProjectTypes): string => {
    const colorMap: Record<ProjectTypes, string> = {
      [ProjectTypes.OPEN]: 'bg-green-100 text-green-800',
      [ProjectTypes.IN_PROGRESS]: 'bg-blue-100 text-blue-800',
      [ProjectTypes.COMPLETED]: 'bg-gray-100 text-gray-800',
      [ProjectTypes.CLOSED]: 'bg-red-100 text-red-800'
    }
    return colorMap[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="bg-[#264653] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 text-balance">Tìm Dự Án Phù Hợp Với Bạn</h1>
          <p className="text-xl mb-8 text-slate-200 max-w-2xl mx-auto text-pretty">
            Khám phá các dự án thú vị, ứng tuyển với kỹ năng của bạn và phát triển sự nghiệp cùng các công ty hàng đầu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#e9c46a] text-[#264653] hover:bg-[#f4a261] font-semibold">
              Tạo Hồ Sơ Talent
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#264653] bg-transparent"
            >
              Xem Dự Án Phù Hợp
            </Button>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm dự án theo từ khóa, kỹ năng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4 items-center">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Trạng Thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất Cả</SelectItem>
                  <SelectItem value={ProjectTypes.OPEN}>Đang Mở</SelectItem>
                  <SelectItem value={ProjectTypes.IN_PROGRESS}>Đang Thực Hiện</SelectItem>
                  <SelectItem value={ProjectTypes.COMPLETED}>Hoàn Thành</SelectItem>
                  <SelectItem value={ProjectTypes.CLOSED}>Đã Đóng</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Thời Gian" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất Cả</SelectItem>
                  <SelectItem value="short">{"Ngắn Hạn (< 3 tháng)"}</SelectItem>
                  <SelectItem value="medium">{"Trung Hạn (3-6 tháng)"}</SelectItem>
                  <SelectItem value="long">{"Dài Hạn (> 6 tháng)"}</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Lọc Theo Kỹ Năng
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Project Listings */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#264653]">Dự Án Có Sẵn</h2>
              <p className="text-gray-600 mt-2">Tìm thấy {filteredProjects.length} dự án phù hợp</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-[#2a9d8f] hover:scale-105">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={getStatusColor(project.status as ProjectTypes)}>
                      {getStatusText(project.status as ProjectTypes)}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      {Math.floor(Math.random() * 15) + 5} ứng viên
                    </div>
                  </div>
                  <CardTitle className="text-[#264653] text-lg hover:text-[#2a9d8f] transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-sm line-clamp-3">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {project.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill.id} variant="outline" className="text-xs bg-[#e9f5f3] text-[#2a9d8f] border-[#2a9d8f]">
                          {skill.name}
                        </Badge>
                      ))}
                      {project.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs bg-gray-50">
                          +{project.skills.length - 3} kỹ năng
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Hạn: {new Date(project.endDate).toLocaleDateString('vi-VN')}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span className="font-semibold text-[#264653]">Ngân sách: ${project.budget.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                        <span>Đánh giá: {(Math.random() * 1 + 4).toFixed(1)}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Đăng {Math.floor(Math.random() * 7) + 1} ngày trước
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent hover:bg-[#f8f9fa]"
                        onClick={() => handleViewDetails(project)}
                      >
                        Chi Tiết
                      </Button>
                      <Button
                        size="sm"
                        className="bg-[#2a9d8f] hover:bg-[#264653] flex-1"
                        onClick={() => handleApplyProject(project)}
                        disabled={project.status === ProjectTypes.CLOSED || project.status === ProjectTypes.COMPLETED}
                      >
                        {project.status === ProjectTypes.OPEN ? 'Ứng Tuyển Ngay' : 'Không Khả Dụng'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">Không tìm thấy dự án phù hợp</div>
              <p className="text-gray-400 mb-6">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedType("all")
                  setSelectedDuration("all")
                }}
              >
                Xóa Bộ Lọc
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Success Tips Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#264653] mb-4">Mẹo Ứng Tuyển Thành Công</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tăng cơ hội được chọn với những lời khuyên từ các chuyên gia
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#e9c46a] rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-[#264653]" />
              </div>
              <h3 className="text-xl font-semibold text-[#264653]">Hồ Sơ Chuyên Nghiệp</h3>
              <p className="text-gray-600">Tạo hồ sơ đầy đủ với kỹ năng, kinh nghiệm và portfolio ấn tượng</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#2a9d8f] rounded-full flex items-center justify-center mx-auto">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#264653]">Đề Xuất Chất Lượng</h3>
              <p className="text-gray-600">Viết đề xuất chi tiết, thể hiện hiểu biết về dự án và giải pháp</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#f4a261] rounded-full flex items-center justify-center mx-auto">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#264653]">Phản Hồi Nhanh</h3>
              <p className="text-gray-600">Ứng tuyển sớm và phản hồi kịp thời với nhà tuyển dụng</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#264653] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Sẵn Sàng Bắt Đầu Sự Nghiệp?</h2>
          <p className="text-xl mb-8 text-slate-200 max-w-2xl mx-auto">
            Tham gia cộng đồng talent và kết nối với các cơ hội việc làm tốt nhất
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#e76f51] hover:bg-[#f4a261] text-white font-semibold">
              Tạo Hồ Sơ Miễn Phí
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#264653] bg-transparent"
            >
              Tìm Hiểu Thêm
            </Button>
          </div>
        </div>
      </section>

      {/* Modals */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />

      <ApplyProjectModal
        project={selectedProject}
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
      />
    </div>
  )
}
