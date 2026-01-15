import React from 'react'
import { CheckCircle } from 'lucide-react'

export const ReleasedStatus: React.FC = () => {
    return (
        <div className="p-3 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <div>
                    <p className="text-xs font-semibold text-green-800">Đã giải ngân</p>
                    <p className="text-xs text-green-700 mt-0.5">
                        Tiền đã chuyển về ví các bên
                    </p>
                </div>
            </div>
        </div>
    )
}

