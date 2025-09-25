import { createFileRoute } from '@tanstack/react-router'
import { CompanyLayout } from '@/components/layout/company-layout'

export const Route = createFileRoute('/company')({
    component: CompanyLayout,
})