import { createFileRoute } from '@tanstack/react-router'
import VerifyOtpPage from '@/features/companies/pages/public/CompanyOtpPage'
export const Route = createFileRoute('/verify-otp')({
  component: VerifyOtpPage,
})