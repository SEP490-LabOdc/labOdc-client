import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Link } from '@tanstack/react-router'
import type { Project } from '@/features/projects/data/schema.ts'
import { getProjectStatusColor, getProjectStatusLabel } from '@/lib/utils.ts'

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
      const title = row.getValue('title') as string
      const projectId = row.original.id
      return (
        <Link
          to="/talent/projects/$projectId"
          params={{ projectId }}
          className="font-medium hover:underline"
        >
          {title}
        </Link>
      )
    },
  },
  {
    accessorKey: 'mentors',
    header: 'Giảng viên',
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
      const status = row.getValue('status') as string

      return (
        <Badge className={`${getProjectStatusColor(status)} rounded-full`}>
          {getProjectStatusLabel(status)}
        </Badge>
      )
    },
  },
]
