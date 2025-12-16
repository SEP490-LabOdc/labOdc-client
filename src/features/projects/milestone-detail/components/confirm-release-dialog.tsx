import React from 'react'
import { CheckCircle } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface ConfirmReleaseDialogProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void | Promise<void>
    amount: number
    systemFee: number
    mentorShare: number
    teamShare: number
    isLoading?: boolean
    title?: string
    description?: string
    showDistribution?: boolean
}

const formatVND = (v: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v)

export const ConfirmReleaseDialog: React.FC<ConfirmReleaseDialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
    amount,
    systemFee,
    mentorShare,
    teamShare,
    isLoading = false,
    title = 'Xác nhận Giải ngân',
    description = `Bạn có chắc chắn muốn giải ngân ${formatVND(amount)}?`,
    showDistribution = true,
}) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2 text-green-700">
                        <CheckCircle className="w-5 h-5" />
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="space-y-3 pt-2">
                        <p className="font-semibold text-gray-900">
                            {description}
                        </p>
                        {showDistribution && (
                            <div className="bg-gray-50 p-3 rounded text-sm space-y-1">
                                <p>Số tiền sẽ được phân chia:</p>
                                <ul className="space-y-1 ml-4 text-xs">
                                    <li>• Hệ thống (10%): <strong>{formatVND(systemFee)}</strong></li>
                                    <li>• Mentor (20%): <strong>{formatVND(mentorShare)}</strong></li>
                                    <li>• Team (70%): <strong>{formatVND(teamShare)}</strong></li>
                                </ul>
                            </div>
                        )}
                        {showDistribution && (
                            <p className="text-red-600 text-sm font-semibold">
                                ⚠️ Hành động này không thể hoàn tác!
                            </p>
                        )}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>Hủy</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        {isLoading ? 'Đang xử lý...' : title.includes('Nạp tiền') ? 'Xác nhận Nạp tiền' : 'Xác nhận Giải ngân'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

