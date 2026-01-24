import { getRouteApi } from '@tanstack/react-router'
import { Main } from '@/components/layout/main'
import { UsersDialogs } from '@/features/users/components/users-dialogs'
import { UsersProvider } from '@/features/users/components/users-provider'
import { RequestTable } from '@/features/requests/components/request-table'
import { useGetRequests } from '@/hooks/api/requests'

const route = getRouteApi('/_authenticated/lab-admin/requests/')

export default function Users() {
    const search = route.useSearch()
    const navigate = route.useNavigate()

    const { data, isLoading, isError, error } = useGetRequests({
        filters: [],
        sorts: [],
    });

    if (isLoading) return <div>Loading...</div>;

    // 3. Xử lý trạng thái Error
    if (isError) {
        return (
            <div className="flex h-screen flex-col items-center justify-center p-8">
                <h2 className="text-2xl font-bold text-red-600">Lỗi Tải Dữ Liệu</h2>
                <p className="text-muted-foreground mt-2">Không thể kết nối đến server hoặc tải danh sách công ty.</p>
                <p className="text-sm italic mt-1">Chi tiết lỗi: {error.message}</p>
            </div>
        )
    }


    const requests = data || [];

    console.log(requests);

    return (
        <UsersProvider>
            <>
                <Main>
                    <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                        <div>
                            <h2 className='text-2xl font-bold tracking-tight'>Danh sách yêu cầu</h2>
                            <p className='text-muted-foreground'>
                                Quản lý các yêu cầu tại đây.
                            </p>
                        </div>
                        <div>
                        </div>
                    </div>
                    <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                        <RequestTable data={requests} search={search} navigate={navigate} />
                    </div>
                </Main>

                <UsersDialogs />
            </>
        </UsersProvider>
    )
}