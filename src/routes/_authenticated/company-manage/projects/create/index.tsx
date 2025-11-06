import { createFileRoute } from '@tanstack/react-router'
import CreateProject from '@/features/companyManage/project/create'

export const Route = createFileRoute('/_authenticated/company-manage/projects/create/')({
    component: CreateProject,
})
