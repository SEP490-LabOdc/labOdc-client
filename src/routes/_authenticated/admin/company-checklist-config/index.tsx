import { createFileRoute } from '@tanstack/react-router'
import CompanyChecklistConfigPage from '@/features/admin/company-checklist-config'

export const Route = createFileRoute(
  '/_authenticated/admin/company-checklist-config/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <CompanyChecklistConfigPage />
}
