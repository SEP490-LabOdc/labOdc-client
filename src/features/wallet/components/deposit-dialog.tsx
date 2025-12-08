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
import { Plus, Wallet } from 'lucide-react'
import { toast } from 'sonner'
import { usePaymentDeposit } from '@/hooks/api/payment'
import { useUser } from '@/context/UserContext'
import { getRoleBasePath } from '@/lib/utils'

interface DepositDialogProps {
    isOpen: boolean
    onClose: () => void
}

const formatVND = (v: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v)

export const DepositDialog: React.FC<DepositDialogProps> = ({
    isOpen,
    onClose
}) => {
    const [amount, setAmount] = useState<string>('')
    const { user } = useUser()

    const paymentDeposit = usePaymentDeposit()

    const amountNum = parseFloat(amount) || 0
    const minDeposit = 1000 // Tối thiểu 100k

    const handleSubmit = async () => {
        if (amountNum < minDeposit) {
            toast.error(`Số tiền nạp tối thiểu là ${formatVND(minDeposit)}`)
            return
        }

        // Get wallet URL based on user role
        const basePath = getRoleBasePath(user?.role || '')
        const walletUrl = `${window.location.origin}${basePath}/wallet`

        try {
            const result = await paymentDeposit.mutateAsync({
                amount: amountNum,
                returnUrl: walletUrl,
                cancelUrl: walletUrl
            })

            // Use checkoutUrl from response (or fallback to paymentUrl for backward compatibility)
            const paymentUrl = result?.data?.checkoutUrl

            if (paymentUrl) {
                // Redirect to payment URL
                window.location.href = paymentUrl
            } else {
                toast.error('Không thể tạo link thanh toán. Vui lòng thử lại.')
            }
        } catch (error: any) {
            toast.error(error?.message || 'Có lỗi xảy ra khi tạo link thanh toán')
        }
    }

    const handleClose = () => {
        setAmount('')
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Plus className="h-5 w-5 text-[#264653]" />
                        Nạp tiền vào Escrow
                    </DialogTitle>
                    <DialogDescription>
                        Nhập số tiền để tạo link thanh toán và nạp tiền vào ví Escrow
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Amount Input */}
                    <div className="space-y-2">
                        <Label htmlFor="amount">Số tiền nạp (VNĐ)</Label>
                        <Input
                            id="amount"
                            type="number"
                            placeholder="Nhập số tiền"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            min={minDeposit}
                        />
                        <p className="text-xs text-gray-500">
                            Tối thiểu: {formatVND(minDeposit)}
                        </p>
                    </div>

                    {/* Info */}
                    {amountNum >= minDeposit && (
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-start gap-2">
                                <Wallet className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                <div className="text-sm text-blue-800">
                                    <p className="font-semibold mb-1">Thông tin thanh toán:</p>
                                    <p>Số tiền: <strong>{formatVND(amountNum)}</strong></p>
                                    <p className="text-xs mt-1 text-blue-700">
                                        Bạn sẽ được chuyển đến trang thanh toán sau khi xác nhận
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={amountNum < minDeposit || paymentDeposit.isPending}
                        className="bg-[#264653] hover:bg-[#264653]/90"
                    >
                        {paymentDeposit.isPending ? 'Đang xử lý...' : 'Tạo link thanh toán'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

