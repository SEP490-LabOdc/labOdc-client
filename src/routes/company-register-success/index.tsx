import { createFileRoute } from '@tanstack/react-router'
import CompanyRegisterSuccessPage from '@/features/companies/pages/public/CompanyRegisterSuccessPage'

export const Route = createFileRoute('/company-register-success/')({
  component: CompanyRegisterSuccessPage,
})
