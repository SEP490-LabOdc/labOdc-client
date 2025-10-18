import { getRouteApi } from '@tanstack/react-router'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { CompaniesProvider } from '../components/companies-provider'
import CompanyApprovingForm from '../components/companies-approving-form'
import { useGetCheckList, useGetCompanyById } from '@/hooks/api/companies/queries'

const route = getRouteApi('/_authenticated/admin/companies/approve/');

const ApprovingTableSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 animate-pulse">
        {/* --- CỘT TRÁI: Thông tin công ty & người liên hệ --- */}
        <div className="space-y-8 px-4">
            {/* Thông tin công ty */}
            <div className="p-3 mb-0">
                <div className="h-4 w-1/3 bg-muted rounded mb-4"></div>
                <div className="space-y-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="h-4 w-40 bg-muted rounded"></div>
                            <div className="flex-1 h-9 bg-muted rounded"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Thông tin người liên hệ */}
            <div className="p-3">
                <div className="h-4 w-1/3 bg-muted rounded mb-4"></div>
                <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="h-4 w-40 bg-muted rounded"></div>
                            <div className="flex-1 h-9 bg-muted rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* --- CỘT PHẢI: Checklist xác thực --- */}
        <div className="px-12">
            <div className="rounded-lg border bg-card p-6 shadow-sm space-y-4">
                <div className="h-5 w-1/2 bg-muted rounded"></div>
                <div className="space-y-4">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <div className="h-5 w-5 bg-muted rounded"></div>
                            <div className="space-y-2 flex-1">
                                <div className="h-4 w-1/3 bg-muted rounded"></div>
                                <div className="h-3 w-3/4 bg-muted rounded"></div>
                                <div className="h-3 w-2/3 bg-muted rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="h-9 w-40 bg-muted rounded"></div>
            </div>
        </div>
    </div>
);

export default function ApproveCompany() {
    const search = route.useSearch();

    const {
        data: companyData,
        isLoading: isCompanyLoading,
        isError: isCompanyError,
        error: companyError,
    } = useGetCompanyById(search.id);

    const {
        data: checklistData,
        isLoading: isChecklistLoading,
        isError: isChecklistError,
        error: checklistError,
    } = useGetCheckList();

    if (isCompanyError || isChecklistError) {
        const message =
            companyError?.message || checklistError?.message || "Không thể tải dữ liệu.";
        return (
            <div className="flex h-screen flex-col items-center justify-center p-8">
                <h2 className="text-2xl font-bold text-red-600">Lỗi Tải Dữ Liệu</h2>
                <p className="text-muted-foreground mt-2">
                    Không thể kết nối đến server hoặc tải thông tin công ty/checklist.
                </p>
                <p className="text-sm italic mt-1">Chi tiết lỗi: {message}</p>
            </div>
        );
    }

    if (isCompanyLoading || isChecklistLoading) {
        return <ApprovingTableSkeleton />;
    }

    // Dữ liệu hợp lệ
    const company = companyData?.data;
    const checklist = checklistData[0];

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

                        {/* 5. Điều kiện hóa: Nếu đang tải, hiển thị Skeleton, ngược lại hiển thị Bảng */}
                        {isCompanyLoading ? (
                            <ApprovingTableSkeleton />
                        ) : (
                            <CompanyApprovingForm initialData={company} checkList={checklist} />
                        )}
                    </div>
                </Main>
            </>
        </CompaniesProvider>
    )
}