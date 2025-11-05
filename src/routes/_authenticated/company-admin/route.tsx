import { createFileRoute } from '@tanstack/react-router'
import { CompanyAdminLayout } from '@/features/company-admin/layout'

export const Route = createFileRoute('/_authenticated/company-admin')({
    component: CompanyAdminLayout,
})