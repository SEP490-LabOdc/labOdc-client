import { createFileRoute } from '@tanstack/react-router'
import EditCompany from '@/features/labAdmin/companies/edit'

export const Route = createFileRoute('/_authenticated/lab-admin/companies/edit/')({
  component: EditCompany,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      id: search.id as string | undefined,
    }
  },
})
