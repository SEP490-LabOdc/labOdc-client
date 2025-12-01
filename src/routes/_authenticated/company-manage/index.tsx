import { createFileRoute } from "@tanstack/react-router";
import Dashboard from '@/features/company-manage/dashboard'

export const Route = createFileRoute('/_authenticated/company-manage/')({
    component: Dashboard
})