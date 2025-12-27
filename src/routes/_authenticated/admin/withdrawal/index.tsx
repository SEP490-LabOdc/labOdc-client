import Withdrawal from '@/features/admin/withdrawal'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/admin/withdrawal/')({
  component: Withdrawal,
})
