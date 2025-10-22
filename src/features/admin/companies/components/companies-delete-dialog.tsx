'use client'

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { type Company } from '../data/schema'

type CompanyDeleteDialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    currentRow: Company
}

export function CompaniesDeleteDialog({
    open,
    onOpenChange,
    currentRow,
}: CompanyDeleteDialogProps) {
    const [value, setValue] = useState('')

    const handleDelete = () => {
        if (value.trim() !== currentRow.name) return

        onOpenChange(false)
        showSubmittedData(currentRow, 'The following user has been deleted:')
    }

    return (
        <ConfirmDialog
            open={open}
            onOpenChange={onOpenChange}
            handleConfirm={handleDelete}
            disabled={value.trim() !== currentRow.name}
            title={
                <span className='text-destructive'>
                    <AlertTriangle
                        className='stroke-destructive me-1 inline-block'
                        size={18}
                    />{' '}
                    Delete User
                </span>
            }
            desc={
                <div className='space-y-4'>
                    <p className='mb-2'>
                        Are you sure you want to delete{' '}
                        <span className='font-bold'>{currentRow.name}</span>?
                        <br />
                        This action will permanently remove the company
                        from the system. This cannot be undone.
                    </p>

                    <Label className='my-2'>
                        Company Name:
                        <Input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder='Enter company name to confirm deletion.'
                        />
                    </Label>

                    <Alert variant='destructive'>
                        <AlertTitle>Warning!</AlertTitle>
                        <AlertDescription>
                            Please be careful, this operation can not be rolled back.
                        </AlertDescription>
                    </Alert>
                </div>
            }
            confirmText='Delete'
            destructive
        />
    )
}
