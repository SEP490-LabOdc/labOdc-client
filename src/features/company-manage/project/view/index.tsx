import { getRouteApi } from '@tanstack/react-router'
import { Main } from '@/components/layout/main'
import { ErrorView } from '@/components/admin/ErrorView'
import ProjectForm from '../components/project-form'
import { useGetProjectById } from '@/hooks/api/projects'
import { PROJECT_STATUS } from '../data/schema'
import { StatusAlert } from '@/components/admin/StatusAlert'
import ProjectDetailPage from '@/features/projects/project-detail'
import { Spinner } from '@/components/ui/spinner'

const route = getRouteApi('/_authenticated/company-manage/projects/$projectId/')

export default function ViewProject() {
    const { projectId } = route.useParams()

    const {
        data: projectData,
        isLoading,
        isError,
        error,
    } = useGetProjectById(projectId)

    if (isError) {
        return (
            <ErrorView
                title="Lỗi tải dữ liệu"
                description="Không thể tải thông tin dự án."
                details={error?.message}
            />
        )
    }

    if (isLoading) {
        return (
            <div className="flex h-screen flex-col items-center justify-center">
                <Spinner className="h-32 w-32" />
            </div>
        )
    }

    const project = projectData?.data

    return (
        <>
            <Main>
                {project?.status === PROJECT_STATUS.PENDING && (
                    <StatusAlert
                        variant="info"
                        title="Dự án đang chờ phê duyệt"
                        message="Dự án đang chờ Lab Admin xem xét và phê duyệt. Vui lòng quay lại sau."
                        className="mb-4"
                    />
                )}

                {project?.status === PROJECT_STATUS.UPDATE_REQUIRED && (
                    <StatusAlert
                        variant="warning"
                        title="Cần cập nhật thông tin"
                        message="Dự án cần được doanh nghiệp cập nhật thông tin theo yêu cầu. Vui lòng chờ doanh nghiệp hoàn tất."
                        className="mb-4"
                    />
                )}

                {project?.status === PROJECT_STATUS.REJECTED && (
                    <StatusAlert
                        variant="error"
                        title="Dự án đã bị từ chối"
                        message="Dự án này đã bị từ chối và không thể chỉnh sửa thêm."
                        className="mb-4"
                    />
                )}
                {project?.status === PROJECT_STATUS.PLANNING && (
                    <StatusAlert
                        variant="info"
                        title="Đang xây dựng kế hoạch dự án"
                        message="Mentor đang trong quá trình hoàn thiện kế hoạch thực hiện dự án."
                    />
                )}
                {
                    (project.status == PROJECT_STATUS.PENDING || project.status == PROJECT_STATUS.UPDATE_REQUIRED) && (
                        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
                            <ProjectForm initialData={project} />
                        </div>

                    )
                }
                {
                    (project.status !== PROJECT_STATUS.PENDING && project.status !== PROJECT_STATUS.UPDATE_REQUIRED) && (
                        <ProjectDetailPage />
                    )
                }
            </Main>
        </>
    )
}