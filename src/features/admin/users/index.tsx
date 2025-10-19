import { getRouteApi } from '@tanstack/react-router'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { UsersDialogs } from './components/users-dialogs'
import { UsersPrimaryButtons } from './components/users-primary-buttons'
import { UsersProvider } from './components/users-provider'
import { UsersTable } from './components/users-table'
import { useGetUsers } from '@/hooks/api/users'

const route = getRouteApi('/_authenticated/admin/users/')

export default function Users() {
    const search = route.useSearch()
    const navigate = route.useNavigate()


    // 1. Lấy trạng thái truy vấn từ hook
    const { data, isLoading, isError, error } = useGetUsers();

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

    console.log(users);
    console.log(isLoading);

    return (
        <UsersProvider>
            <>
                <Header fixed>
                    <Search />
                    <div className='ms-auto flex items-center space-x-4'>
                        <ThemeSwitch />
                        <ConfigDrawer />
                        <ProfileDropdown />
                    </div>
                </Header>

                <Main>
                    <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                        <div>
                            <h2 className='text-2xl font-bold tracking-tight'>Danh sách người dùng</h2>
                            <p className='text-muted-foreground'>
                                Quản lý người dùng và phân quyền tại đây.
                            </p>
                        </div>
                        <UsersPrimaryButtons />
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