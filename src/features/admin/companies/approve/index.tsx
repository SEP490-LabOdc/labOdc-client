import { getRouteApi } from '@tanstack/react-router'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { CompaniesProvider } from '../components/companies-provider'
import CompanyApprovingForm from '../components/companies-approving-form'

const route = getRouteApi('/_authenticated/admin/companies/approve/')

export default function ApproveCompany() {
    const search = route.useSearch()
    // const navigate = route.useNavigate()

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
                            <h2 className='text-2xl font-bold tracking-tight'>Phê duyệt thông tin công ty</h2>
                            <p className='text-muted-foreground'>
                                Phê duyệt thông tin công ty tại đây. Nhấn nút phê duyệt khi bạn hoàn tất.
                            </p>
                        </div>
                    </div>
                    <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                        <CompanyApprovingForm initialData={search?.company} />
                    </div>
                </Main>
            </>
        </CompaniesProvider>
    )
}