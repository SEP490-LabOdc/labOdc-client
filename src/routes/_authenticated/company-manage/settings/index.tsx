import { createFileRoute } from '@tanstack/react-router'
import { SettingsProfile } from '@/features/admin/settings/components/settingProfile'

export const Route = createFileRoute('/_authenticated/company-manage/settings/')({
  component: SettingsProfile,
})
