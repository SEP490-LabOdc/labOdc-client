import { getRouteApi } from '@tanstack/react-router'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { CompaniesProvider } from '../components/companies-provider'
import { CompaniesPrimaryButtons } from '../components/companies-primary-buttons'
import { CompaniesTable } from '../components/companies-table'
import { companies } from '../data/companies'
import CompanyForm from '../components/companies-forms'


const route = getRouteApi('/_authenticated/admin/companies/create/')

export default function CreateCompany() {
    const search = route.useSearch()
    const navigate = route.useNavigate()

    return (
        <CompaniesProvider>
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
                            <h2 className='text-2xl font-bold tracking-tight'>Thêm công ty Mới</h2>
                            <p className='text-muted-foreground'>
                                Tạo công ty mới tại đây. Nhấn lưu khi bạn hoàn tất.
                            </p>
                        </div>
                        <CompaniesPrimaryButtons />
                    </div>
                    <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                        <CompanyForm mode='create' />
                    </div>
                </Main>
            </>
        </CompaniesProvider>
    )
}