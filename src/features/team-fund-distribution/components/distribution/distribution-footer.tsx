import React from 'react'
import { Button } from '@/components/ui/button'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DistributionFooterProps {
    canSubmit: boolean
    isSubmitting: boolean
    onSubmit: () => void
}

export const DistributionFooter: React.FC<DistributionFooterProps> = ({
    canSubmit,
    isSubmitting,
    onSubmit,
}) => {

    return (
        <>
            {/* Summary Stats */}
            <div className="w-full flex justify-end">
                {/* Action Button */}
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
            </div>
        </>
    )
}

