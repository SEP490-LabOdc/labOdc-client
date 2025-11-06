import Dashboard from "@/features/labAdmin/dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/_authenticated/lab-admin/')({
    component: Dashboard
})