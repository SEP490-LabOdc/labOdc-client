import { useSearch, useNavigate, useRouterState } from '@tanstack/react-router'
import { Main } from '@/components/layout/main'
import { MyTransactionsTable } from './components/my-transactions-table'
import { MyTransactionsProvider } from './components/my-transactions-provider'
import { TransactionDetailModal } from './components/transaction-detail-modal'
import { useGetMyTransactions } from '@/hooks/api/transactions'
import { ErrorView } from '@/components/admin/ErrorView'
import { Spinner } from '@/components/ui/spinner'
import { Sort } from '@/hooks/api/types'
import type { NavigateFn } from '@/hooks/use-table-url-state'

export default function MyTransactions() {
    const search = useSearch({ strict: false }) as {
        page?: number
        size?: number
        sortBy?: string
        sortDir?: Sort
    }
    const routerNavigate = useNavigate()
    const routerState = useRouterState()
    const currentPath = routerState.location.pathname

    // Create navigate function compatible with NavigateFn type
    const navigate: NavigateFn = ({ search: searchParams, replace }) => {
        const newSearch = typeof searchParams === 'function'
            ? searchParams(search)
            : searchParams === true
                ? search
                : searchParams

        routerNavigate({
            to: currentPath,
            search: newSearch as Record<string, unknown>,
            replace,
        })
    }

    // Extract query params from URL
    const page = (search.page as number) || 0
    const size = (search.size as number) || 20
    const sortBy = (search.sortBy as string) || 'createdAt'
    const sortDir = (search.sortDir as Sort) || Sort.DESC

    const { data, isLoading, isError, error } = useGetMyTransactions({
        page,
        size,
        sortBy,
        sortDir,
    })

    if (isError) {
        return (
            <ErrorView
                title="Lỗi Tải Dữ Liệu"
                description="Không thể kết nối đến server hoặc tải danh sách giao dịch."
                details={error?.message}
            />
        )
    }

    const transactions = data?.data?.data || data?.data?.data || []

    return (
        <MyTransactionsProvider>
            <Main>
                <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Lịch sử Giao dịch</h2>
                        <p className="text-muted-foreground">
                            Xem và theo dõi tất cả các giao dịch của bạn.
                        </p>
                    </div>
                </div>
                <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <Spinner className="w-10 h-10" />
                        </div>
                    ) : (
                        <MyTransactionsTable data={transactions} search={search} navigate={navigate} />
                    )}
                </div>
            </Main>
            <TransactionDetailModal />
        </MyTransactionsProvider>
    )
}

