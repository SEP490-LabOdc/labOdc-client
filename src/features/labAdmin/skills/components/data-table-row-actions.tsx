import { type Row } from '@tanstack/react-table'
import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { type Skill } from '../data/schema'
import { useSkills } from './skills-provider'

type DataTableRowActionsProps = {
    row: Row<Skill>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
    const { setOpen, setCurrentRow } = useSkills()

    return (
        <div className='flex items-center gap-2'>
            <Button
                variant='ghost'
                size='icon'
                className='h-8 w-8'
                onClick={() => {
                    setCurrentRow(row.original)
                    setOpen('edit')
                }}
            >
                <Pencil className='h-4 w-4' />
                <span className='sr-only'>Chỉnh sửa</span>
            </Button>
            <Button
                variant='ghost'
                size='icon'
                className='h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10'
                onClick={() => {
                    setCurrentRow(row.original)
                    setOpen('delete')
                }}
            >
                <Trash2 className='h-4 w-4' />
                <span className='sr-only'>Xóa</span>
            </Button>
        </div>
    )
}

