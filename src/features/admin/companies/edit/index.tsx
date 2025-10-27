import { getRouteApi } from '@tanstack/react-router'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { CompaniesProvider } from '../components/companies-provider'
import CompanyForm from '../components/companies-forms'
import { useGetCompanyById } from '@/hooks/api/companies/queries'
import { ErrorView } from '@/components/admin/ErrorView'


const route = getRouteApi('/_authenticated/admin/companies/edit/')

export default function EditCompany() {
    const search = route.useSearch()
    const companyId = search.id;
    // const navigate = route.useNavigate()
    const {
        data: companyData,
        isLoading,
        isError,
        error,
    } = useGetCompanyById(companyId)

    if (isError) {
        return (
            <ErrorView
                title="Lỗi tải dữ liệu"
                description="Không thể tải thông tin công ty cần chỉnh sửa."
                details={error?.message}
            />
        )
    }

    if (isLoading) {
        return (
            <div className="flex h-screen flex-col items-center justify-center">
                <p className="text-muted-foreground">Đang tải thông tin công ty...</p>
            </div>
        )
    }

    const company = companyData?.data;

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
                            <h2 className='text-2xl font-bold tracking-tight'>Thông tin công ty</h2>
                            <p className='text-muted-foreground'>
                                Thay đổi thông tin công ty tại đây. Nhấn lưu khi bạn hoàn tất.
                            </p>
                        </div>
                    </div>
                    <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                        <CompanyForm mode='edit' initialData={company} />
                    </div>
                </Main>
            </>
        </CompaniesProvider>
    )
}