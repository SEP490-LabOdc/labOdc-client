import React, { useState } from "react"
import { Search, Filter } from 'lucide-react'
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { type Project } from '@/hooks/api/projects/types.ts'
import { ApplyProjectModal, ProjectCard, ProjectDetailView } from './components'
import { useGetProjectHiring } from '@/hooks/api/projects'
import { useAuthStore } from '@/stores/auth-store.ts'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

export default function ProjectListPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDuration, setSelectedDuration] = useState("all")
  const [selectedDisplayPriority, setSelectedDisplayPriority] = useState("newest")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(3)

  const navigate = useNavigate()
  const { data: response, isPending } = useGetProjectHiring(currentPage, pageSize)
  const { isAuthenticated } = useAuthStore()

  const projects = response?.data?.data ?? []
  const paginationInfo = response?.data ? {
    totalPages: response.data.totalPages,
    currentPage: response.data.currentPage,
    hasNext: response.data.hasNext,
    hasPrevious: response.data.hasPrevious,
    totalElements: response.data.totalElements,
  } : null

  const filteredAndSortedProjects = projects
    .filter((project: Project) => {
      const matchesSearch = project.projectName.toLowerCase().includes(searchTerm.toLowerCase())

      let matchesDuration = true
      if (selectedDuration !== "all") {
        const duration = Math.ceil((new Date(project.endDate).getTime() - new Date(project.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30))
        if (selectedDuration === "short") matchesDuration = duration < 3
        else if (selectedDuration === "medium") matchesDuration = duration >= 3 && duration <= 6
        else if (selectedDuration === "long") matchesDuration = duration > 6
      }

      return matchesSearch && matchesDuration
    })
    .sort((a: Project, b: Project) => {
      if (selectedDisplayPriority === "newest") {
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      }
      if (selectedDisplayPriority === "urgent") {
        return a.currentApplicants - b.currentApplicants
      }
      if (selectedDisplayPriority === "high_salary") {
        return b.skills.length - a.skills.length
      }
      return 0
    })

  React.useEffect(() => {
    if (!selectedProject && filteredAndSortedProjects.length > 0) {
      setSelectedProject(filteredAndSortedProjects[0])
    }
  }, [filteredAndSortedProjects])

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project)
  }

  const handleApplyProject = async (project: Project) => {
    if (!isAuthenticated()) {
      sessionStorage.setItem("pendingApplication", project.projectId.toString())
      toast.info("Vui lòng đăng nhập để ứng tuyển dự án")
      await navigate({ to: "/sign-in" })
      return
    }

    setSelectedProject(project)
    setShowApplyModal(true)
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    setSelectedProject(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPageNumbers = () => {
    if (!paginationInfo) return null

    const { currentPage, totalPages } = paginationInfo
    const pages: (number | 'ellipsis')[] = []

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 'ellipsis', totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, 'ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages)
      }
    }

    return pages.map((page, idx) =>
      page === 'ellipsis' ? (
        <PaginationItem key={`ellipsis-${idx}`}>
          <PaginationEllipsis />
        </PaginationItem>
      ) : (
        <PaginationItem key={page}>
          <PaginationLink
            onClick={() => handlePageChange(page)}
            isActive={currentPage === page}
            className="cursor-pointer"
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      )
    )
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground">Đang tải dự án...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 text-balance">Tìm Dự Án Phù Hợp Với Bạn</h1>
          <p className="text-xl mb-8 text-primary-foreground/80 max-w-2xl mx-auto text-pretty">
            Khám phá các dự án thú vị, ứng tuyển với kỹ năng của bạn và phát triển sự nghiệp cùng các công ty hàng đầu.
          </p>
        </div>
      </section>

      <section className="py-8 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Tìm kiếm dự án theo từ khóa, kỹ năng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4 items-center">
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

      <section className="py-8 bg-muted min-h-[calc(100vh-200px)]">
        <div className="container mx-auto text-lg font-medium text-foreground mb-6">
          Tìm thấy <span className="font-bold">{paginationInfo?.totalElements || 0}</span> việc làm phù hợp.
        </div>
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {filteredAndSortedProjects.map((project: Project) => (
                <ProjectCard
                  key={project.projectId}
                  project={project}
                  onViewDetails={() => { }}
                  onApply={handleApplyProject}
                  onSelect={handleSelectProject}
                  isSelected={selectedProject?.projectId === project.projectId}
                />
              ))}
            </div>

            {filteredAndSortedProjects.length === 0 && !isPending && (
              <div className="text-center py-12 bg-card rounded-md shadow-sm border border-border">
                <div className="text-muted-foreground text-lg mb-4">Không tìm thấy dự án nào.</div>
                <Button variant="outline" onClick={() => { setSearchTerm(""); setSelectedDisplayPriority("newest"); }}>
                  Xóa Bộ Lọc
                </Button>
              </div>
            )}

            {paginationInfo && paginationInfo.totalPages > 1 && (
              <Pagination className="mt-6">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => paginationInfo.hasPrevious && handlePageChange(currentPage - 1)}
                      className={!paginationInfo.hasPrevious ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>

                  {renderPageNumbers()}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => paginationInfo.hasNext && handlePageChange(currentPage + 1)}
                      className={!paginationInfo.hasNext ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>

          <div className="lg:col-span-3">
            <ProjectDetailView
              project={selectedProject}
              onApply={handleApplyProject}
            />
          </div>
        </div>
      </section>

      {isAuthenticated() && (
        <ApplyProjectModal
          project={selectedProject}
          isOpen={showApplyModal}
          onClose={() => setShowApplyModal(false)}
        />
      )}
    </div>
  )
}
