import { AuthenticatedLayout } from "@/components/layout/authenticated-layout";
import { USER_ROLE } from "@/features/admin/users/data/schema";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute('/_authenticated/admin')({
    loader: async ({context}) => {
        const user = context.authStore.getState().auth.user;
        if(!user) {
            toast.error("Vui lòng đăng nhập để truy cập trang này");
            throw redirect({ to: '/sign-in', replace: true } );
        }

        if(USER_ROLE.LAB_ADMIN !== user?.role) {
            toast.error("Bạn không có quyền truy cập trang này");
            throw redirect({ to: '/sign-in', replace: true } );
        }
    },
    component: AuthenticatedLayout
})