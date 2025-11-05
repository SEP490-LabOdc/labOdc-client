import Dashboard from "@/features/companyManager/dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/_authenticated/company-manager/')({
    component: Dashboard
})