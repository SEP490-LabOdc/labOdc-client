import { createFileRoute } from '@tanstack/react-router'
import Dashboard from "@/features/talent/dashboard";

export const Route = createFileRoute('/_authenticated/talent/')({
  component: Dashboard,
})
