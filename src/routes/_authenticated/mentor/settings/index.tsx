import { createFileRoute } from '@tanstack/react-router'
import { SettingsProfile } from '@/features/settings/components/settingProfile'

export const Route = createFileRoute('/_authenticated/mentor/settings/')({
  component: SettingsProfile,
})
