import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { type Project } from '../data/schema'
import { Link } from '@tanstack/react-router'
import { getRoleBasePath } from '@/lib/utils'

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
    accessorKey: 'id',
    header: 'Mã dự án',
    cell: ({ row }) => {
      const id = row.getValue('id') as string
      return <div className="font-mono text-sm">{id.slice(0, 8)}</div>
    },
  },
  {
    accessorKey: 'title',
    header: 'Tên dự án',
    cell: ({ row }) => {
      const projectId = row.original.id

      const getProjectLink = (role: string, id: string) => {
        const basePath = getRoleBasePath(role)
        return { to: `${basePath}/projects/$projectId` as const, params: { projectId: id } }
      }

      const linkProps = getProjectLink(userRole, projectId)

      return (
        <Link
          {...linkProps}
          className="font-medium hover:underline"
        >
          {row.getValue('title')}
        </Link>
      )
    },
  },
  {
    accessorKey: 'mentors',
    header: 'Trưởng nhóm',
    cell: ({ row }) => {
      const mentors = row.getValue('mentors') as Project['mentors']
      const leader = mentors.find(m => m.leader)

      if (!leader) return <span className="text-sm text-gray-400">Chưa có</span>

      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {leader.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm">{leader.name}</span>
        </div>
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
