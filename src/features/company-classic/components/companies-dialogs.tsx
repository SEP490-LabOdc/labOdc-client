import { CompaniesActionDialog } from './companies-action-dialog'
import { CompaniesDeleteDialog } from './companies-delete-dialog'
import { useCompanies } from './companies-provider'

export function CompaniesDialogs() {
    const { open, setOpen, currentRow, setCurrentRow } = useCompanies()
    return (
        <>
            <CompaniesActionDialog
                key='user-add'
                open={open === 'add'}
                onOpenChange={() => setOpen('add')}
            />
            {currentRow && (
                <>
                    <CompaniesActionDialog
                        key={`company-edit-${currentRow.id}`}
                        open={open === 'edit'}
                        onOpenChange={() => {
                            setOpen('edit')
                            setTimeout(() => {
                                setCurrentRow(null)
                            }, 500)
                        }}
                        currentRow={currentRow}
                    />

                    <CompaniesDeleteDialog
                        key={`company-delete-${currentRow.id}`}
                        open={open === 'delete'}
                        onOpenChange={() => {
                            setOpen('delete')
                            setTimeout(() => {
                                setCurrentRow(null)
                            }, 500)
                        }}
                        currentRow={currentRow}
                    />
                </>
            )}
        </>
    )
}
