import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'
import { type Candidate } from '../schema'
import { getCandidateStatusColor, getCandidateStatusLabel } from '@/lib/utils'
import { CandidateActionsCell } from './candidate-actions-cell'

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
        className="text-blue-600 hover:text-blue-800"
      >
        <FileText className="h-4 w-4 mr-1" />
        Xem CV
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
      const status = row.getValue('status') as string

      return (
        <Badge className={`${getCandidateStatusColor(status)} rounded-full`}>
          {getCandidateStatusLabel(status)}
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    header: 'Thao tác',
    cell: ({ row }) => <CandidateActionsCell candidate={row.original} />,
  },
]
