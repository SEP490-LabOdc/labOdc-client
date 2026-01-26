import { getRouteApi } from '@tanstack/react-router'
import { Main } from '@/components/layout/main'
import { UsersDialogs } from '@/features/users/components/users-dialogs'
import { UsersProvider } from '@/features/users/components/users-provider'
import { UsersTable } from '@/features/users/components/users-table'
import { useGetUsers } from '@/hooks/api/users'
import { UsersImportButton } from '@/features/users/components/user-import-button'

const route = getRouteApi('/_authenticated/lab-admin/users/')

export default function Users() {
    const search = route.useSearch()
    const navigate = route.useNavigate()

    // 1. Lấy trạng thái truy vấn từ hook
    const { data, isError, error } = useGetUsers();

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

    // 4. Lấy dữ liệu khi đã thành công
    // Giả định API response có cấu trúc { data: Company[], ... }
    const users = data?.data || [];

    return (
        <UsersProvider>
            <>
                <Main>
                    <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                        <div>
                            <h2 className='text-2xl font-bold tracking-tight'>Danh sách người dùng</h2>
                            <p className='text-muted-foreground'>
                                Quản lý người dùng và phân quyền tại đây.
                            </p>
                        </div>
                        {/* <div>
                            <UsersImportButton />
                        </div> */}
                    </div>
                    <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                        <UsersTable data={users} search={search} navigate={navigate} />
                    </div>
                </Main>

                <UsersDialogs />
            </>
        </UsersProvider>
    )
}