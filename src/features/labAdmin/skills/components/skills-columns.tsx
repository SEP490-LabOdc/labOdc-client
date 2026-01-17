import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { type Skill } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export const createSkillsColumns = (
    onOpenEdit: (skill: Skill) => void,
    onOpenDelete: (skill: Skill) => void
): ColumnDef<Skill>[] => [
        {
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && 'indeterminate')
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label='Chọn tất cả'
                    className='translate-y-[2px]'
                />
            ),
            meta: {
                className: cn('sticky md:table-cell start-0 z-10 rounded-tl-[inherit]'),
            },
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label='Chọn hàng'
                    className='translate-y-[2px]'
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'name',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title='Tên kỹ năng' />
            ),
            cell: ({ row }) => (
                <div className='ps-3 font-medium'>
                    {row.getValue('name')}
                </div>
            ),
            meta: { className: 'w-[300px] min-w-[200px]' },
        },
        {
            accessorKey: 'description',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title='Mô tả' />
            ),
            cell: ({ row }) => {
                const description = row.getValue('description') as string | null | undefined
                return (
                    <LongText className='text-sm text-muted-foreground ps-3'>
                        {description || '-'}
                    </LongText>
                )
            },
            meta: { className: 'w-full' },
        },
        {
            accessorKey: 'isDeleted',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title='Đã xóa' />
            ),
            cell: ({ row }) => {
                const isDeleted = row.getValue('isDeleted') as boolean | null | undefined
                return (
                    <div className='ps-3'>
                        {isDeleted ? (
                            <Badge variant="destructive">Không hoạt động</Badge>
                        ) : (
                            <Badge variant="secondary">Hoạt động</Badge>
                        )}
                    </div>
                )
            },
            meta: { className: 'w-full' },
        },
        {
            id: 'actions',
            cell: ({ row }) => (
                <DataTableRowActions
                    row={row}
                    onOpenEdit={onOpenEdit}
                    onOpenDelete={onOpenDelete}
                />
            ),
            enableHiding: false,
            meta: { className: 'w-[100px]' },
        },
    ]

