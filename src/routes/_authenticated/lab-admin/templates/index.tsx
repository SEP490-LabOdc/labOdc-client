import { createFileRoute } from '@tanstack/react-router'
import TemplatesManagementPage from '@/features/labAdmin/templates'

export const Route = createFileRoute('/_authenticated/lab-admin/templates/')({
    component: TemplatesManagementPage,
})

