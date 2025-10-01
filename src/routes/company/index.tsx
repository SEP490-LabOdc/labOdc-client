import { createFileRoute } from '@tanstack/react-router'
import CompanySignUpPage from '@/features/companies/pages/public/CompanySignUpPage'

export const Route = createFileRoute('/company/')({
    component: CompanySignUpPage,
})

