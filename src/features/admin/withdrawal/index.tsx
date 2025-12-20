import { getRouteApi } from '@tanstack/react-router'
import { Main } from '@/components/layout/main'
import { WithdrawalDialogs } from './components/withdrawal-dialogs'
import { WithdrawalProvider } from './components/withdrawal-provider'
import { WithdrawalTable } from './components/withdrawal-table'
import { useGetWithdrawalRequests } from '@/hooks/api/withdrawal/queries'
import { ErrorView } from '@/components/admin/ErrorView'

const route = getRouteApi('/_authenticated/admin/withdrawal/')

export default function Withdrawal() {
    const search = route.useSearch()
    const navigate = route.useNavigate()

    // Lấy dữ liệu từ API
    const { data, isLoading, isError, error } = useGetWithdrawalRequests()

    // Xử lý trạng thái Error
    if (isError) {
        return (
            <ErrorView
                title="Lỗi Tải Dữ Liệu"
                description="Không thể kết nối đến server hoặc tải danh sách yêu cầu rút tiền."
                details={error?.message}
            />
        )
    }

    // Lấy dữ liệu khi đã thành công
    const withdrawalRequests = data?.content || []

    return (
        <WithdrawalProvider>
            <>
                <Main>
                    <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                        <div>
                            <h2 className='text-2xl font-bold tracking-tight'>Quản lý yêu cầu rút tiền</h2>
                            <p className='text-muted-foreground'>
                                Xem và xử lý các yêu cầu rút tiền từ người dùng.
                            </p>
                        </div>
                    </div>
                    <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                        {isLoading ? (
                            <div className='flex items-center justify-center py-12'>
                                <div className='text-muted-foreground'>Đang tải dữ liệu...</div>
                            </div>
                        ) : (
                            <WithdrawalTable data={withdrawalRequests} search={search} navigate={navigate} />
                        )}
                    </div>
                </Main>

                <WithdrawalDialogs />
            </>
        </WithdrawalProvider>
    )
}

