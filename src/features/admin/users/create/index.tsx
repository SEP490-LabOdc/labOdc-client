// import { getRouteApi } from '@tanstack/react-router'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import UsersForm from '../components/users-forms'
// import { UsersDialogs } from './components/users-dialogs'
// import { UsersProvider } from './components/users-provider'
// import { UsersTable } from './components/users-table'
// import { users } from './data/users'

// const route = getRouteApi('/_authenticated/admin/users/create/')

export default function CreateUser() {
    // const search = route.useSearch()
    // const navigate = route.useNavigate()

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
                        <h2 className='text-2xl font-bold tracking-tight'>Thêm Người dùng Mới</h2>
                        <p className='text-muted-foreground'>
                            Tạo người dùng mới tại đây. Nhấn lưu khi bạn hoàn tất.
                        </p>
                    </div>
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <UsersForm mode="create" />
                </div>
            </Main>
        </>
    )
}