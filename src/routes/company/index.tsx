import { createFileRoute } from '@tanstack/react-router'
import CompanyLandingPage from '@/features/companies/pages/public/CompanyLandingPage'

export const Route = createFileRoute('/company/')({
    component: CompanyLandingPage,
})

