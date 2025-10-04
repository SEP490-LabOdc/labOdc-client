import { UsersDeleteDialog } from './users-delete-dialog'
import { useUsers } from './users-provider'

export function UsersDialogs() {
    const { open, setOpen, currentRow, setCurrentRow } = useUsers()
    return (
        <>
            {currentRow && (
                <>
                    <UsersDeleteDialog
                        key={`user-delete-${currentRow.id}`}
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
