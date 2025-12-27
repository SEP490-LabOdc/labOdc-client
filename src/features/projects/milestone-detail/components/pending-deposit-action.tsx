import React from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle, Wallet } from 'lucide-react'

interface PendingDepositActionProps {
    onDeposit: () => void
    isLoading: boolean
}

export const PendingDepositAction: React.FC<PendingDepositActionProps> = ({
    onDeposit,
    isLoading,
}) => {
    return (
        <div className="space-y-2">
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-md">
                <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-xs font-semibold text-orange-800">Chưa ký quỹ</p>
                        <p className="text-xs text-orange-700 mt-0.5">
                            Vui lòng nạp tiền vào quỹ cột mốc
                        </p>
                    </div>
                </div>
            </div>
            <Button
                size="sm"
                className="w-full bg-orange-600 hover:bg-orange-700 text-xs"
                onClick={onDeposit}
                disabled={isLoading}
            >
                <Wallet className="w-3 h-3 mr-1.5" />
                {isLoading ? 'Đang xử lý...' : 'Nạp vào quỹ cột mốc'}
            </Button>
        </div>
    )
}

