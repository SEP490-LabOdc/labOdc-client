import { createFileRoute } from '@tanstack/react-router'
import CompanyListPage from '@/features/companies/public/pages/CompanyListPage'


export const Route = createFileRoute('/(public)/companies/')({
    component: CompanyListPage,
})

