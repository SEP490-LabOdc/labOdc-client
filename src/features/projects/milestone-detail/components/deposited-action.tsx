import React from 'react'
import { Button } from '@/components/ui/button'
import { CheckCircle, Info } from 'lucide-react'

interface DepositedActionProps {
    amount: number
    canRelease: boolean
    isLoading: boolean
    isLoadingPreview: boolean
    onRelease: () => void
    formatVND: (v: number) => string
}

export const DepositedAction: React.FC<DepositedActionProps> = ({
    amount,
    canRelease,
    isLoading,
    isLoadingPreview,
    onRelease,
    formatVND,
}) => {
    return (
        <div className="space-y-2">
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-yellow-800 space-y-1">
                        <p className="font-semibold">Xác nhận trước khi giải ngân:</p>
                        <p className="text-yellow-700">✓ Đã phê duyệt báo cáo</p>
                        <p className="text-yellow-700">✓ Công việc hoàn thành</p>
                        <p className="text-yellow-700">✓ Không thể hoàn tác</p>
                    </div>
                </div>
            </div>
            <Button
                size="sm"
                className="w-full bg-green-600 hover:bg-green-700 text-white text-xs font-semibold"
                disabled={!canRelease || isLoading || isLoadingPreview}
                onClick={onRelease}
            >
                <CheckCircle className="w-3 h-3 mr-1.5" />
                {isLoading
                    ? 'Đang xử lý...'
                    : `Giải ngân ${formatVND(amount)}`}
            </Button>
        </div>
    )
}

