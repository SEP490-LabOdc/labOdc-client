// src/routes/_authenticated/company/route.tsx
import { Outlet, createFileRoute } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'

// Layout này sẽ bảo vệ tất cả các route con bên trong /_authenticated/company
export const Route = createFileRoute('/_authenticated/company')({
    component: CompanyAdminLayoutComponent,
})

function CompanyAdminLayoutComponent() {
    // TODO: Thêm logic kiểm tra role 'COMPANY_ADMIN' ở đây nếu cần
    // const { auth } = useAuth()
    // if (auth.user.role !== 'COMPANY_ADMIN') { ... }

    return (
        <AuthenticatedLayout>
            <Outlet />
        </AuthenticatedLayout>
    )
}