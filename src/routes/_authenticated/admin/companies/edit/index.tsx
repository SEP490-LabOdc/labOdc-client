import { createFileRoute } from '@tanstack/react-router'
import EditCompany from '@/features/admin/companies/edit'

export const Route = createFileRoute('/_authenticated/admin/companies/edit/')({
  component: EditCompany,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      id: search.id as string | undefined,
    }
  },
})
