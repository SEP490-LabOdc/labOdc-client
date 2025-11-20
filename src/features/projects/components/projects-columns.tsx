import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Edit, Trash2 } from 'lucide-react'
import { type Project } from '../data/schema'
import { Link } from '@tanstack/react-router'

const statusConfig = {
  active: { label: 'Đang hoạt động', className: 'bg-green-100 text-green-800' },
  inactive: { label: 'Không hoạt động', className: 'bg-red-100 text-red-800' },
  completed: { label: 'Hoàn thành', className: 'bg-blue-100 text-blue-800' },
  pending: { label: 'Đang chờ', className: 'bg-yellow-100 text-yellow-800' },
}

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
    accessorKey: 'projectId',
    header: 'Mã dự án',
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue('projectId')}</div>
    ),
  },
  {
    accessorKey: 'projectName',
    header: 'Tên dự án',
    cell: ({ row }) => (
      <Link to={'/talent/my-projects/detail'} className="font-medium hover:underline">{row.getValue('projectName')}</Link>
    ),
  },
  {
    accessorKey: 'leader',
    header: 'Trưởng nhóm',
    cell: ({ row }) => {
      const leader = row.getValue('leader') as Project['leader']
      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={leader.avatar} />
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
    accessorKey: 'team',
    header: 'Nhóm',
    cell: ({ row }) => {
      const team = row.getValue('team') as Project['team']
      const displayTeam = team.slice(0, 3)
      const remainingCount = team.length - 3

      return (
        <div className="flex items-center gap-1">
          {displayTeam.map((member) => (
            <Avatar key={member.id} className="h-7 w-7 border-2 border-white">
              <AvatarImage src={member.avatar} />
              <AvatarFallback className="text-xs">
                {member.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          ))}
          {remainingCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              +{remainingCount}
            </Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'deadline',
    header: 'Ngày kết thúc',
    cell: ({ row }) => {
      const deadline = new Date(row.getValue('deadline'))
      return (
        <div className="text-sm">
          {deadline.toLocaleDateString('vi-VN')}
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => {
      const status = row.getValue('status') as keyof typeof statusConfig
      const config = statusConfig[status]

      return (
        <Badge className={`${config.className} rounded-full`}>
          {config.label}
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    header: 'Hành động',
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-red-600">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
]
