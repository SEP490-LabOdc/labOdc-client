import { createFileRoute } from '@tanstack/react-router'
import ViewProject from '@/features/companyManage/project/view'

export const Route = createFileRoute('/_authenticated/company-manage/projects/view/')({
    component: ViewProject,
    validateSearch: (search) => {
        return {
            id: String(search.id ?? ''),
        }
    },
})
