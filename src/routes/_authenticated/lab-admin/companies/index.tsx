import { createFileRoute } from '@tanstack/react-router'
import Company from '@/features/labAdmin/companies'

export const Route = createFileRoute('/_authenticated/lab-admin/companies/')({
  component: Company,
})
