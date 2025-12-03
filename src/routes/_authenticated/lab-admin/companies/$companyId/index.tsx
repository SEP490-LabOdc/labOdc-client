import { createFileRoute } from '@tanstack/react-router'
import ViewCompany from '@/features/labAdmin/companies/view'

export const Route = createFileRoute('/_authenticated/lab-admin/companies/$companyId/')({
    component: ViewCompany,
})