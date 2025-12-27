import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Wallet } from 'lucide-react'

interface PaymentSuccessDialogProps {
    isOpen: boolean
    onClose: () => void
    orderCode?: string
    amount?: number
}

const formatVND = (v: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v)

export const PaymentSuccessDialog: React.FC<PaymentSuccessDialogProps> = ({
    isOpen,
    onClose,
    orderCode,
    amount
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <div className="flex flex-col items-center gap-4 py-4">
                        <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle2 className="h-12 w-12 text-green-600" />
                        </div>
                        <DialogTitle className="text-2xl font-bold text-green-600 text-center">
                            Thanh toán thành công!
                        </DialogTitle>
                        <DialogDescription className="text-center text-base">
                            Giao dịch của bạn đã được xử lý thành công. Số tiền đã được nạp vào ví Escrow.
                        </DialogDescription>
                    </div>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {amount && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Wallet className="h-5 w-5 text-green-600" />
                                    <span className="text-sm font-medium text-gray-700">Số tiền đã nạp:</span>
                                </div>
                                <span className="text-lg font-bold text-green-600">
                                    {formatVND(amount)}
                                </span>
                            </div>
                        </div>
                    )}

                    {orderCode && (
                        <div className="p-3 bg-gray-50 rounded-md">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Mã đơn hàng:</span>
                                <span className="font-mono font-semibold text-gray-900">{orderCode}</span>
                            </div>
                        </div>
                    )}

                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <p className="text-sm text-blue-800">
                            💡 <strong>Lưu ý:</strong> Số dư ví của bạn sẽ được cập nhật trong vài giây.
                        </p>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        onClick={onClose}
                        className="w-full bg-[#2a9d8f] hover:bg-[#1e7a6e] text-white"
                    >
                        Đóng
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

