import { createFileRoute } from '@tanstack/react-router'
import { SettingsAppearance } from '@/features/admin/settings/appearance'

export const Route = createFileRoute('/_authenticated/talent/settings/appearance')({
    component: SettingsAppearance,
})
