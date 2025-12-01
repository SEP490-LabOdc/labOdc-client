import { createFileRoute } from "@tanstack/react-router";
import { Settings } from '@/features/mentor/settings'

export const Route = createFileRoute('/_authenticated/mentor/settings')({
    component: Settings
})