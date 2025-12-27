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
import { XCircle, AlertCircle, RefreshCw } from 'lucide-react'

interface PaymentFailureDialogProps {
    isOpen: boolean
    onClose: () => void
    onRetry?: () => void
    orderCode?: string
    errorCode?: string
    isCancelled?: boolean
}

export const PaymentFailureDialog: React.FC<PaymentFailureDialogProps> = ({
    isOpen,
    onClose,
    onRetry,
    orderCode,
    errorCode,
    isCancelled = false
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <div className="flex flex-col items-center gap-4 py-4">
                        <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
                            {isCancelled ? (
                                <AlertCircle className="h-12 w-12 text-orange-600" />
                            ) : (
                                <XCircle className="h-12 w-12 text-red-600" />
                            )}
                        </div>
                        <DialogTitle className={`text-2xl font-bold text-center ${isCancelled ? 'text-orange-600' : 'text-red-600'}`}>
                            {isCancelled ? 'Giao dịch đã bị hủy' : 'Thanh toán thất bại'}
                        </DialogTitle>
                        <DialogDescription className="text-center text-base">
                            {isCancelled
                                ? 'Bạn đã hủy giao dịch thanh toán. Số tiền chưa được nạp vào ví.'
                                : 'Giao dịch thanh toán không thành công. Vui lòng thử lại hoặc liên hệ hỗ trợ nếu vấn đề vẫn tiếp tục.'}
                        </DialogDescription>
                    </div>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {orderCode && (
                        <div className="p-3 bg-gray-50 rounded-md">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Mã đơn hàng:</span>
                                <span className="font-mono font-semibold text-gray-900">{orderCode}</span>
                            </div>
                        </div>
                    )}

                    {errorCode && errorCode !== '00' && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-red-700">Mã lỗi:</span>
                                <span className="font-mono font-semibold text-red-900">{errorCode}</span>
                            </div>
                        </div>
                    )}

                    <div className={`p-3 rounded-md ${isCancelled ? 'bg-orange-50 border border-orange-200' : 'bg-red-50 border border-red-200'}`}>
                        <p className={`text-sm ${isCancelled ? 'text-orange-800' : 'text-red-800'}`}>
                            {isCancelled ? (
                                <>⚠️ <strong>Thông báo:</strong> Bạn có thể thử nạp tiền lại bất cứ lúc nào.</>
                            ) : (
                                <>⚠️ <strong>Lưu ý:</strong> Nếu bạn đã thanh toán nhưng vẫn thấy thông báo này, vui lòng liên hệ bộ phận hỗ trợ với mã đơn hàng trên.</>
                            )}
                        </p>
                    </div>
                </div>

                <DialogFooter className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="flex-1"
                    >
                        Đóng
                    </Button>
                    {onRetry && (
                        <Button
                            onClick={onRetry}
                            className="flex-1 bg-[#2a9d8f] hover:bg-[#1e7a6e] text-white"
                        >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Thử lại
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

