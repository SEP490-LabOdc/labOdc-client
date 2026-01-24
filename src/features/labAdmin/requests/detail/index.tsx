import { ErrorView } from "@/components/admin/ErrorView"
import { Main } from "@/components/layout/main"
import { getRouteApi, useNavigate } from "@tanstack/react-router"
import { useGetRequestDetail } from "@/hooks/api/requests"
import { REQUEST_TYPE } from "@/features/requests/data/schema"
import { UpdateCompanyRequestDetail } from "@/features/requests/components/update-company-detail"
import { Button } from "@/components/ui/button"
import { getRoleBasePath } from "@/lib/utils"
import { useUser } from "@/context/UserContext"


const route = getRouteApi('/_authenticated/lab-admin/requests/$requestId/')

export default function RequestDetail() {
    const { requestId } = route.useParams();
    const navigate = useNavigate();
    const { user } = useUser();

    const companyQuery = useGetRequestDetail(requestId)
    const { data: requestData, isLoading: isCompanyLoading, isError: isCompanyError, error: companyError } = companyQuery

    if (isCompanyError) {
        return (
            <ErrorView
                title="Lỗi tải dữ liệu"
                description="Không thể tải thông tin yêu cầu."
                details={companyError?.message}
            />
        )
    }

    if (isCompanyLoading) {
        return (
            <div className="flex h-screen flex-col items-center justify-center">
                <p className="text-muted-foreground">Đang tải thông tin yêu cầu..</p>
            </div>
        )
    }

    console.log(requestData);

    return (
        <>
            <Main>
                <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Chi tiết yêu cầu</h2>
                        <p className='text-muted-foreground'>
                            Xem xét yêu cầu tại đây.
                        </p>
                    </div>
                    <div>
                    </div>
                </div>
                <div className="mx-5 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
                    {
                        requestData?.requestType == REQUEST_TYPE.UPDATE_COMPANY && <UpdateCompanyRequestDetail requestData={requestData} />
                    }
                </div>

                <div className="flex gap-2">
                    <div className="pt-4 md:col-span-2 flex gap-3">
                        <Button type="button" >
                            Phê duyệt
                        </Button>
                        <Button type="button">
                            Từ chối
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate({ to: getRoleBasePath(user.role) + '/requests' })}
                        >
                            Quay về danh sách
                        </Button>
                    </div>
                </div>
            </Main>


        </>
    )
}