import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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

interface WithdrawDialogProps {
    isOpen: boolean
    onClose: () => void
    availableBalance: number
    bankAccount?: {
        bankName: string
        accountNumber: string
        accountHolder: string
    }
    onConfirm: (amount: number) => void
}

export const WithdrawDialog: React.FC<WithdrawDialogProps> = ({
    isOpen,
    onClose,
    availableBalance,
    bankAccount,
    onConfirm
}) => {
    const [amount, setAmount] = useState<string>('')
    const [isProcessing, setIsProcessing] = useState(false)

    const amountNum = parseFloat(amount) || 0
    const minWithdraw = 50000
    const maxWithdraw = availableBalance

    const handleSubmit = async () => {
        if (!bankAccount) {
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
            await onConfirm(amountNum)
            toast.success('Yêu cầu rút tiền đã được gửi thành công')
            setAmount('')
            onClose()
        } catch (error) {
            toast.error('Có lỗi xảy ra, vui lòng thử lại')
        } finally {
            setIsProcessing(false)
        }
    }

    const handleClose = () => {
        setAmount('')
        onClose()
    }

    const setQuickAmount = (percent: number) => {
        const quickAmount = Math.floor(availableBalance * percent)
        setAmount(quickAmount.toString())
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
                    {bankAccount ? (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                            <div className="flex items-start gap-3">
                                <CreditCard className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-green-900">
                                        Tài khoản nhận tiền
                                    </p>
                                    <p className="text-sm text-green-800 mt-1">
                                        {bankAccount.bankName} - {bankAccount.accountNumber}
                                    </p>
                                    <p className="text-xs text-green-700">
                                        {bankAccount.accountHolder}
                                    </p>
                                </div>
                            </div>
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
                        <Input
                            id="amount"
                            type="number"
                            placeholder="Nhập số tiền..."
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            min={minWithdraw}
                            max={maxWithdraw}
                            disabled={!bankAccount}
                        />

                        {/* Quick Amount Buttons */}
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setQuickAmount(0.25)}
                                disabled={!bankAccount}
                                className="flex-1"
                            >
                                25%
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setQuickAmount(0.5)}
                                disabled={!bankAccount}
                                className="flex-1"
                            >
                                50%
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setQuickAmount(0.75)}
                                disabled={!bankAccount}
                                className="flex-1"
                            >
                                75%
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setQuickAmount(1)}
                                disabled={!bankAccount}
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
                        disabled={!bankAccount || amountNum < minWithdraw || amountNum > maxWithdraw || isProcessing}
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

