import { type ColumnDef } from '@tanstack/react-table'
import { cn, getRoleBasePath } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { DataTableRowActions } from './data-table-row-actions'
import { Link } from '@tanstack/react-router'
import { useUser } from '@/context/UserContext'
import { REQUEST_STATUS_LABEL, REQUEST_TYPE_LABEL, type Request, type RequestStatus, type RequestType } from '../data/schema'
import { requestStatusCallTypes, requestTypeCallTypes } from '../data/data'
import { formatDateTime } from '@/helpers/datetime'


export const requestColumns: ColumnDef<Request>[] = [
    {
        accessorKey: 'code',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Mã yêu cầu' />
        ),
        cell: ({ row }) => (


            <LongText className='max-w-36 ps-3'>
                {(() => {
                    const { user } = useUser();
                    const id = row.original.id;
                    const linkTo = getRoleBasePath(user.role) + `/requests/${id}`

                    return (
                        <Link to={linkTo} className="hover:underline">
                            {row.getValue('code')}
                        </Link>
                    );
                })()}
            </LongText>
        ),
        meta: { className: 'w-40' },
        enableHiding: false,
    },

    {
        accessorKey: 'requestType',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Loại yêu cầu' />
        ),
        cell: ({ row }) => {
            const requestType = row.original.requestType

            return (
                <Badge variant='outline' className={cn('capitalize border-none', requestTypeCallTypes.get(requestType))}>
                    {REQUEST_TYPE_LABEL[requestType as RequestType]}
                </Badge>
            )
        },
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
        enableHiding: false,
    },

    {
        accessorKey: 'createdByName',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Người gửi' />
        ),
        cell: ({ row }) => <div>{row.getValue('createdByName') ?? '-'}</div>,
    },
    {
        accessorKey: 'targetName',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Đối tượng cần cập nhật' />
        ),
        cell: ({ row }) => <div>{row.getValue('targetName') ?? '-'}</div>,
    },

    {
        accessorKey: 'status',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Trạng thái' />
        ),
        cell: ({ row }) => {
            const status = row.original.status

            return (
                <Badge variant='outline' className={cn('capitalize border-none', requestStatusCallTypes.get(status))}>
                    {REQUEST_STATUS_LABEL[status as RequestStatus]}
                </Badge>
            )
        },
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
        enableHiding: false,
    },

    {
        accessorKey: 'processedByName',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Người xử lý' />
        ),
        cell: ({ row }) => <div>{row.getValue('processedByName') ?? '-'}</div>,
    },

    {
        accessorKey: 'note',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Ghi chú' />
        ),
        cell: ({ row }) => <div>{row.getValue('note') ?? '-'}</div>,
    },
    {
        accessorKey: 'createdAt',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Được tạo vào' />
        ),
        cell: ({ row }) => {
            const value = row.getValue('createdAt') as Date | null

            return (
                <div>
                    {value ? formatDateTime(value) : '-'}
                </div>
            )
        },
    },
    {
        accessorKey: 'updatedAt',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Được cập nhật vào' />
        ),
        cell: ({ row }) => {
            const value = row.getValue('updatedAt') as Date | null

            return (
                <div>
                    {value ? formatDateTime(value) : '-'}
                </div>
            )
        },
    },

    {
        id: 'actions',
        cell: DataTableRowActions,
    },
]
