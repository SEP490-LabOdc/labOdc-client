import React from 'react'
import { Info } from 'lucide-react'

type PaymentStatus = 'PENDING_DEPOSIT' | 'DEPOSITED' | 'RELEASED'

interface MentorTalentStatusViewProps {
    status: PaymentStatus
    userRole: string
    mentorShare: number
    formatVND: (v: number) => string
}

export const MentorTalentStatusView: React.FC<MentorTalentStatusViewProps> = ({
    status,
    userRole,
    mentorShare,
    formatVND,
}) => {
    const getStatusText = () => {
        switch (status) {
            case 'RELEASED':
                return 'Đã nhận tiền'
            case 'DEPOSITED':
                return 'Đang chờ duyệt'
            default:
                return 'Đang chờ ký quỹ'
        }
    }

    const getDescription = () => {
        switch (status) {
            case 'RELEASED':
                return `Bạn đã nhận ${userRole === 'MENTOR' ? formatVND(mentorShare) : 'phần của mình'}.`
            case 'DEPOSITED':
                return 'Doanh nghiệp đang xem xét.'
            default:
                return 'Chờ doanh nghiệp nạp tiền.'
        }
    }

    return (
        <div className="border-t pt-4">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-xs font-semibold text-blue-800">
                            {getStatusText()}
                        </p>
                        <p className="text-xs text-blue-700 mt-0.5">
                            {getDescription()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

