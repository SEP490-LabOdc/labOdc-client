import { createFileRoute } from '@tanstack/react-router'
import { CompanyLayout } from '@/features/companies/layout/company-layout'

export const Route = createFileRoute('/company')({
    component: CompanyLayout,
})