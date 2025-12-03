import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { type Row } from '@tanstack/react-table'
import { UserPen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { COMPANY_STATUS, type Company } from '../data/schema'
// import { useCompanies } from './companies-provider'
import { useNavigate } from '@tanstack/react-router'

type DataTableRowActionsProps = {
    row: Row<Company>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
    // const { setOpen, setCurrentRow } = useCompanies()
    const navigate = useNavigate()
    return (
        <>
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
                    {
                        row.original.status == COMPANY_STATUS.PENDING || row.original.status == COMPANY_STATUS.UPDATE_REQUIRED ? (

                            <DropdownMenuItem
                                onClick={() => {
                                    navigate({
                                        to: '/lab-admin/companies/' + row.original.id,
                                    })
                                }}
                            >
                                Vào phê duyệt
                                <DropdownMenuShortcut>
                                    <UserPen size={16} />
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>

                        ) : (

                            <DropdownMenuItem
                                onClick={() => {
                                    navigate({
                                        to: '/lab-admin/companies/' + row.original.id,
                                    })
                                }}
                            >
                                Chỉnh sửa
                                <DropdownMenuShortcut>
                                    <UserPen size={16} />
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                        )
                    }

                    <DropdownMenuSeparator />
                    {/* <DropdownMenuItem
                        onClick={() => {
                            setCurrentRow(row.original)
                            setOpen('delete')
                        }}
                        className='text-red-500!'
                    >
                        Xóa
                        <DropdownMenuShortcut>
                            <Trash2 size={16} />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem> */}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
