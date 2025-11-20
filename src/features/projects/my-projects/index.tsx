import { useState } from "react"
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
import { ProjectsTable } from "../components"
import { type Project } from "../data/schema"

// Mock data
const mockProjects: Project[] = [
  {
    id: "1",
    projectId: "PRO-001",
    projectName: "Office Management App",
    description: "Ứng dụng quản lý văn phòng hiện đại",
    leader: {
      id: "leader1",
      name: "Nguyễn Văn A",
      avatar: "/avatars/leader1.jpg"
    },
    team: [
      { id: "dev1", name: "Trần B", avatar: "/avatars/dev1.jpg" },
      { id: "dev2", name: "Lê C", avatar: "/avatars/dev2.jpg" },
      { id: "dev3", name: "Phạm D", avatar: "/avatars/dev3.jpg" },
      { id: "dev4", name: "Hoàng E", avatar: "/avatars/dev4.jpg" },
    ],
    deadline: "2024-09-12",
    priority: "high",
    status: "active",
    role: "Frontend Developer",
    progress: 75
  },
  {
    id: "2",
    projectId: "PRO-002",
    projectName: "E-commerce Platform",
    description: "Nền tảng thương mại điện tử",
    leader: {
      id: "leader2",
      name: "Lê Thị B",
      avatar: "/avatars/leader2.jpg"
    },
    team: [
      { id: "dev5", name: "Vũ F", avatar: "/avatars/dev5.jpg" },
      { id: "dev6", name: "Đỗ G", avatar: "/avatars/dev6.jpg" },
    ],
    deadline: "2024-10-15",
    priority: "medium",
    status: "active",
    role: "Full Stack Developer",
    progress: 60
  },
  // Add more mock data...
]

export default function MyProjectPage() {
  const [userId] = useState("user123") // Mock user ID - replace with actual auth

  const mockSearch = {}
  const mockNavigate = () => {}

  if (!userId) {
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

  return (
    <div>
      <div className="container mx-auto px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/employee">Employee</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Projects</BreadcrumbPage>
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

        {/* Table */}
        <ProjectsTable
          data={mockProjects}
          search={mockSearch}
          navigate={mockNavigate}
        />
      </div>
    </div>
  )
}
