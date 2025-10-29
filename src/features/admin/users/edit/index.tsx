import { getRouteApi } from '@tanstack/react-router'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import UsersForm from '../components/users-forms'
import { useGetUserById } from '@/hooks/api/users'
import { ErrorView } from '@/components/admin/ErrorView'
// import { UsersDialogs } from './components/users-dialogs'
// import { UsersProvider } from './components/users-provider'
// import { UsersTable } from './components/users-table'
// import { users } from '../data/users'

const route = getRouteApi('/_authenticated/admin/users/edit/')

export default function EditUser() {
    const search = route.useSearch();
    const userId = search.id ?? null;
    // const navigate = route.useNavigate()

    const {
        data: userData,
        isLoading,
        isError,
        error,
    } = useGetUserById(userId);

    if (isError) {
        return (
            <ErrorView
                title="Lỗi tải dữ liệu"
                description="Không thể tải thông tin người dùng cần chỉnh sửa."
                details={error?.message}
            />
        )
    }

    if (isLoading) {
        return (
            <div >
            </div>
        )
    }

    const user = userData?.data;

    return (
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
                        <h2 className='text-2xl font-bold tracking-tight'>Chỉnh sửa thông tin người dùng</h2>
                        <p className='text-muted-foreground'>
                            Thay đổi thông tin người dùng tại đây. Nhấn lưu khi bạn hoàn tất.
                        </p>
                    </div>
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <UsersForm mode="edit" initialData={user} />
                </div>
            </Main>
        </>
    )
}