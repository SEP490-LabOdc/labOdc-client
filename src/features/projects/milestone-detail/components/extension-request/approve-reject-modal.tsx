import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useUpdateExtensionRequest } from '@/hooks/api/milestones/mutations'
import { MilestoneExtensionRequestStatus } from '@/hooks/api/milestones/enums'
import { toast } from 'sonner'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'

interface ApproveRejectModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    milestoneId: string
    extensionRequestId: string
    action: 'approve' | 'reject'
    onSuccess?: () => void
}

export const ApproveRejectModal: React.FC<ApproveRejectModalProps> = ({
    open,
    onOpenChange,
    milestoneId,
    extensionRequestId,
    action,
    onSuccess,
}) => {
    const [reason, setReason] = useState('')
    const updateMutation = useUpdateExtensionRequest()

    const isApprove = action === 'approve'
    const isLoading = updateMutation.isPending

    const handleSubmit = async () => {
        if (isApprove) {
            // Approve doesn't require reason
            try {
                await updateMutation.mutateAsync({
                    milestoneId,
                    id: extensionRequestId,
                    status: MilestoneExtensionRequestStatus.APPROVED,
                    reason: '',
                })
                toast.success('Yêu cầu gia hạn đã được phê duyệt')
                onSuccess?.()
                onOpenChange(false)
                setReason('')
            } catch (error) {
                console.error(error)
            }
        } else {
            // Reject requires reason
            if (!reason.trim()) {
                toast.error('Vui lòng nhập lý do từ chối')
                return
            }
            try {
                await updateMutation.mutateAsync({
                    milestoneId,
                    id: extensionRequestId,
                    status: MilestoneExtensionRequestStatus.REJECTED,
                    reason: reason.trim(),
                })
                toast.success('Yêu cầu gia hạn đã bị từ chối')
                onSuccess?.()
                onOpenChange(false)
                setReason('')
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {isApprove ? (
                            <>
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <span className="text-green-700">Phê duyệt yêu cầu gia hạn</span>
                            </>
                        ) : (
                            <>
                                <XCircle className="h-5 w-5 text-red-600" />
                                <span className="text-red-700">Từ chối yêu cầu gia hạn</span>
                            </>
                        )}
                    </DialogTitle>
                    <DialogDescription>
                        {isApprove ? (
                            <p>Bạn có chắc chắn muốn phê duyệt yêu cầu gia hạn này?</p>
                        ) : (
                            <p>Vui lòng nhập lý do từ chối yêu cầu gia hạn này.</p>
                        )}
                    </DialogDescription>
                </DialogHeader>

                {!isApprove && (
                    <div className="space-y-2">
                        <Label htmlFor="reason">Lý do từ chối *</Label>
                        <Textarea
                            id="reason"
                            placeholder="Nhập lý do từ chối..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            rows={4}
                            disabled={isLoading}
                            className="resize-none"
                        />
                    </div>
                )}

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => {
                            onOpenChange(false)
                            setReason('')
                        }}
                        disabled={isLoading}
                    >
                        Hủy
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        variant={isApprove ? 'default' : 'destructive'}
                        className={isApprove ? 'bg-green-600 hover:bg-green-700' : ''}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Đang xử lý...
                            </>
                        ) : isApprove ? (
                            'Phê duyệt'
                        ) : (
                            'Từ chối'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

