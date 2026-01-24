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
import { formatVND } from '@/helpers/currency'
import { formatDate } from '@/helpers/datetime'
import { Badge } from '@/components/ui/badge'
import { STATUS_COLORS } from '@/helpers/status'
import { cn } from '@/lib/utils'
import { WITHDRAWAL_STATUS_LABEL } from '../data/schema'

export function WithdrawalViewDialog() {
    const { open, setOpen, currentRow } = useWithdrawal()

    if (!currentRow) return null

    const handleClose = () => {
        setOpen(null)
    }

    const statusColor = STATUS_COLORS[currentRow.status as keyof typeof STATUS_COLORS] || STATUS_COLORS.PENDING

    return (
        <Dialog open={open === 'view'} onOpenChange={handleClose}>
            <DialogContent className='max-w-2xl'>
                <DialogHeader>
                    <DialogTitle>Chi tiết yêu cầu rút tiền</DialogTitle>
                    <DialogDescription>
                        Thông tin chi tiết về yêu cầu rút tiền
                    </DialogDescription>
                </DialogHeader>
                <div className='space-y-4 py-4'>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label className='text-muted-foreground'>ID</Label>
                            <p className='font-mono text-sm'>{currentRow.id}</p>
                        </div>
                        <div>
                            <Label className='text-muted-foreground'>User ID</Label>
                            <p className='font-mono text-sm'>{currentRow.userId}</p>
                        </div>
                        <div>
                            <Label className='text-muted-foreground'>Số tiền</Label>
                            <p className='text-lg font-semibold text-green-600'>
                                {formatVND(currentRow.amount)}
                            </p>
                        </div>
                        <div>
                            <Label className='text-muted-foreground'>Trạng thái</Label>
                            <div>
                                <Badge variant='outline' className={cn('capitalize border-none', statusColor)}>
                                    {WITHDRAWAL_STATUS_LABEL[currentRow.status] || currentRow.status}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Label className='text-muted-foreground'>Thông tin ngân hàng</Label>
                        <div className='mt-2 rounded-md border p-4 space-y-2'>
                            {currentRow.bankInfo?.bankName && (
                                <p className='font-medium'>{currentRow.bankInfo.bankName}</p>
                            )}
                            {currentRow.bankInfo?.accountNumber && (
                                <p className='text-sm text-muted-foreground'>
                                    Số tài khoản: {currentRow.bankInfo.accountNumber}
                                </p>
                            )}
                            {currentRow.bankInfo?.accountHolder && (
                                <p className='text-sm text-muted-foreground'>
                                    Chủ tài khoản: {currentRow.bankInfo.accountHolder}
                                </p>
                            )}
                            {!currentRow.bankInfo?.bankName && !currentRow.bankInfo?.accountNumber && (
                                <p className='text-sm text-muted-foreground'>-</p>
                            )}
                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label className='text-muted-foreground'>Ngày tạo</Label>
                            <p className='text-sm'>{formatDate(currentRow.createdAt)}</p>
                        </div>
                        {currentRow.processedAt && (
                            <div>
                                <Label className='text-muted-foreground'>Ngày xử lý</Label>
                                <p className='text-sm'>{formatDate(currentRow.processedAt)}</p>
                            </div>
                        )}
                    </div>

                    {currentRow.adminNote && (
                        <div>
                            <Label className='text-muted-foreground'>Ghi chú</Label>
                            <p className='text-sm mt-2 p-3 rounded-md bg-muted'>{currentRow.adminNote}</p>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button variant='outline' onClick={handleClose}>
                        Đóng
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}