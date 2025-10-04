import { createFileRoute } from '@tanstack/react-router'
import CreateCompany from '@/features/admin/companies/create'

export const Route = createFileRoute('/_authenticated/admin/companies/create/')({
    component: CreateCompany,
})
