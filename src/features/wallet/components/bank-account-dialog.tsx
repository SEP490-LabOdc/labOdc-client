import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { CreditCard, CheckCircle, Info } from 'lucide-react'
import { toast } from 'sonner'

interface BankAccountDialogProps {
    isOpen: boolean
    onClose: () => void
    currentAccount?: {
        bankName: string
        accountNumber: string
        accountHolder: string
    }
    onSave: (account: {
        bankName: string
        accountNumber: string
        accountHolder: string
    }) => void
}

const BANKS = [
    { value: 'vietcombank', label: 'Vietcombank - Ngân hàng Ngoại thương' },
    { value: 'vietinbank', label: 'VietinBank - Ngân hàng Công thương' },
    { value: 'bidv', label: 'BIDV - Ngân hàng Đầu tư và Phát triển' },
    { value: 'agribank', label: 'Agribank - Ngân hàng Nông nghiệp' },
    { value: 'techcombank', label: 'Techcombank - Ngân hàng Kỹ thương' },
    { value: 'mbbank', label: 'MB Bank - Ngân hàng Quân đội' },
    { value: 'acb', label: 'ACB - Ngân hàng Á Châu' },
    { value: 'vpbank', label: 'VPBank - Ngân hàng Việt Nam Thịnh vượng' },
    { value: 'tpbank', label: 'TPBank - Ngân hàng Tiên Phong' },
    { value: 'sacombank', label: 'Sacombank - Ngân hàng TMCP Sài Gòn Thương Tín' },
]

export const BankAccountDialog: React.FC<BankAccountDialogProps> = ({
    isOpen,
    onClose,
    currentAccount,
    onSave
}) => {
    const [bankName, setBankName] = useState(currentAccount?.bankName || '')
    const [accountNumber, setAccountNumber] = useState(currentAccount?.accountNumber || '')
    const [accountHolder, setAccountHolder] = useState(currentAccount?.accountHolder || '')
    const [isProcessing, setIsProcessing] = useState(false)

    const handleSubmit = async () => {
        if (!bankName || !accountNumber || !accountHolder) {
            toast.error('Vui lòng điền đầy đủ thông tin')
            return
        }

        // Validate account number (should be digits only)
        if (!/^\d+$/.test(accountNumber)) {
            toast.error('Số tài khoản chỉ được chứa chữ số')
            return
        }

        if (accountNumber.length < 8 || accountNumber.length > 20) {
            toast.error('Số tài khoản không hợp lệ (8-20 chữ số)')
            return
        }

        setIsProcessing(true)
        try {
            await onSave({
                bankName,
                accountNumber,
                accountHolder: accountHolder.toUpperCase()
            })
            toast.success(
                currentAccount
                    ? 'Cập nhật tài khoản ngân hàng thành công'
                    : 'Liên kết tài khoản ngân hàng thành công'
            )
            onClose()
        } catch (error) {
            toast.error('Có lỗi xảy ra, vui lòng thử lại')
        } finally {
            setIsProcessing(false)
        }
    }

    const handleClose = () => {
        if (!currentAccount) {
            setBankName('')
            setAccountNumber('')
            setAccountHolder('')
        }
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <CreditCard className="h-6 w-6 text-[#2a9d8f]" />
                        {currentAccount ? 'Cập nhật Tài khoản Ngân hàng' : 'Liên kết Tài khoản Ngân hàng'}
                    </DialogTitle>
                    <DialogDescription>
                        {currentAccount
                            ? 'Thay đổi thông tin tài khoản nhận tiền'
                            : 'Thêm tài khoản ngân hàng để rút tiền về'
                        }
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Info Note */}
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <div className="flex items-start gap-2">
                            <Info className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div className="text-xs text-blue-800">
                                <p className="font-semibold mb-1">💡 Hướng dẫn:</p>
                                <ul className="space-y-0.5 ml-4">
                                    <li>• Chỉ được liên kết tài khoản ngân hàng chính chủ</li>
                                    <li>• Kiểm tra kỹ thông tin trước khi lưu</li>
                                    <li>• Tên chủ tài khoản phải viết KHÔNG DẤU, IN HOA</li>
                                    <li>• Số tài khoản phải chính xác để nhận tiền</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Bank Name Select */}
                    <div className="space-y-2">
                        <Label htmlFor="bankName">Ngân hàng *</Label>
                        <Select value={bankName} onValueChange={setBankName}>
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn ngân hàng..." />
                            </SelectTrigger>
                            <SelectContent>
                                {BANKS.map((bank) => (
                                    <SelectItem key={bank.value} value={bank.label}>
                                        {bank.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Account Number Input */}
                    <div className="space-y-2">
                        <Label htmlFor="accountNumber">Số tài khoản *</Label>
                        <Input
                            id="accountNumber"
                            type="text"
                            placeholder="Nhập số tài khoản..."
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                            maxLength={20}
                        />
                        <p className="text-xs text-gray-500">
                            Chỉ nhập số, độ dài 8-20 chữ số
                        </p>
                    </div>

                    {/* Account Holder Input */}
                    <div className="space-y-2">
                        <Label htmlFor="accountHolder">Tên chủ tài khoản *</Label>
                        <Input
                            id="accountHolder"
                            type="text"
                            placeholder="NGUYEN VAN A"
                            value={accountHolder}
                            onChange={(e) => setAccountHolder(e.target.value.toUpperCase())}
                            maxLength={50}
                        />
                        <p className="text-xs text-gray-500">
                            Viết KHÔNG DẤU, IN HOA (ví dụ: NGUYEN VAN A)
                        </p>
                    </div>

                    {/* Preview */}
                    {bankName && accountNumber && accountHolder && (
                        <div className="p-4 bg-green-50 border-2 border-green-200 rounded-md">
                            <p className="text-xs font-semibold text-green-800 mb-2">
                                🔍 Xem trước thông tin:
                            </p>
                            <div className="space-y-1 text-sm">
                                <p className="text-green-900">
                                    <strong>Ngân hàng:</strong> {bankName}
                                </p>
                                <p className="text-green-900">
                                    <strong>Số TK:</strong> {accountNumber}
                                </p>
                                <p className="text-green-900">
                                    <strong>Chủ TK:</strong> {accountHolder}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Warning */}
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                        <p className="text-xs text-yellow-800">
                            ⚠️ <strong>Lưu ý:</strong> Vui lòng kiểm tra kỹ thông tin.
                            Nếu sai số tài khoản hoặc tên chủ TK, tiền có thể bị mất hoặc hoàn trả chậm.
                        </p>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={handleClose} disabled={isProcessing}>
                        Hủy
                    </Button>
                    <Button
                        className="bg-[#2a9d8f] hover:bg-[#21867a]"
                        onClick={handleSubmit}
                        disabled={!bankName || !accountNumber || !accountHolder || isProcessing}
                    >
                        {isProcessing ? (
                            'Đang xử lý...'
                        ) : (
                            <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                {currentAccount ? 'Cập nhật' : 'Lưu thông tin'}
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

