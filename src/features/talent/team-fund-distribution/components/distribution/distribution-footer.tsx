import React from 'react'
import { Button } from '@/components/ui/button'
import { CheckCircle, AlertTriangle, XCircle, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Milestone } from '@/hooks/api/milestones'
import type { Disbursement } from '@/hooks/api/disbursement/types'
import { DisbursementStatus } from '@/hooks/api/disbursement/enums'
import { UserRole } from '@/hooks/api/users'
import { formatVND } from '@/helpers/currency'

interface DistributionFooterProps {
    milestone: Milestone
    totalAllocated: number
    remaining: number
    canSubmit: boolean
    isSubmitting: boolean
    onSubmit: () => void
    disbursement?: Disbursement
    roleAmount: number
    userRole: string
}

export const DistributionFooter: React.FC<DistributionFooterProps> = ({
    milestone,
    totalAllocated,
    remaining,
    canSubmit,
    isSubmitting,
    onSubmit,
    disbursement,
    roleAmount,
    userRole
}) => {
    // Xác định label và amount dựa trên status và role
    const getStatusInfo = () => {
        if (!disbursement) {
            // Chưa có disbursement - hiển thị thông tin từ allocations
            return {
                label: 'Đã Phân Bổ',
                amount: totalAllocated,
                showRemaining: true
            }
        }

        if (disbursement.status === DisbursementStatus.COMPLETED) {
            // COMPLETED -> hiển thị "Đã phân bổ"
            return {
                label: 'Đã Phân Bổ',
                amount: roleAmount,
                showRemaining: false
            }
        }

        // PENDING -> hiển thị "Còn lại"
        return {
            label: 'Còn Lại',
            amount: roleAmount,
            showRemaining: false
        }
    }

    const statusInfo = getStatusInfo()

    return (
        <>
            {/* Summary Stats */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div>
                        <p className="text-xs text-gray-500 font-medium">Giá trị Milestone</p>
                        <p className="text-base font-bold text-gray-900">
                            {formatVND(milestone.budget)}
                        </p>
                    </div>

                    <div className="h-8 w-px bg-gray-300 hidden sm:block" />

                    <div>
                        <p className="text-xs text-gray-500 font-medium">{statusInfo.label}</p>
                        <p className={cn(
                            "text-base font-bold",
                            disbursement?.status === DisbursementStatus.COMPLETED
                                ? "text-green-600"
                                : disbursement?.status === DisbursementStatus.PENDING
                                    ? "text-orange-600"
                                    : "text-blue-600"
                        )}>
                            {formatVND(statusInfo.amount)}
                        </p>
                    </div>

                    {statusInfo.showRemaining && (
                        <>
                            <div className="h-8 w-px bg-gray-300 hidden sm:block" />

                            <div>
                                <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                                    Còn Lại
                                    {remaining > 0 && <AlertTriangle className="h-3 w-3 text-orange-500" />}
                                    {remaining === 0 && <CheckCircle className="h-3 w-3 text-green-500" />}
                                    {remaining < 0 && <XCircle className="h-3 w-3 text-red-500" />}
                                </p>
                                <p className={cn(
                                    "text-lg font-bold",
                                    remaining > 0 && "text-orange-600",
                                    remaining === 0 && "text-green-600",
                                    remaining < 0 && "text-red-600"
                                )}>
                                    {formatVND(Math.abs(remaining))}
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {/* Action Button */}
                {!disbursement || disbursement.status === DisbursementStatus.PENDING ? (
                    <Button
                        size="lg"
                        disabled={!canSubmit || isSubmitting}
                        onClick={onSubmit}
                        className={cn(
                            "w-full sm:w-auto min-w-[180px] font-semibold shadow-md",
                            canSubmit
                                ? "bg-[#2a9d8f] hover:bg-[#21867a]"
                                : "bg-gray-300 cursor-not-allowed"
                        )}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                                Đang xử lý...
                            </>
                        ) : (
                            <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Xác Nhận Phân Bổ
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </>
                        )}
                    </Button>
                ) : null}
            </div>

            {/* Status Messages */}
            {!disbursement && remaining > 0 && totalAllocated > 0 && (
                <div className="w-full p-2 bg-orange-50 border border-orange-200 rounded">
                    <p className="text-xs text-orange-800 text-center">
                        ⚠️ Còn {formatVND(remaining)} chưa phân bổ
                    </p>
                </div>
            )}

            {!disbursement && remaining === 0 && totalAllocated > 0 && (
                <div className="w-full p-2 bg-green-50 border border-green-200 rounded">
                    <p className="text-xs text-green-800 text-center flex items-center justify-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Hoàn hảo! Đã phân bổ đầy đủ
                    </p>
                </div>
            )}

            {!disbursement && remaining < 0 && (
                <div className="w-full p-2 bg-red-50 border border-red-200 rounded">
                    <p className="text-xs text-red-800 text-center flex items-center justify-center gap-1">
                        <XCircle className="h-3 w-3" />
                        Vượt quá {formatVND(Math.abs(remaining))}
                    </p>
                </div>
            )}

            {disbursement?.status === DisbursementStatus.COMPLETED && (
                <div className="w-full p-2 bg-green-50 border border-green-200 rounded">
                    <p className="text-xs text-green-800 text-center flex items-center justify-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Đã phân bổ thành công {formatVND(roleAmount)} cho {userRole === UserRole.MENTOR ? 'mentor' : 'talent'}
                    </p>
                </div>
            )}

            {disbursement?.status === DisbursementStatus.PENDING && (
                <div className="w-full p-2 bg-orange-50 border border-orange-200 rounded">
                    <p className="text-xs text-orange-800 text-center">
                        ⏳ Đang chờ xử lý phân bổ {formatVND(roleAmount)} cho {userRole === UserRole.MENTOR ? 'mentor' : 'talent'}
                    </p>
                </div>
            )}
        </>
    )
}

