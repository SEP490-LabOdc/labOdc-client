import { getRouteApi } from '@tanstack/react-router'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { CompaniesProvider } from '../components/companies-provider'
import CompanyApprovingForm from '../components/companies-approving-form'
import {
    useGetCheckList,
    useGetCompanyById,
    useGetCompanyChecklists,
} from '@/hooks/api/companies/queries'
import { ErrorView } from '@/components/admin/ErrorView'
import { StatusAlert } from '@/components/admin/StatusAlert'

const route = getRouteApi('/_authenticated/lab-admin/companies/approve/')

const ApprovingTableSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 animate-pulse">
        {/* Left column */}
        <div className="space-y-8 px-4">
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

        {/* Right column */}
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
)

export default function ApproveCompany() {
    const search = route.useSearch()
    const companyQuery = useGetCompanyById(search.id)
    const { data: companyData, isLoading: isCompanyLoading, isError: isCompanyError, error: companyError } = companyQuery

    const company = companyData?.data
    const companyId = company?.id
    const isUpdateRequired = company?.status === 'UPDATE_REQUIRED'

    // Luôn lấy checklist template
    const {
        data: baseChecklistData,
        isLoading: isChecklistLoading,
        isError: isChecklistError,
        error: checklistError,
    } = useGetCheckList()

    // Chỉ lấy checklist của company nếu cần
    const {
        data: companyChecklistData,
        isLoading: isCompanyChecklistLoading,
    } = useGetCompanyChecklists(companyId)

    // Khi một trong hai có lỗi
    if (isCompanyError || isChecklistError) {
        const message =
            companyError?.message || checklistError?.message || 'Không thể tải dữ liệu.'
        return (
            <ErrorView
                title="Lỗi Tải Dữ Liệu"
                description="Không thể kết nối đến server hoặc tải thông tin công ty/checklist."
                details={message}
            />
        )
    }

    if (isCompanyLoading || isChecklistLoading || (isUpdateRequired && isCompanyChecklistLoading)) {
        return <ApprovingTableSkeleton />
    }

    let finalChecklist = baseChecklistData?.[0]

    if (companyChecklistData?.checklists) {
        const checkedMap = new Map(
            companyChecklistData.checklists.map((item: any) => [item.id, item.checked])
        )

        finalChecklist = {
            ...finalChecklist,
            groups: finalChecklist?.groups?.map((group: any) => ({
                ...group,
                items: group.items.map((item: any) => ({
                    ...item,
                    checked: !!checkedMap.get(item.id),
                })),
            })),
        }
    }

    return (
        <CompaniesProvider>
            <>
                <Header fixed>
                    <Search />
                    <div className="ms-auto flex items-center space-x-4">
                        <ThemeSwitch />
                        <ConfigDrawer />
                        <ProfileDropdown />
                    </div>
                </Header>

                <Main>
                    <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">
                                Phê duyệt thông tin công ty
                            </h2>
                            <p className="text-muted-foreground">
                                Phê duyệt thông tin công ty tại đây. Nhấn nút phê duyệt khi bạn hoàn tất.
                            </p>
                        </div>
                    </div>

                    {company?.status === 'UPDATE_REQUIRED' && (
                        <StatusAlert
                            variant="warning"
                            title="Công ty đang trong quá trình cập nhật thông tin."
                            message="Vui lòng chờ doanh nghiệp hoàn tất các thay đổi được yêu cầu."
                            className="mb-4"
                        />
                    )}

                    <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
                        {isCompanyLoading ? (
                            <ApprovingTableSkeleton />
                        ) : (
                            <CompanyApprovingForm
                                initialData={company}
                                checkList={finalChecklist}
                            />
                        )}
                    </div>
                </Main>
            </>
        </CompaniesProvider>
    )
}
