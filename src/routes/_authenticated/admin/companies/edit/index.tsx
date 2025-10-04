import { createFileRoute } from '@tanstack/react-router'
import EditCompany from '@/features/admin/companies/edit'
import type { Company } from '@/features/admin/companies/data/schema'

export const Route = createFileRoute('/_authenticated/admin/companies/edit/')({
  component: EditCompany,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      user: search.user as Company | undefined,
    }
  },
})
