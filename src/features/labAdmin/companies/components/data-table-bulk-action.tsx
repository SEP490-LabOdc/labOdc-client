import { useState } from 'react'
import { type Table } from '@tanstack/react-table'
import { CheckCircle2, Lock, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { sleep } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { DataTableBulkActions as BulkActionsToolbar } from '@/components/data-table'
import { type Company } from '../data/schema'
import { UsersMultiDeleteDialog } from './users-multi-delete-dialog'

type DataTableBulkActionsProps<TData> = {
    table: Table<TData>
}

export function DataTableBulkActions<TData>({
    table,
}: DataTableBulkActionsProps<TData>) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const selectedRows = table.getFilteredSelectedRowModel().rows

    const handleBulkStatusChange = (status: 'active' | 'inactive') => {
        const selectedCompanies = selectedRows.map((row) => row.original as Company)
        toast.promise(sleep(2000), {
            loading: `${status === 'active' ? 'Đang kích hoạt' : 'Đang khóa'} công ty...`,
            success: () => {
                table.resetRowSelection()
                return `${status === 'active' ? 'Đã kích hoạt' : 'Đã khóa'} ${selectedCompanies.length} công ty`
            },
            error: `Có lỗi khi ${status === 'active' ? 'kích hoạt' : 'khóa'} công ty`,
        })
        table.resetRowSelection()
    }

    return (
        <>
            <BulkActionsToolbar table={table} entityName='Công ty'>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant='outline'
                            size='icon'
                            onClick={() => handleBulkStatusChange('active')}
                            className='size-8'
                            aria-label='Kích hoạt công ty đã chọn'
                            title='Kích hoạt công ty đã chọn'
                        >
                            <CheckCircle2 />
                            <span className='sr-only'>Kích hoạt công ty đã chọn</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Kích hoạt công ty đã chọn</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant='outline'
                            size='icon'
                            onClick={() => handleBulkStatusChange('inactive')}
                            className='size-8'
                            aria-label='Khóa công ty đã chọn'
                            title='Khóa công ty đã chọn'
                        >
                            <Lock />
                            <span className='sr-only'>Khóa công ty đã chọn</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Khóa công ty đã chọn</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant='destructive'
                            size='icon'
                            onClick={() => setShowDeleteConfirm(true)}
                            className='size-8'
                            aria-label='Xóa những công ty đã chọn'
                            title='Xóa những công ty đã chọn'
                        >
                            <Trash2 />
                            <span className='sr-only'>Xóa những công ty đã chọn</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Xóa những công ty đã chọn</p>
                    </TooltipContent>
                </Tooltip>
            </BulkActionsToolbar>

            <UsersMultiDeleteDialog
                table={table}
                open={showDeleteConfirm}
                onOpenChange={setShowDeleteConfirm}
            />
        </>
    )
}
