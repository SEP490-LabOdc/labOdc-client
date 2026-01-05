import Dashboard from "@/features/mentor/dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/_authenticated/mentor/')({
  component: Dashboard
})