import React, { useEffect, useMemo } from 'react'
import { Wallet } from 'lucide-react'
import { usePermission } from '@/hooks/usePermission'
import {
    WalletBalanceCard,
    WalletTransactionHistory,
    WithdrawDialog,
    BankAccountDialog,
    BankAccountListDialog,
    DepositDialog,
    PaymentSuccessDialog,
    PaymentFailureDialog,
} from './components'
import { useUser } from '@/context/UserContext'
import { useGetMyWallet, useDeleteBankInfo, useCreateBankInfo, useWithdraw } from '@/hooks/api/wallet'
import { useGetMyTransactions } from '@/hooks/api/transactions'
import { Sort } from '@/hooks/api/types'
import { useSearch, useNavigate } from '@tanstack/react-router'
import { Main } from '@/components/layout/main'
import { toast } from 'sonner'
import { usePopUp } from '@/hooks/usePopUp'
import { ROLE } from '@/const'
import { formatVND } from '@/helpers/currency'


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

    // Use usePopUp for dialogs
    const { popUp, handlePopUpOpen, handlePopUpClose } = usePopUp([
        'withdraw',
        'bankAccount',
        'bankAccountList',
        'deposit',
        'paymentSuccess',
        'paymentFailure'
    ] as const)

    // Fetch wallet data from API
    const { data: walletResponse, refetch: refetchWallet } = useGetMyWallet()

    // Fetch 5 newest transactions
    const { data: transactionsResponse, isLoading: isLoadingTransactions } = useGetMyTransactions({
        page: 0,
        size: 5,
        sortBy: 'createdAt',
        sortDir: Sort.DESC
    })

    // Bank info mutations
    const createBankInfoMutation = useCreateBankInfo()
    const deleteBankInfoMutation = useDeleteBankInfo()
    const withdrawMutation = useWithdraw()

    // Handle payment callback
    useEffect(() => {
        if (search.code || search.status || search.cancel) {
            // Check if payment was successful
            if (search.code === '00' && search.status !== 'CANCELLED' && !search.cancel) {
                handlePopUpOpen('paymentSuccess', {
                    orderCode: search.orderCode,
                    amount: undefined // Could be extracted from URL if available
                })
                // Refetch wallet data to update balance
                refetchWallet()
            } else {
                const isCancelled = search.cancel === 'true' || search.status === 'CANCELLED'
                handlePopUpOpen('paymentFailure', {
                    orderCode: search.orderCode,
                    errorCode: search.code,
                    isCancelled
                })
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
    }, [search.code, search.id, search.cancel, search.status, search.orderCode, navigate, refetchWallet, handlePopUpOpen])

    // Use API data if available, otherwise fallback to mock data
    const availableBalance = walletResponse?.data?.balance ?? 0
    const pendingBalance = walletResponse?.data?.heldBalance ?? 0

    // Map transactions from API response
    const transactions = useMemo(() => {
        const transactionsData = transactionsResponse?.data?.data || transactionsResponse?.data.data || []
        return transactionsData
    }, [transactionsResponse])

    // Get bank accounts from API response and map to UI format
    const bankAccounts = useMemo(() => {
        const bankInfos = walletResponse?.data?.bankInfos || []
        return bankInfos.map(bankInfo => ({
            bankName: bankInfo.bankName,
            accountNumber: bankInfo.accountNumber,
            accountHolder: bankInfo.accountHolderName // Map accountHolderName to accountHolder
        }))
    }, [walletResponse?.data?.bankInfos])

    const handleWithdraw = async (payload: {
        amount: number
        bankAccount: {
            bankName: string
            accountNumber: string
            accountHolder: string
        }
    }) => {
        const { amount, bankAccount } = payload

        try {
            await withdrawMutation.mutateAsync({
                amount,
                bankName: bankAccount.bankName,
                accountNumber: bankAccount.accountNumber,
                accountName: bankAccount.accountHolder
            })

            toast.success('Yêu cầu rút tiền đã được gửi thành công')
            refetchWallet()

        } catch (error) {
            console.error('Error creating withdrawal request:', error)
            toast.error('Có lỗi xảy ra khi rút tiền')
        }
    }

    const handleOpenBankAccountDialog = (account?: {
        bankName: string
        accountNumber: string
        accountHolder: string
    }) => {
        handlePopUpOpen('bankAccount', account)
    }

    const handleSaveBankAccount = async (account: {
        bankName: string
        accountNumber: string
        accountHolder: string
    }) => {
        await createBankInfoMutation.mutateAsync({
            bankName: account.bankName,
            accountNumber: account.accountNumber,
            accountHolderName: account.accountHolder // Map accountHolder to accountHolderName
        })
        // Refetch wallet data to get updated bankInfos
        refetchWallet()
    }

    const handleDeleteBankAccount = async (accountNumber: string) => {
        try {
            await deleteBankInfoMutation.mutateAsync(accountNumber)
            // Refetch wallet data to get updated bankInfos
            refetchWallet()
            toast.success('Xóa tài khoản ngân hàng thành công')
        } catch (error) {
            console.error('Error deleting bank account:', error)
            toast.error('Có lỗi xảy ra khi xóa tài khoản ngân hàng')
        }
    }

    // Navigate to my-transactions page based on user role
    const handleViewAllTransactions = () => {
        const role = user?.role
        let basePath = '/talent'

        if (role === ROLE.MENTOR) {
            basePath = '/mentor'
        } else if (role === ROLE.COMPANY) {
            basePath = '/company-manage'
        } else if (role === ROLE.SYSTEM_ADMIN || role === ROLE.LAB_ADMIN) {
            basePath = '/admin'
        }

        navigate({
            to: `${basePath}/my-transactions`,
        })
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
                                    {formatVND(0)}
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
                                    {formatVND(0)}
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
                                    {formatVND(0)}
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
                            onWithdraw={() => handlePopUpOpen('withdraw')}
                            onBankAccount={() => handlePopUpOpen('bankAccountList')}
                            onDeposit={() => handlePopUpOpen('deposit')}
                            isCompany={isCompany}
                        />
                    </div>

                    {/* Right Column - Transaction History */}
                    <div className="lg:col-span-2">
                        <WalletTransactionHistory
                            transactions={transactions}
                            isLoading={isLoadingTransactions}
                            onViewAll={handleViewAllTransactions}
                        />
                    </div>
                </div>
            </div>

            {/* Withdraw Dialog */}
            <WithdrawDialog
                isOpen={popUp.withdraw.isOpen}
                onClose={() => handlePopUpClose('withdraw')}
                availableBalance={availableBalance}
                bankAccounts={bankAccounts}
                onConfirm={handleWithdraw}
            />

            {/* Bank Account List Dialog */}
            <BankAccountListDialog
                isOpen={popUp.bankAccountList.isOpen}
                onClose={() => handlePopUpClose('bankAccountList')}
                accounts={bankAccounts}
                onAdd={() => {
                    handlePopUpClose('bankAccountList')
                    handleOpenBankAccountDialog()
                }}
                onEdit={(account) => {
                    handlePopUpClose('bankAccountList')
                    handleOpenBankAccountDialog(account)
                }}
                onDelete={handleDeleteBankAccount}
                isDeleting={deleteBankInfoMutation.isPending}
            />

            {/* Bank Account Dialog */}
            <BankAccountDialog
                isOpen={popUp.bankAccount.isOpen}
                onClose={() => handlePopUpClose('bankAccount')}
                currentAccount={popUp.bankAccount.data}
                onSave={handleSaveBankAccount}
            />

            {/* Deposit Dialog - Only for Company */}
            {isCompany && user?.userId && (
                <DepositDialog
                    isOpen={popUp.deposit.isOpen}
                    onClose={() => handlePopUpClose('deposit')}
                />
            )}

            {/* Payment Success Dialog */}
            <PaymentSuccessDialog
                isOpen={popUp.paymentSuccess.isOpen}
                onClose={() => handlePopUpClose('paymentSuccess')}
                orderCode={popUp.paymentSuccess.data?.orderCode}
                amount={popUp.paymentSuccess.data?.amount}
            />

            {/* Payment Failure Dialog */}
            <PaymentFailureDialog
                isOpen={popUp.paymentFailure.isOpen}
                onClose={() => handlePopUpClose('paymentFailure')}
                onRetry={() => {
                    handlePopUpClose('paymentFailure')
                    handlePopUpOpen('deposit')
                }}
                orderCode={popUp.paymentFailure.data?.orderCode}
                errorCode={popUp.paymentFailure.data?.errorCode}
                isCancelled={popUp.paymentFailure.data?.isCancelled}
            />
        </Main>
    )
}

export default MyWalletPage

