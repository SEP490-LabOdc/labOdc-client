import { createFileRoute } from '@tanstack/react-router'
import CompanySignInPage from '@/features/companies/pages/public/CompanySignInPage'

export const Route = createFileRoute('/company-login/')({
  component: CompanySignInPage,
})

