import ComingSoon from "@/components/coming-soon";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/(errors)/403')({
    component: ComingSoon
})