import { PublicLayout } from '@/components/layout/public-layout'
import { USER_ROLE } from '@/features/admin/users/data/schema';
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)')({
    loader: async ({context}) => {
        const user = context.authStore.getState().auth.user;
        switch (user?.role) {
            case USER_ROLE.LAB_ADMIN:
                throw redirect({to: '/admin', replace: true});
            case USER_ROLE.USER:
                throw redirect({to: '/', replace: true});
        }
    },  
  component: PublicLayout,
})
