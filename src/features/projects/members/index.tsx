import { useNavigate, useParams } from '@tanstack/react-router'
import { useGetProjectMembers } from '@/hooks/api/projects/queries'
import { type ProjectMember } from '@/hooks/api/projects'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Users, Loader2 } from 'lucide-react'
import { ProjectMembersTable } from './components'
import { getRoleBasePath } from '@/lib/utils'
import { useUser } from '@/context/UserContext'

export default function ProjectMembersPage() {
  const { projectId } = useParams({ strict: false })
  const navigate = useNavigate()
  const { user } = useUser()

  const { data: projectMembersData, isLoading } = useGetProjectMembers(projectId as string)
  const projectMembers = projectMembersData?.data || []

  // Group members by role
  const mentors = projectMembers.filter((m: ProjectMember) => m.roleName === 'MENTOR')
  const talents = projectMembers.filter((m: ProjectMember) => m.roleName === 'TALENT')

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#2a9d8f]" />
          <p className="text-gray-500 mt-4">Đang tải...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const basePath = getRoleBasePath(user?.role || '')
              navigate({ to: `${basePath}/projects/${projectId}` })
            }}
            className="mb-4 hover:bg-gray-100"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Quay lại dự án
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Users className="h-8 w-8 text-[#2a9d8f]" />
                Thành viên dự án
              </h1>
              <p className="text-gray-500 mt-2">
                Quản lý và xem danh sách thành viên tham gia dự án
              </p>
            </div>
          </div>
        </div>

        {/* Mentors Section */}
        <ProjectMembersTable
          members={mentors}
          title="Mentors"
          emptyMessage="Chưa có mentor nào trong dự án"
          iconColor="#2a9d8f"
        />

        {/* Talents Section */}
        <ProjectMembersTable
          members={talents}
          title="Talents"
          emptyMessage="Chưa có talent nào trong dự án"
          iconColor="#e76f51"
        />
      </div>
    </div>
  )
}