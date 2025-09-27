import { createFileRoute } from '@tanstack/react-router'
import Company from '@/features/admin/companies'

export const Route = createFileRoute('/_authenticated/admin/companies/')({
  component: Company,
})
