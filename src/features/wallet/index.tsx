import React, { useState, useEffect } from 'react'
import { Wallet } from 'lucide-react'
import { usePermission } from '@/hooks/usePermission'
import {
    WalletBalanceCard,
    WalletTransactionHistory,
    WithdrawDialog,
    BankAccountDialog,
    DepositDialog,
    PaymentSuccessDialog,
    PaymentFailureDialog,
    type Transaction
} from './components'
import { useUser } from '@/context/UserContext'
import { useGetMyWallet } from '@/hooks/api/wallet'
import { useSearch, useNavigate } from '@tanstack/react-router'
import { Main } from '@/components/layout/main'

// Mock Data
const MOCK_TRANSACTIONS: Transaction[] = [
    {
        id: 't1',
        type: 'INCOME',
        amount: 2500000,
        description: 'Thu nhập từ Milestone 1',
        status: 'COMPLETED',
        createdAt: '2025-01-16T09:00:00',
        metadata: {
            milestoneName: 'Milestone 1: Setup & Design'
        }
    },
    {
        id: 't2',
        type: 'INCOME',
        amount: 3000000,
        description: 'Phân bổ từ Leader',
        status: 'COMPLETED',
        createdAt: '2025-01-20T14:30:00',
        metadata: {
            fromUser: 'Nguyễn Văn A (Leader)'
        }
    },
    {
        id: 't3',
        type: 'WITHDRAWAL',
        amount: 2000000,
        description: 'Rút tiền về Vietcombank',
        status: 'PENDING',
        createdAt: '2025-01-25T10:15:00',
        metadata: {
            bankAccount: 'Vietcombank - *****1234'
        }
    },
    {
        id: 't4',
        type: 'WITHDRAWAL',
        amount: 1000000,
        description: 'Rút tiền về Techcombank',
        status: 'COMPLETED',
        createdAt: '2025-01-10T16:45:00',
        metadata: {
            bankAccount: 'Techcombank - *****5678'
        }
    }
]

const MOCK_BANK_ACCOUNT = {
    bankName: 'Vietcombank - Ngân hàng Ngoại thương',
    accountNumber: '1234567890',
    accountHolder: 'NGUYEN VAN A'
}

export const MyWalletPage: React.FC = () => {
    const { user, isCompany } = usePermission()
    const { user: userProfile } = useUser()
    const navigate = useNavigate()

    // Get search params from URL (callback params)
    const search = useSearch({ strict: false }) as {
        code?: string
        id?: string
        cancel?: string
        status?: string
        orderCode?: string
    }

    const [isWithdrawOpen, setIsWithdrawOpen] = useState(false)
    const [isBankAccountOpen, setIsBankAccountOpen] = useState(false)
    const [isDepositOpen, setIsDepositOpen] = useState(false)
    const [isPaymentSuccessOpen, setIsPaymentSuccessOpen] = useState(false)
    const [isPaymentFailureOpen, setIsPaymentFailureOpen] = useState(false)
    const [paymentResult, setPaymentResult] = useState<{
        orderCode?: string
        errorCode?: string
        isCancelled?: boolean
        amount?: number
    }>({})

    // Fetch wallet data from API
    const { data: walletResponse, refetch: refetchWallet } = useGetMyWallet()

    // Handle payment callback
    useEffect(() => {
        if (search.code || search.status || search.cancel) {
            // Check if payment was successful
            if (search.code === '00' && search.status !== 'CANCELLED' && !search.cancel) {
                setPaymentResult({
                    orderCode: search.orderCode,
                    amount: undefined // Could be extracted from URL if available
                })
                setIsPaymentSuccessOpen(true)
                // Refetch wallet data to update balance
                refetchWallet()
            } else {
                const isCancelled = search.cancel === 'true' || search.status === 'CANCELLED'
                setPaymentResult({
                    orderCode: search.orderCode,
                    errorCode: search.code,
                    isCancelled
                })
                setIsPaymentFailureOpen(true)
            }

            // Clear URL params after showing notification
            const url = new URL(window.location.href)
            url.searchParams.delete('code')
            url.searchParams.delete('id')
            url.searchParams.delete('cancel')
            url.searchParams.delete('status')
            url.searchParams.delete('orderCode')
            navigate({
                to: url.pathname,
                replace: true,
            })
        }
    }, [search.code, search.id, search.cancel, search.status, search.orderCode, navigate, refetchWallet])

    // Use API data if available, otherwise fallback to mock data
    const availableBalance = walletResponse?.data?.balance ?? 0
    const pendingBalance = walletResponse?.data?.heldBalance ?? 0

    // Mock data for fields not yet available from API
    const [transactions] = useState<Transaction[]>(MOCK_TRANSACTIONS)
    const [bankAccount, setBankAccount] = useState(MOCK_BANK_ACCOUNT)

    const handleWithdraw = async (amount: number) => {
        // TODO: Call API to create withdrawal request
        console.log('Withdraw request:', { amount })
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
    }

    const handleSaveBankAccount = async (account: {
        bankName: string
        accountNumber: string
        accountHolder: string
    }) => {
        // TODO: Call API to save/update bank account
        console.log('Save bank account:', account)
        setBankAccount(account)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
    }

    return (
        <Main>
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                <Wallet className="h-8 w-8 text-[#2a9d8f]" />
                                Ví của tôi
                            </h1>
                            <p className="text-gray-500 mt-1">
                                Quản lý số dư và rút tiền về ngân hàng
                            </p>
                        </div>
                    </div>
                </div>

                {/* User Info Badge */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium">Người dùng:</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold">
                        {userProfile?.fullName || 'User'}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">
                        Role: {user?.role}
                    </span>
                </div>
                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white border rounded-md">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-full">
                                <Wallet className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Tổng thu nhập</p>
                                <p className="text-lg font-bold text-green-600">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                        transactions
                                            .filter(t => t.type === 'INCOME' && t.status === 'COMPLETED')
                                            .reduce((sum, t) => sum + t.amount, 0)
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-white border rounded-md">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-full">
                                <Wallet className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Tổng đã rút</p>
                                <p className="text-lg font-bold text-blue-600">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                        transactions
                                            .filter(t => t.type === 'WITHDRAWAL' && t.status === 'COMPLETED')
                                            .reduce((sum, t) => sum + t.amount, 0)
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-white border rounded-md">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-100 rounded-full">
                                <Wallet className="h-5 w-5 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Đang xử lý</p>
                                <p className="text-lg font-bold text-orange-600">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                        transactions
                                            .filter(t => t.status === 'PENDING')
                                            .reduce((sum, t) => sum + t.amount, 0)
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Balance Card */}
                    <div className="lg:col-span-1">
                        <WalletBalanceCard
                            availableBalance={availableBalance}
                            pendingBalance={pendingBalance}
                            onWithdraw={() => setIsWithdrawOpen(true)}
                            onBankAccount={() => setIsBankAccountOpen(true)}
                            onDeposit={() => setIsDepositOpen(true)}
                            isCompany={isCompany}
                        />
                    </div>

                    {/* Right Column - Transaction History */}
                    <div className="lg:col-span-2">
                        <WalletTransactionHistory transactions={transactions} />
                    </div>
                </div>
            </div>

            {/* Withdraw Dialog */}
            <WithdrawDialog
                isOpen={isWithdrawOpen}
                onClose={() => setIsWithdrawOpen(false)}
                availableBalance={availableBalance}
                bankAccount={bankAccount}
                onConfirm={handleWithdraw}
            />

            {/* Bank Account Dialog */}
            <BankAccountDialog
                isOpen={isBankAccountOpen}
                onClose={() => setIsBankAccountOpen(false)}
                currentAccount={bankAccount}
                onSave={handleSaveBankAccount}
            />

            {/* Deposit Dialog - Only for Company */}
            {isCompany && user?.userId && (
                <DepositDialog
                    isOpen={isDepositOpen}
                    onClose={() => setIsDepositOpen(false)}
                />
            )}

            {/* Payment Success Dialog */}
            <PaymentSuccessDialog
                isOpen={isPaymentSuccessOpen}
                onClose={() => {
                    setIsPaymentSuccessOpen(false)
                    setPaymentResult({})
                }}
                orderCode={paymentResult.orderCode}
                amount={paymentResult.amount}
            />

            {/* Payment Failure Dialog */}
            <PaymentFailureDialog
                isOpen={isPaymentFailureOpen}
                onClose={() => {
                    setIsPaymentFailureOpen(false)
                    setPaymentResult({})
                }}
                onRetry={() => {
                    setIsPaymentFailureOpen(false)
                    setIsDepositOpen(true)
                    setPaymentResult({})
                }}
                orderCode={paymentResult.orderCode}
                errorCode={paymentResult.errorCode}
                isCancelled={paymentResult.isCancelled}
            />
        </Main>
    )
}

export default MyWalletPage

