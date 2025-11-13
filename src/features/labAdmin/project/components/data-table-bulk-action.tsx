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
import { type Project } from '../data/schema'
import { ProjectsMultiDeleteDialog } from './projects-multi-delete-dialog'

type DataTableBulkActionsProps<TData> = {
    table: Table<TData>
}

export function DataTableBulkActions<TData>({
    table,
}: DataTableBulkActionsProps<TData>) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const selectedRows = table.getFilteredSelectedRowModel().rows

    const handleBulkStatusChange = (status: 'active' | 'inactive') => {
        const selectedCompanies = selectedRows.map((row) => row.original as Project)
        toast.promise(sleep(2000), {
            loading: `${status === 'active' ? 'Đang kích hoạt' : 'Đang khóa'} dự án...`,
            success: () => {
                table.resetRowSelection()
                return `${status === 'active' ? 'Đã kích hoạt' : 'Đã khóa'} ${selectedCompanies.length} dự án`
            },
            error: `Có lỗi khi ${status === 'active' ? 'kích hoạt' : 'khóa'} dự án`,
        })
        table.resetRowSelection()
    }

    return (
        <>
            <BulkActionsToolbar table={table} entityName='Dự án'>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant='outline'
                            size='icon'
                            onClick={() => handleBulkStatusChange('active')}
                            className='size-8'
                            aria-label='Kích hoạt dự án đã chọn'
                            title='Kích hoạt dự ánđã chọn'
                        >
                            <CheckCircle2 />
                            <span className='sr-only'>Kích hoạt dự án đã chọn</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Kích hoạt dự án đã chọn</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant='outline'
                            size='icon'
                            onClick={() => handleBulkStatusChange('inactive')}
                            className='size-8'
                            aria-label='Khóa dự án đã chọn'
                            title='Khóa dự án đã chọn'
                        >
                            <Lock />
                            <span className='sr-only'>Khóa dự án đã chọn</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Khóa dự án đã chọn</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant='destructive'
                            size='icon'
                            onClick={() => setShowDeleteConfirm(true)}
                            className='size-8'
                            aria-label='Xóa những dự án đã chọn'
                            title='Xóa những dự án đã chọn'
                        >
                            <Trash2 />
                            <span className='sr-only'>Xóa những dự án đã chọn</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Xóa những dự án đã chọn</p>
                    </TooltipContent>
                </Tooltip>
            </BulkActionsToolbar>

            <ProjectsMultiDeleteDialog
                table={table}
                open={showDeleteConfirm}
                onOpenChange={setShowDeleteConfirm}
            />
        </>
    )
}
