import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { type Row } from '@tanstack/react-table'
import { CheckCircle2, XCircle, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { type WithdrawalRequestItem } from '../data/schema'
import { useWithdrawal } from './withdrawal-provider'

type DataTableRowActionsProps = {
    row: Row<WithdrawalRequestItem>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
    const { setOpen, setCurrentRow } = useWithdrawal()
    const status = row.original.status

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant='ghost'
                    className='data-[state=open]:bg-muted flex h-8 w-8 p-0'
                >
                    <DotsHorizontalIcon className='h-4 w-4' />
                    <span className='sr-only'>Mở menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-[160px]'>
                <DropdownMenuItem
                    onClick={() => {
                        setCurrentRow(row.original)
                        setOpen('view')
                    }}
                >
                    Xem chi tiết
                    <DropdownMenuShortcut>
                        <Eye size={16} />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
                {status === 'PENDING' && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => {
                                setCurrentRow(row.original)
                                setOpen('approve')
                            }}
                            className='text-green-600'
                        >
                            Duyệt
                            <DropdownMenuShortcut>
                                <CheckCircle2 size={16} />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                setCurrentRow(row.original)
                                setOpen('reject')
                            }}
                            className='text-red-500'
                        >
                            Từ chối
                            <DropdownMenuShortcut>
                                <XCircle size={16} />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

