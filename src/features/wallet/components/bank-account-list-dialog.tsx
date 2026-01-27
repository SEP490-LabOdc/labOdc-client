import React from 'react'
import { Button } from '@/components/ui/button'
import { CreditCard, Trash2, Plus, PencilIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { BankListResponse } from '@/hooks/api/banks/types'

interface BankAccount {
    bankName: string
    accountNumber: string
    accountHolder: string
}

interface BankAccountListDialogProps {
    isOpen: boolean
    onClose: () => void
    accounts: BankAccount[]
    onAdd: () => void
    onEdit: (account: BankAccount) => void
    onDelete: (accountNumber: string) => void
    isDeleting?: boolean
    bankRes: BankListResponse
}

export const BankAccountListDialog: React.FC<BankAccountListDialogProps> = ({
    isOpen,
    onClose,
    accounts,
    onAdd,
    onEdit,
    onDelete,
    isDeleting = false,
    bankRes
}) => {
    const [deleteTarget, setDeleteTarget] = React.useState<string | null>(null)

    const handleDeleteClick = (accountNumber: string) => {
        setDeleteTarget(accountNumber)
    }

    const handleDeleteConfirm = () => {
        if (deleteTarget) {
            onDelete(deleteTarget)
            setDeleteTarget(null)
        }
    }

    const maskAccountNumber = (accountNumber: string) => {
        if (accountNumber.length <= 4) return accountNumber
        const last4 = accountNumber.slice(-4)
        return `*****${last4}`
    }

    const getBankDisplayName = (code: string) => {
        const bank = bankRes.data.find((b) => b.code === code)
        if (!bank) return code

        return `${bank.shortName} – ${bank.name}`
    }

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-xl">
                            <CreditCard className="h-6 w-6 text-[#2a9d8f]" />
                            Quản lý Tài khoản Ngân hàng
                        </DialogTitle>
                        <DialogDescription>
                            Thêm, sửa hoặc xóa tài khoản ngân hàng của bạn
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col flex-1 min-h-0">
                        <div className="flex justify-end mb-4">
                            <Button
                                size="sm"
                                onClick={onAdd}
                                className="bg-[#2a9d8f] hover:bg-[#21867a]"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Thêm tài khoản
                            </Button>
                        </div>

                        <ScrollArea className="flex-1">
                            {accounts.length === 0 ? (
                                <div className="text-center py-12 text-muted-foreground">
                                    <CreditCard className="h-16 w-16 mx-auto mb-4 opacity-50" />
                                    <p className="text-lg font-medium mb-2">Chưa có tài khoản ngân hàng nào</p>
                                    <p className="text-sm">Nhấn "Thêm tài khoản" để thêm mới</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {accounts.map((account) => (
                                        <div
                                            key={account.accountNumber}
                                            className="flex items-start justify-between p-4 border rounded-md transition-colors"
                                        >
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h4 className="font-semibold text-foreground">
                                                        {getBankDisplayName(account.bankName)}
                                                    </h4>
                                                </div>
                                                <div className="space-y-1 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium">Số TK:</span>
                                                        <Badge variant="outline">{maskAccountNumber(account.accountNumber)}</Badge>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium">Chủ TK:</span>
                                                        <span>{account.accountHolder}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 ml-4">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => onEdit(account)}
                                                >
                                                    <PencilIcon className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDeleteClick(account.accountNumber)}
                                                    disabled={isDeleting}
                                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ScrollArea>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận xóa tài khoản ngân hàng</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có chắc chắn muốn xóa tài khoản ngân hàng này? Hành động này không thể hoàn tác.
                            {deleteTarget && accounts.find(a => a.accountNumber === deleteTarget) && (
                                <div className="mt-3 p-3 bg-muted rounded-md">
                                    <p className="font-semibold text-sm">
                                        {accounts.find(a => a.accountNumber === deleteTarget)?.bankName}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Số TK: {maskAccountNumber(deleteTarget)}
                                    </p>
                                </div>
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Xóa
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

