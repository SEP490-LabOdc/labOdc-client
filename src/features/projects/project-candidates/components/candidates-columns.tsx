import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import { type Candidate } from '../schema'

export const candidatesColumns: ColumnDef<Candidate>[] = [
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
    accessorKey: 'name',
    header: 'Tên ứng viên',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'cvUrl',
    header: 'CV',
    cell: ({ row }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => window.open(row.getValue('cvUrl'), '_blank')}
      >
        <ExternalLink className="h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'appliedAt',
    header: 'Ngày ứng tuyển',
    cell: ({ row }) => {
      const date = new Date(row.getValue('appliedAt'))
      return (
        <div className="text-sm">
          {date.toLocaleDateString('vi-VN')}
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => {
      const statusMap = {
        PENDING: { label: 'Đang chờ', className: 'bg-yellow-100 text-yellow-800' },
        APPROVED: { label: 'Đã duyệt', className: 'bg-green-100 text-green-800' },
        REJECTED: { label: 'Từ chối', className: 'bg-red-100 text-red-800' },
      }

      const status = row.getValue('status') as keyof typeof statusMap
      const config = statusMap[status] || statusMap.PENDING

      return (
        <Badge className={`${config.className} rounded-full`}>
          {config.label}
        </Badge>
      )
    },
  },
]
