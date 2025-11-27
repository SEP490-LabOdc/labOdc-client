import { createFileRoute } from "@tanstack/react-router";
import { Settings } from '@/features/companyManage/settings'

export const Route = createFileRoute('/_authenticated/company-manage/settings')({
    component: Settings
})