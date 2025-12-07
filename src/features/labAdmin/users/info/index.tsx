import { getRouteApi, useNavigate } from '@tanstack/react-router'
import { Main } from '@/components/layout/main'
import { useGetUserById } from '@/hooks/api/users'
import { ErrorView } from '@/components/admin/ErrorView'
import { getRoleBasePath } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import UserProfileView from '../components/user-profile-view'
// import { UsersDialogs } from './components/users-dialogs'
// import { UsersProvider } from './components/users-provider'
// import { UsersTable } from './components/users-table'
// import { users } from '../data/users'

const route = getRouteApi('/_authenticated/lab-admin/users/$userId/')

export default function EditUser() {
    const navigate = useNavigate()
    const param = route.useParams();
    const userId = param.userId ?? null;
    // const navigate = route.useNavigate()

    const handleGoBack = () => {
        // Try to go back in history, if no history, navigate to projects list
        if (window.history.length > 1) {
            history.go(-1)
        } else {
            navigate({ to: `${getRoleBasePath(user?.role)}/users` })
        }
    }

    const {
        data: userData,
        isLoading,
        isError,
        error,
    } = useGetUserById(userId);

    if (isError) {
        return (
            <ErrorView
                title="Lỗi tải dữ liệu"
                description="Không thể tải thông tin người dùng cần chỉnh sửa."
                details={error?.message}
            />
        )
    }

    if (isLoading) {
        return (
            <div >
            </div>
        )
    }

    const user = userData?.data;

    return (
        <>
            <Main>
                <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleGoBack}
                        className="hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                    >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Quay lại
                    </Button>
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <UserProfileView user={user} />
                </div>
            </Main>
        </>
    )
}