import { createFileRoute } from '@tanstack/react-router'
import CompanySignUpPage from '@/features/companies/public/pages/CompanySignUpPage'

export const Route = createFileRoute('/company/')({
    component: CompanySignUpPage,
})

