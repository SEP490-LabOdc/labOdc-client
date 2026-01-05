import React from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { CreditCard, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'
import { BankAccountForm, type BankAccountFormData } from './bank-account-form'

interface BankAccountDialogProps {
    isOpen: boolean
    onClose: () => void
    currentAccount?: {
        bankName: string
        accountNumber: string
        accountHolder: string
    }
    onSave: (account: {
        bankName: string
        accountNumber: string
        accountHolder: string
    }) => Promise<void>
}


export const BankAccountDialog: React.FC<BankAccountDialogProps> = ({
    isOpen,
    onClose,
    currentAccount,
    onSave
}) => {
    const [isProcessing, setIsProcessing] = React.useState(false)

    const onSubmit = async (data: BankAccountFormData) => {
        setIsProcessing(true)
        try {
            await onSave({
                bankName: data.bankName,
                accountNumber: data.accountNumber,
                accountHolder: data.accountHolder.toUpperCase()
            })
            toast.success(
                currentAccount
                    ? 'Cập nhật tài khoản ngân hàng thành công'
                    : 'Liên kết tài khoản ngân hàng thành công'
            )
            onClose()
        } catch (error) {
            console.error('Error saving bank account:', error)
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <CreditCard className="h-6 w-6 text-[#2a9d8f]" />
                        {currentAccount ? 'Cập nhật Tài khoản Ngân hàng' : 'Liên kết Tài khoản Ngân hàng'}
                    </DialogTitle>
                    <DialogDescription>
                        {currentAccount
                            ? 'Thay đổi thông tin tài khoản nhận tiền'
                            : 'Thêm tài khoản ngân hàng để rút tiền về'
                        }
                    </DialogDescription>
                </DialogHeader>

                <BankAccountForm
                    defaultValues={
                        isOpen && currentAccount
                            ? {
                                bankName: currentAccount.bankName,
                                accountNumber: currentAccount.accountNumber,
                                accountHolder: currentAccount.accountHolder,
                            }
                            : undefined
                    }
                    onSubmit={onSubmit}
                >
                    {(form) => (
                        <DialogFooter>
                            <Button
                                type="submit"
                                className="bg-[#2a9d8f] hover:bg-[#21867a]"
                                disabled={isProcessing || form.formState.isSubmitting}
                            >
                                {isProcessing || form.formState.isSubmitting ? (
                                    'Đang xử lý...'
                                ) : (
                                    <>
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        {currentAccount ? 'Cập nhật' : 'Lưu thông tin'}
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    )}
                </BankAccountForm>
            </DialogContent>
        </Dialog>
    )
}
