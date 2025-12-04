import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Wallet, DollarSign, Clock, TrendingUp, CreditCard, Plus } from 'lucide-react'

interface WalletBalanceCardProps {
    availableBalance: number
    pendingBalance: number
    onWithdraw: () => void
    onBankAccount: () => void
    onDeposit?: () => void
    isCompany?: boolean
}

const formatVND = (v: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v)

export const WalletBalanceCard: React.FC<WalletBalanceCardProps> = ({
    availableBalance,
    pendingBalance,
    onWithdraw,
    onBankAccount,
    onDeposit,
    isCompany = false
}) => {
    const totalBalance = availableBalance + pendingBalance

    return (
        <Card className="border-2 border-[#2a9d8f]">
            <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                    <Wallet className="h-6 w-6 text-[#2a9d8f]" />
                    Tổng quan Ví
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Tổng số dư */}
                <div className="p-6 bg-gradient-to-r from-[#2a9d8f] to-[#264653] rounded-lg text-white">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium opacity-90">Tổng số dư</p>
                        <TrendingUp className="h-5 w-5 opacity-75" />
                    </div>
                    <p className="text-4xl font-bold mb-4">{formatVND(totalBalance)}</p>
                    <div className="flex items-center gap-2">
                        <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                            {availableBalance > 0 ? 'Có thể rút tiền' : 'Chưa có tiền'}
                        </Badge>
                    </div>
                </div>

                {/* Breakdown */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Số dư khả dụng */}
                    <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 bg-green-100 rounded-full">
                                <DollarSign className="h-4 w-4 text-green-600" />
                            </div>
                            <p className="text-sm font-semibold text-green-800">Khả dụng</p>
                        </div>
                        <p className="text-2xl font-bold text-green-700">
                            {formatVND(availableBalance)}
                        </p>
                        <p className="text-xs text-green-600 mt-1">Có thể rút ngay</p>
                    </div>

                    {/* Số dư chờ */}
                    <div className="p-4 bg-orange-50 border-2 border-orange-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 bg-orange-100 rounded-full">
                                <Clock className="h-4 w-4 text-orange-600" />
                            </div>
                            <p className="text-sm font-semibold text-orange-800">Đang chờ</p>
                        </div>
                        <p className="text-2xl font-bold text-orange-700">
                            {formatVND(pendingBalance)}
                        </p>
                        <p className="text-xs text-orange-600 mt-1">Đang xử lý</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                    {isCompany && onDeposit && (
                        <Button
                            className="w-full bg-[#264653] hover:bg-[#264653]/90 text-white"
                            onClick={onDeposit}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Nạp tiền
                        </Button>
                    )}
                    <div className="flex gap-3">
                        <Button
                            className="flex-1 bg-[#2a9d8f] hover:bg-[#21867a]"
                            disabled={availableBalance <= 0}
                            onClick={onWithdraw}
                        >
                            <Wallet className="h-4 w-4 mr-2" />
                            Rút tiền
                        </Button>
                        <Button
                            variant="outline"
                            className="flex-1 border-[#2a9d8f] text-[#2a9d8f] hover:bg-[#2a9d8f]/10"
                            onClick={onBankAccount}
                        >
                            <CreditCard className="h-4 w-4 mr-2" />
                            Tài khoản NH
                        </Button>
                    </div>
                </div>

                {/* Info Note */}
                {availableBalance <= 0 && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-xs text-blue-800">
                            💡 <strong>Lưu ý:</strong> Số dư khả dụng của bạn hiện đang là 0.
                            Bạn cần nhận tiền từ Milestone hoặc Leader trước khi có thể rút.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

