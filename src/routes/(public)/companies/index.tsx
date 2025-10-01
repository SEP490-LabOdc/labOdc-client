import { createFileRoute } from '@tanstack/react-router'
import CompanyListPage from '@/features/companies/pages/public/CompanyListPage'


export const Route = createFileRoute('/(public)/companies/')({
    component: CompanyListPage,
})

