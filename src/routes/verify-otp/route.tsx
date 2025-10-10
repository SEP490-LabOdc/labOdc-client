import { createFileRoute } from '@tanstack/react-router'
import VerifyOtpPage from '@/features/companies/pages/public/CompanyOtpPage'
import z from 'zod'

const verifyOtpSearchSchema = z.object({
  companyEmail: z.email().catch('')
});

export const Route = createFileRoute('/verify-otp')({
  component: VerifyOtpPage,
  validateSearch: (search) => verifyOtpSearchSchema.parse(search),
})