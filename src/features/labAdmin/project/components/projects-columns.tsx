import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { PROJECT_STATUS_LABEL, type Project } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'
import { Link } from '@tanstack/react-router'
import { callTypes } from '../data/data'
import { formatDateOnly } from '@/helpers/datetime'

// Column definitions
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
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        meta: {
            className: cn('sticky md:table-cell start-0 z-10 rounded-tl[inherit]'),
        },
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },

    // ===== Title =====
    {
        accessorKey: 'title',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tên dự án" />
        ),
        cell: ({ row }) => {
            const id = row.original.id
            const linkTo = `/lab-admin/projects/${id}`

            return (
                <LongText className="max-w-40 ps-3">
                    <Link to={linkTo} className="hover:underline">
                        {row.getValue('title')}
                    </Link>
                </LongText>
            )
        },
        meta: {
            className: cn(
                'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
                'sticky start-6 @4xl/content:table-cell @4xl/content:drop-shadow-none m-0',
            ),
        },
        enableHiding: false,
    },

    // ===== Description =====
    {
        accessorKey: 'description',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Mô tả" />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-40">{row.getValue('description')}</LongText>
        ),
        meta: { className: 'w-40' },
        enableHiding: true,
    },

    // ===== Budget =====
    {
        accessorKey: 'budget',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Ngân sách (VND)" />
        ),
        cell: ({ row }) => {
            const value = row.getValue('budget') as string
            return <div>{Number(value).toLocaleString('vi-VN')}</div>
        },
    },

    // ===== Start Date =====
    {
        accessorKey: 'startDate',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Ngày bắt đầu" />
        ),
        cell: ({ row }) => {
            const dateString = row.getValue('startDate') as string
            const dateValue = new Date(dateString)
            if (isNaN(dateValue.getTime())) return <div>Không hợp lệ</div>
            return <div>{formatDateOnly(dateValue)}</div>
        },
    },

    // ===== End Date =====
    {
        accessorKey: 'endDate',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Ngày kết thúc" />
        ),
        cell: ({ row }) => {
            const dateString = row.getValue('endDate') as string
            const dateValue = new Date(dateString)
            if (isNaN(dateValue.getTime())) return <div>Không hợp lệ</div>
            return <div>{formatDateOnly(dateValue)}</div>
        },
    },

    // ===== Status =====
    {
        accessorKey: 'status',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Trạng thái" />
        ),
        cell: ({ row }) => {
            const status = row.original.status
            const vietnameseStatusLabel =
                PROJECT_STATUS_LABEL[status as keyof typeof PROJECT_STATUS_LABEL]

            const badgeColor = callTypes.get(status)
            return (
                <div className="flex space-x-2">
                    <Badge variant="outline" className={cn('capitalize', badgeColor)}>
                        {vietnameseStatusLabel}
                    </Badge>
                </div>
            )
        },
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
        enableHiding: false,
    },

    // ===== Skills =====
    {
        accessorKey: 'skills',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Kỹ năng yêu cầu" />
        ),
        cell: ({ row }) => {
            const skills = row.original.skills || []
            return (
                <div className="relative max-w-[260px] max-h-[3.2rem] overflow-hidden">
                    <div className="flex flex-wrap gap-1">
                        {skills.length > 0 ? (
                            skills.map((skill) => (
                                <Badge
                                    key={skill.id}
                                    variant="secondary"
                                    className="text-xs px-2 py-0.5"
                                >
                                    {skill.name}
                                </Badge>
                            ))
                        ) : (
                            <span className="text-muted-foreground text-sm">Không có</span>
                        )}
                    </div>
                </div>
            )
        },
        enableHiding: true,
    },

    // ===== Actions =====
    {
        id: 'actions',
        cell: DataTableRowActions,
    },
]
