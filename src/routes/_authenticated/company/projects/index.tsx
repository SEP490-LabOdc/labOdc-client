// src/routes/_authenticated/company/projects/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { CompanyProjectListPage } from '@/features/company-admin/projects/list'

export const Route = createFileRoute('/_authenticated/company/projects/')({
    component: CompanyProjectListPage,
})