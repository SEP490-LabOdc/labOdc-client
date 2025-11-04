// src/routes/_authenticated/company/projects/create/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { CompanyProjectCreatePage } from '@/features/company-admin/projects/create'

export const Route = createFileRoute('/_authenticated/company/projects/create/')({
    component: CompanyProjectCreatePage,
})
