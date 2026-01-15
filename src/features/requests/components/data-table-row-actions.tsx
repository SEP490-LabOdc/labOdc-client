import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { type Row } from '@tanstack/react-table'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useNavigate } from '@tanstack/react-router'
import { useUser } from '@/context/UserContext'
import { getRoleBasePath } from '@/lib/utils'
import type { Request } from '../data/schema'

type DataTableRowActionsProps = {
    row: Row<Request>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
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
                    <DropdownMenuItem
                        onClick={() => {
                            const { user } = useUser();
                            navigate({
                                to: getRoleBasePath(user.role) + '/requests/' + row.original.id,
                            })
                        }}
                    >
                        Thông tin
                        <DropdownMenuShortcut>
                            <Search size={16} />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
