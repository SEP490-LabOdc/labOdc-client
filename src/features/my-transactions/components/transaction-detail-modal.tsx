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
import { formatDateTime } from '@/helpers/datetime'
import { Badge } from '@/components/ui/badge'
import {
    ArrowDownLeft,
    ArrowUpRight,
    Clock,
    CheckCircle,
    XCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { type Transaction } from './my-transactions-table'
import { useMyTransactions } from './my-transactions-provider'

const getTypeConfig = (type: Transaction['type']) => {
    switch (type) {
        case 'INCOME':
        case 'MILESTONE_RELEASE':
        case 'INTERNAL_DISTRIBUTION':
            return {
                icon: ArrowDownLeft,
                color: 'text-green-600',
                bgColor: 'bg-green-100',
                label: 'Thu nhập',
                sign: '+',
            }
        case 'WITHDRAWAL':
            return {
                icon: ArrowUpRight,
                color: 'text-red-600',
                bgColor: 'bg-red-100',
                label: 'Rút tiền',
                sign: '-',
            }
        case 'DEPOSIT':
            return {
                icon: ArrowDownLeft,
                color: 'text-blue-600',
                bgColor: 'bg-blue-100',
                label: 'Nạp tiền',
                sign: '+',
            }
        case 'REFUND':
            return {
                icon: ArrowUpRight,
                color: 'text-orange-600',
                bgColor: 'bg-orange-100',
                label: 'Hoàn tiền',
                sign: '-',
            }
        default:
            return {
                icon: ArrowDownLeft,
                color: 'text-gray-600',
                bgColor: 'bg-gray-100',
                label: 'Giao dịch',
                sign: '',
            }
    }
}

const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
        case 'COMPLETED':
            return (
                <Badge className="bg-green-100 text-green-800 border-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Hoàn thành
                </Badge>
            )
        case 'PENDING':
            return (
                <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                    <Clock className="h-3 w-3 mr-1" />
                    Đang xử lý
                </Badge>
            )
        case 'FAILED':
            return (
                <Badge className="bg-red-100 text-red-800 border-red-200">
                    <XCircle className="h-3 w-3 mr-1" />
                    Thất bại
                </Badge>
            )
    }
}

export function TransactionDetailModal() {
    const { open, setOpen, currentRow } = useMyTransactions()

    const handleClose = () => {
        setOpen(null)
    }

    if (!currentRow) return null

    const typeConfig = getTypeConfig(currentRow.type)
    const TypeIcon = typeConfig.icon

    return (
        <Dialog open={open === 'view'} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Chi tiết Giao dịch</DialogTitle>
                    <DialogDescription>
                        Thông tin chi tiết về giao dịch
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="text-muted-foreground">ID</Label>
                            <p className="font-mono text-sm">{currentRow.id}</p>
                        </div>
                        <div>
                            <Label className="text-muted-foreground">Loại giao dịch</Label>
                            <div className="flex items-center gap-2 mt-1">
                                <div className={`p-2 ${typeConfig.bgColor} rounded-full`}>
                                    <TypeIcon className={`h-4 w-4 ${typeConfig.color}`} />
                                </div>
                                <span className="text-sm font-medium">{typeConfig.label}</span>
                            </div>
                        </div>
                        <div>
                            <Label className="text-muted-foreground">Số tiền</Label>
                            <p className={cn('text-lg font-semibold', typeConfig.color)}>
                                {typeConfig.sign}{formatVND(currentRow.amount)}
                            </p>
                        </div>
                        <div>
                            <Label className="text-muted-foreground">Trạng thái</Label>
                            <div className="mt-1">
                                {getStatusBadge(currentRow.status)}
                            </div>
                        </div>
                    </div>

                    <div>
                        <Label className="text-muted-foreground">Mô tả</Label>
                        <p className="text-sm mt-2 p-3 rounded-lg bg-muted">
                            {currentRow.description}
                        </p>
                    </div>

                    {currentRow.metadata && (
                        <div>
                            <Label className="text-muted-foreground">Thông tin bổ sung</Label>
                            <div className="mt-2 rounded-lg border p-4 space-y-2">
                                {currentRow.metadata.milestoneName && (
                                    <div className="text-sm">
                                        <span className="font-medium">Milestone: </span>
                                        <span>{currentRow.metadata.milestoneName}</span>
                                    </div>
                                )}
                                {currentRow.metadata.projectName && (
                                    <div className="text-sm">
                                        <span className="font-medium">Dự án: </span>
                                        <span>{currentRow.metadata.projectName}</span>
                                    </div>
                                )}
                                {currentRow.metadata.fromUser && (
                                    <div className="text-sm">
                                        <span className="font-medium">Từ: </span>
                                        <span>{currentRow.metadata.fromUser}</span>
                                    </div>
                                )}
                                {currentRow.metadata.bankAccount && (
                                    <div className="text-sm">
                                        <span className="font-medium">Tài khoản ngân hàng: </span>
                                        <span>{currentRow.metadata.bankAccount}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div>
                        <Label className="text-muted-foreground">Thời gian</Label>
                        <div className="flex items-center gap-1 text-sm mt-1">
                            <Clock className="h-4 w-4" />
                            <span>{formatDateTime(currentRow.createdAt)}</span>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={handleClose}>
                        Đóng
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

