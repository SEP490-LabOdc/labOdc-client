import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { type Project } from '../data/schema'
import { Link } from '@tanstack/react-router'
import { MembersAvatarList } from '@/components/members-avatar-list'
import type { ProjectMember } from '@/hooks/api/projects'
import { ROLE } from '@/const'
import { UserRole } from '@/hooks/api/users'

export const createProjectsColumns = (userRole: string): ColumnDef<Project>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Chọn tất cả"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Chọn hàng"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: 'Tên dự án',
    cell: ({ row }) => {
      const projectId = row.original.id

      const getProjectRoute = (role: string) => {
        const roleRouteMap: Record<string, string> = {
          [ROLE.SYSTEM_ADMIN]: '/admin/projects/$projectId',
          [ROLE.LAB_ADMIN]: '/lab-admin/projects/$projectId',
          [ROLE.MENTOR]: '/mentor/projects/$projectId',
          [ROLE.COMPANY]: '/company-manage/projects/$projectId',
          [ROLE.USER]: '/talent/projects/$projectId',
        }
        return roleRouteMap[role] || '/talent/projects/$projectId'
      }

      const routePath = getProjectRoute(userRole)

      return (
        <Link
          to={routePath as any}
          params={{ projectId } as any}
          className="font-medium hover:underline"
        >
          {row.getValue('title')}
        </Link>
      )
    },
  },
  {
    accessorKey: 'mentors',
    header: 'Giảng Viên',
    cell: ({ row }) => {
      const mentors = row.getValue('mentors') as Project['mentors']

      // Map mentors to ProjectMember format
      const mentorMembers: ProjectMember[] = mentors.map((mentor) => ({
        projectMemberId: mentor.id,
        userId: mentor.id,
        fullName: mentor.name,
        email: '',
        avatarUrl: (mentor as any).avatar && (mentor as any).avatar.trim() !== ''
          ? (mentor as any).avatar
          : undefined,
        roleName: UserRole.MENTOR,
        isLeader: mentor.leader,
      }))

      return (
        <MembersAvatarList
          members={mentorMembers}
          maxVisible={3}
          size="sm"
          showLeaderBadge={false}
          emptyMessage="Chưa có"
        />
      )
    },
  },
  {
    accessorKey: 'talents',
    header: 'Đội ngũ',
    cell: ({ row }) => {
      const project = row.original
      // Check if talents exists in the project data
      const talents = (project as any).talents || []

      // Map talents to ProjectMember format
      const talentMembers: ProjectMember[] = talents.map((talent: any) => ({
        projectMemberId: talent.id || talent.userId,
        userId: talent.userId || talent.id,
        fullName: talent.name || talent.fullName,
        email: talent.email || '',
        avatarUrl: talent.avatar && talent.avatar.trim() !== ''
          ? talent.avatar
          : undefined,
        roleName: ROLE.TALENT as 'TALENT',
        isLeader: talent.leader || talent.isLeader || false,
      }))

      return (
        <MembersAvatarList
          members={talentMembers}
          maxVisible={3}
          size="sm"
          showLeaderBadge={false}
          emptyMessage="Chưa có"
        />
      )
    },
  },
  {
    accessorKey: 'endDate',
    header: 'Ngày kết thúc',
    cell: ({ row }) => {
      const endDate = row.getValue('endDate')
      if (!endDate) return <span className="text-sm text-gray-400">Chưa xác định</span>

      return (
        <div className="text-sm">
          {new Date(endDate as string).toLocaleDateString('vi-VN')}
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => {
      const statusMap = {
        PLANNING: { label: 'Đang lên kế hoạch', className: 'bg-yellow-100 text-yellow-800' },
        IN_PROGRESS: { label: 'Đang thực hiện', className: 'bg-blue-100 text-blue-800' },
        COMPLETED: { label: 'Hoàn thành', className: 'bg-green-100 text-green-800' },
        ON_HOLD: { label: 'Tạm dừng', className: 'bg-red-100 text-red-800' },
      }

      const status = row.getValue('status') as keyof typeof statusMap
      const config = statusMap[status]

      return (
        <Badge className={`${config.className} rounded-full`}>
          {config.label}
        </Badge>
      )
    },
  },
]
