import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ProjectsTable } from "./components"
import { useUser } from '@/context/UserContext'
import { useGetMyProjects } from '@/hooks/api/projects'
import { useSearch } from '@tanstack/react-router'

export default function TalentProjectPage() {
  const { user } = useUser()
  const search = useSearch({ from: '/_authenticated/talent/projects/' })

  const status = search.status || ''

  const { data: projects, isLoading, error } = useGetMyProjects(status)
  const mockNavigate = () => {}

  if (!user) {
    return (
      <div className="mt-12">
        <div className="container mx-auto px-8 py-12 text-center">
          <div className="text-gray-500 text-lg mb-2">
            Bạn vui lòng đăng nhập để xem được thông tin dự án
          </div>
          <Button className="mt-4">
            Đăng nhập
          </Button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-8 py-12 text-center">
        <div className="text-gray-500">Đang tải dữ liệu...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-8 py-12 text-center">
        <div className="text-red-500">Lỗi khi tải dữ liệu dự án</div>
      </div>
    )
  }

  return (
    <div>
      <div className="container mx-auto px-8 py-6">
        <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 ">Dự án của tôi</h1>
        </div>

        <ProjectsTable
          data={projects?.data || []} 
          search={{}}
          navigate={mockNavigate}
        />
      </div>
    </div>
  )
}
