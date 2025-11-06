
import { createFileRoute } from '@tanstack/react-router'
import { CompanyProjectDetailPage } from '@/features/company-admin/projects/detail'

export const Route = createFileRoute('/_authenticated/company-admin/projects/$projectId/')({
    component: CompanyProjectDetailPage,
    // TODO: Thêm loader để fetch data chi tiết
    // loader: ({ params }) => fetchProjectDetails(params.projectId),
})