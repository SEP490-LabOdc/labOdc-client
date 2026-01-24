import { useState } from 'react'
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
import { Textarea } from '@/components/ui/textarea'
import { useRejectWithdrawal } from '@/hooks/api/withdrawal/mutations'
import { toast } from 'sonner'
import { formatVND } from '@/helpers/currency'

export function WithdrawalRejectDialog() {
    const { open, setOpen, currentRow } = useWithdrawal()
    const [note, setNote] = useState('')
    const rejectMutation = useRejectWithdrawal()

    if (!currentRow) return null

    const handleClose = () => {
        setOpen(null)
        setNote('')
    }

    const handleReject = async () => {
        if (!note.trim()) {
            toast.error('Vui lòng nhập lý do từ chối')
            return
        }

        try {
            await rejectMutation.mutateAsync({
                withdrawalId: currentRow.id,
                adminNote: note.trim(),
            })
            toast.success('Đã từ chối yêu cầu rút tiền thành công')
            handleClose()
        } catch (error) {
            toast.error('Có lỗi xảy ra khi từ chối yêu cầu')
        }
    }

    return (
        <Dialog open={open === 'reject'} onOpenChange={handleClose}>
            <DialogContent className='max-w-2xl'>
                <DialogHeader>
                    <DialogTitle>Từ chối yêu cầu rút tiền</DialogTitle>
                    <DialogDescription>
                        Vui lòng nhập lý do từ chối yêu cầu rút tiền này.
                    </DialogDescription>
                </DialogHeader>
                <div className='space-y-4 py-4'>
                    <div>
                        <Label className='text-muted-foreground'>Số tiền</Label>
                        <p className='text-lg font-semibold text-red-600'>
                            {formatVND(currentRow.amount)}
                        </p>
                    </div>
                    <div>
                        <Label htmlFor='reject-note'>Lý do từ chối *</Label>
                        <Textarea
                            id='reject-note'
                            placeholder='Nhập lý do từ chối...'
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className='mt-2'
                            required
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant='outline' onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button
                        variant='destructive'
                        onClick={handleReject}
                        disabled={rejectMutation.isPending || !note.trim()}
                    >
                        {rejectMutation.isPending ? 'Đang xử lý...' : 'Xác nhận từ chối'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}