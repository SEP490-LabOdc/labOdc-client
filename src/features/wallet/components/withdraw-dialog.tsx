import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { AutoMoneyInput } from '@/components/v2/AutoMoneyInput'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Wallet, AlertTriangle, CheckCircle, CreditCard } from 'lucide-react'
import { toast } from 'sonner'
import { formatVND } from '@/helpers/currency'
import { CURRENCY_SUFFIX } from '@/const'

interface BankAccount {
    bankName: string
    accountNumber: string
    accountHolder: string
}

interface WithdrawDialogProps {
    isOpen: boolean
    onClose: () => void
    availableBalance: number
    bankAccounts?: BankAccount[]
    onConfirm: (payload: {
        amount: number
        bankAccount: BankAccount
    }) => Promise<void>
}

export const WithdrawDialog: React.FC<WithdrawDialogProps> = ({
    isOpen,
    onClose,
    availableBalance,
    bankAccounts,
    onConfirm
}) => {
    const [amount, setAmount] = useState<number>(0)
    const [isProcessing, setIsProcessing] = useState(false)
    const [selectedAccountNumber, setSelectedAccountNumber] = useState<string | null>(null)

    const amountNum = amount || 0
    const minWithdraw = 50000
    const maxWithdraw = availableBalance

    useEffect(() => {
        if (bankAccounts?.length && !selectedAccountNumber) {
            setSelectedAccountNumber(bankAccounts[0].accountNumber)
        }
    }, [bankAccounts])

    const selectedBankAccount = bankAccounts?.find(
        (b) => b.accountNumber === selectedAccountNumber
    )

    const handleSubmit = async () => {
        if (!selectedBankAccount) {
            toast.error('Vui lòng liên kết tài khoản ngân hàng trước')
            return
        }

        if (amountNum < minWithdraw) {
            toast.error(`Số tiền rút tối thiểu là ${formatVND(minWithdraw)}`)
            return
        }

        if (amountNum > maxWithdraw) {
            toast.error('Số tiền rút vượt quá số dư khả dụng')
            return
        }

        setIsProcessing(true)
        try {
            await onConfirm({
                amount: amountNum,
                bankAccount: selectedBankAccount
            })
            toast.success('Yêu cầu rút tiền đã được gửi thành công')
            setAmount(0)
            onClose()
        } catch (error) {
            toast.error('Có lỗi xảy ra, vui lòng thử lại')
        } finally {
            setIsProcessing(false)
        }
    }

    const handleClose = () => {
        setAmount(0)
        onClose()
    }

    const setQuickAmount = (percent: number) => {
        const quickAmount = Math.floor(availableBalance * percent)
        setAmount(quickAmount)
    }

    const handleAmountChange = (value: number) => {
        setAmount(value)
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <Wallet className="h-6 w-6 text-[#2a9d8f]" />
                        Rút tiền về ngân hàng
                    </DialogTitle>
                    <DialogDescription>
                        Tạo yêu cầu rút tiền về tài khoản ngân hàng đã liên kết
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Balance Info */}
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                        <p className="text-sm text-blue-800 mb-1">
                            <strong>Số dư khả dụng:</strong> {formatVND(availableBalance)}
                        </p>
                        <p className="text-xs text-blue-600">
                            Số tiền tối thiểu: {formatVND(minWithdraw)}
                        </p>
                    </div>

                    {/* Bank Account Info */}
                    {bankAccounts && bankAccounts.length > 0 ? (
                        <div className="space-y-3">
                            <Label>Tài khoản ngân hàng</Label>

                            <select
                                className="w-full border rounded-md p-2 text-sm"
                                value={selectedAccountNumber ?? ''}
                                onChange={(e) => setSelectedAccountNumber(e.target.value)}
                            >
                                <option value="" disabled>
                                    Chọn tài khoản ngân hàng
                                </option>

                                {bankAccounts.map((bank) => (
                                    <option
                                        key={bank.accountNumber}
                                        value={bank.accountNumber}
                                    >
                                        {bank.bankName} - {bank.accountNumber}
                                    </option>
                                ))}
                            </select>

                            {selectedBankAccount && (
                                <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                                    <div className="flex items-start gap-3">
                                        <CreditCard className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-green-900">
                                                Tài khoản nhận tiền
                                            </p>
                                            <p className="text-sm text-green-800 mt-1">
                                                {selectedBankAccount.bankName} - {selectedBankAccount.accountNumber}
                                            </p>
                                            <p className="text-xs text-green-700">
                                                {selectedBankAccount.accountHolder}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="p-4 bg-orange-50 border border-orange-200 rounded-md">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="h-5 w-5 text-orange-600 shrink-0" />
                                <div>
                                    <p className="text-sm font-semibold text-orange-900">
                                        Chưa liên kết tài khoản ngân hàng
                                    </p>
                                    <p className="text-xs text-orange-700 mt-1">
                                        Vui lòng thêm thông tin tài khoản ngân hàng trước khi rút tiền
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Amount Input */}
                    <div className="space-y-2">
                        <Label htmlFor="amount">Số tiền muốn rút ({CURRENCY_SUFFIX})</Label>
                        <AutoMoneyInput
                            id="amount"
                            placeholder="Nhập số tiền..."
                            value={amount}
                            onChange={handleAmountChange}
                            min={minWithdraw}
                            max={maxWithdraw}
                            disabled={!selectedAccountNumber}
                            suffix={CURRENCY_SUFFIX}
                        />

                        {/* Quick Amount Buttons */}
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setQuickAmount(0.25)}
                                disabled={!selectedAccountNumber}
                                className="flex-1"
                            >
                                25%
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setQuickAmount(0.5)}
                                disabled={!selectedAccountNumber}
                                className="flex-1"
                            >
                                50%
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setQuickAmount(0.75)}
                                disabled={!selectedAccountNumber}
                                className="flex-1"
                            >
                                75%
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setQuickAmount(1)}
                                disabled={!selectedAccountNumber}
                                className="flex-1"
                            >
                                100%
                            </Button>
                        </div>
                    </div>

                    {/* Fee Calculation */}
                    {amountNum > 0 && (
                        <div className="p-4 bg-gray-50 border border-gray-200 rounded-md space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Số tiền rút:</span>
                                <span className="font-semibold text-gray-900">{formatVND(amountNum)}</span>
                            </div>
                        </div>
                    )}

                    {/* Warning */}
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                        <div className="flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-600 shrink-0 mt-0.5" />
                            <div className="text-xs text-yellow-800">
                                <p className="font-semibold mb-1">Lưu ý quan trọng:</p>
                                <ul className="space-y-0.5 ml-4">
                                    <li>• Thời gian xử lý: 1-3 ngày làm việc</li>
                                    <li>• Yêu cầu không thể hủy sau khi gửi</li>
                                    <li>• Kiểm tra kỹ thông tin trước khi xác nhận</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={handleClose} disabled={isProcessing}>
                        Hủy
                    </Button>
                    <Button
                        className="bg-[#2a9d8f] hover:bg-[#21867a]"
                        onClick={handleSubmit}
                        disabled={!selectedBankAccount || amountNum < minWithdraw || amountNum > maxWithdraw || isProcessing}
                    >
                        {isProcessing ? (
                            'Đang xử lý...'
                        ) : (
                            <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Xác nhận rút tiền
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

