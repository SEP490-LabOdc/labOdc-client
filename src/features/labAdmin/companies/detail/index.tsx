import { ErrorView } from "@/components/admin/ErrorView"
import { Main } from "@/components/layout/main"
import { useGetCompanyById } from "@/hooks/api/companies/queries"
import { COMPANY_STATUS } from "../../../company-classic/data/schema"
import ApproveCompany from "../approve"
import { getRouteApi } from "@tanstack/react-router"
import EditCompany from "../edit"


const route = getRouteApi('/_authenticated/lab-admin/companies/$companyId/')

export default function ViewCompany() {
    const { companyId } = route.useParams()

    const companyQuery = useGetCompanyById(companyId)
    const { data: companyData, isLoading: isCompanyLoading, isError: isCompanyError, error: companyError } = companyQuery

    if (isCompanyError) {
        return (
            <ErrorView
                title="Lỗi tải dữ liệu"
                description="Không thể tải thông tin công ty."
                details={companyError?.message}
            />
        )
    }

    if (isCompanyLoading) {
        return (
            <div className="flex h-screen flex-col items-center justify-center">
                <p className="text-muted-foreground">Đang tải thông tin công ty...</p>
            </div>
        )
    }

    const company = companyData?.data

    return (
        <>
            <Main>
                <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
                    {
                        (company.status == COMPANY_STATUS.PENDING || company.status == COMPANY_STATUS.UPDATE_REQUIRED) && (
                            <ApproveCompany company={company} />
                        )
                    }
                    {
                        (company.status == COMPANY_STATUS.ACTIVE || company.status == COMPANY_STATUS.DISABLED) && (
                            <EditCompany company={company} />
                        )
                    }
                </div>
            </Main>
        </>
    )
}