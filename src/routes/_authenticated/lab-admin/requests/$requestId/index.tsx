import { createFileRoute } from '@tanstack/react-router'
import requestDetail from '@/features/labAdmin/requests/detail/'

export const Route = createFileRoute('/_authenticated/lab-admin/requests/$requestId/')({
  component: requestDetail,
})
