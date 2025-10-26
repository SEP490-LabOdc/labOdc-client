import { createFileRoute } from '@tanstack/react-router'
import {
  CompanyRegisterUpdatePage,
} from '@/features/companies/pages/public/CompanyRegisterUpdatePage'
import z from 'zod'

const CompanyQueryParamsSchema = z.object({
  companyId: z.string().catch('')
});

export const Route = createFileRoute('/company-register/update')({
  component: CompanyRegisterUpdatePage,
  validateSearch: (search) => CompanyQueryParamsSchema.parse(search),
})

