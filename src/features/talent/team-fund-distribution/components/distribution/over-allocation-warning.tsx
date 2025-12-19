import React from 'react'
import { AlertCircle } from 'lucide-react'

export const OverAllocationWarning: React.FC = () => {
    return (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-red-800">
                <p className="font-semibold">Vượt quá số dư!</p>
                <p>Bạn đang phân bổ nhiều hơn số tiền có sẵn. Vui lòng điều chỉnh lại.</p>
            </div>
        </div>
    )
}