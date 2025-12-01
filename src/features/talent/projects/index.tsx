import { Plus, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/mentor">Mentor</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dự án</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-2xl font-bold text-gray-900 mt-2">Dự án của tôi</h1>
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Export PDF</DropdownMenuItem>
                <DropdownMenuItem>Export Excel</DropdownMenuItem>
                <DropdownMenuItem>Export CSV</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="h-4 w-4 mr-2" />
              Tham gia dự án
            </Button>
          </div>
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
