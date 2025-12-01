import { createFileRoute } from '@tanstack/react-router'
import { SettingsAccount } from '@/features/admin/settings/account'

export const Route = createFileRoute('/_authenticated/company-manage/settings/account')({
  component: SettingsAccount,
})
