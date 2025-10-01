import { createFileRoute, Outlet } from "@tanstack/react-router";

const RouteComponent = () => <Outlet />

export const Route = createFileRoute('/(public)/companies')({
    component: RouteComponent,
    loader: () => {
        return {
            crumb: 'Danh sách công ty'
        }
    }
})