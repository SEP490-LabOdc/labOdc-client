import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Link } from '@tanstack/react-router'
import type { Project } from '@/features/projects/data/schema.ts'
import { getStatusColor, getStatusLabel } from '@/lib/utils.ts'
import { LongText } from '@/components/long-text.tsx'
import { MembersAvatarList } from '@/components/members-avatar-list'
import type { ProjectMember } from '@/hooks/api/projects'
import { UserRole } from '@/hooks/api/users'

export const projectsColumns: ColumnDef<Project>[] = [
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
      const title = row.getValue('title') as string
      const projectId = row.original.id
      return (
        <LongText className="max-w-36 ps-3">
          <Link
            to="/mentor/projects/$projectId"
            params={{ projectId }}
            className="font-medium hover:underline"
          >
            {title}
          </Link>
        </LongText>
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
        roleName: UserRole.TALENT,
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
      const status = row.getValue('status') as string

      return (
        <Badge className={`${getStatusColor(status)} rounded-full`}>
          {getStatusLabel(status)}
        </Badge>
      )
    },
  },
]
