import { useWithdrawal } from './withdrawal-provider'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useApproveWithdrawal } from '@/hooks/api/withdrawal/mutations'
import { toast } from 'sonner'
import { formatVND } from '@/helpers/currency'

export function WithdrawalApproveDialog() {
    const { open, setOpen, currentRow } = useWithdrawal()
    const approveMutation = useApproveWithdrawal()

    if (!currentRow) return null

    const handleClose = () => {
        setOpen(null)
    }

    const handleApprove = async () => {
        try {
            await approveMutation.mutateAsync({
                withdrawalId: currentRow.id,
            })
            toast.success('Đã duyệt yêu cầu rút tiền thành công')
            handleClose()
        } catch (error) {
            console.error('Error approving withdrawal:', error)
        }
    }

    return (
        <Dialog open={open === 'approve'} onOpenChange={handleClose}>
            <DialogContent className='max-w-2xl'>
                <DialogHeader>
                    <DialogTitle>Duyệt yêu cầu rút tiền</DialogTitle>
                    <DialogDescription>
                        Bạn có chắc chắn muốn duyệt yêu cầu rút tiền này?
                    </DialogDescription>
                </DialogHeader>
                <div className='space-y-4 py-4'>
                    <div>
                        <Label className='text-muted-foreground'>Số tiền</Label>
                        <p className='text-lg font-semibold text-green-600'>
                            {formatVND(currentRow.amount)}
                        </p>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant='outline' onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button
                        onClick={handleApprove}
                        disabled={approveMutation.isPending}
                    >
                        {approveMutation.isPending ? 'Đang xử lý...' : 'Xác nhận duyệt'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}