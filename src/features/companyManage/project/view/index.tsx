import { getRouteApi } from '@tanstack/react-router'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ErrorView } from '@/components/admin/ErrorView'
import ProjectForm from '../components/project-form'
import { useGetProjectById } from '@/hooks/api/projects'

const route = getRouteApi('/_authenticated/company-manage/projects/view/')

export default function ViewProject() {
    const search = route.useSearch()
    const projectId = search.id

    const {
        data: projectData,
        isLoading,
        isError,
        error,
    } = useGetProjectById(projectId)

    if (isError) {
        return (
            <ErrorView
                title="Lỗi tải dữ liệu"
                description="Không thể tải thông tin dự án."
                details={error?.message}
            />
        )
    }

    if (isLoading) {
        return (
            <div className="flex h-screen flex-col items-center justify-center">
                <p className="text-muted-foreground">Đang tải thông tin dự án...</p>
            </div>
        )
    }

    const project = projectData?.data

    return (
        <>
            <Header fixed>
                <Search />
                <div className="ms-auto flex items-center space-x-4">
                    <ThemeSwitch />
                    <ConfigDrawer />
                    <ProfileDropdown />
                </div>
            </Header>

            <Main>
                <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            Thông tin dự án
                        </h2>
                        <p className="text-muted-foreground">
                            Xem chi tiết dự án tại đây.
                        </p>
                    </div>
                </div>

                <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <ProjectForm initialData={project} />
                </div>
            </Main>
        </>
    )
}