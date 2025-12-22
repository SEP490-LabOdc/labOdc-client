import { getRouteApi } from '@tanstack/react-router'
import { Main } from '@/components/layout/main'
import { SkillsDialogs } from './components/skills-dialogs'
import { SkillsProvider } from './components/skills-provider'
import { SkillsTable } from './components/skills-table'
import { SkillsPrimaryButtons } from './components/skills-primary-buttons'
import { useGetSkills } from '@/hooks/api/skills/queries'

const route = getRouteApi('/_authenticated/lab-admin/skills/')

export default function Skills() {
    const search = route.useSearch()
    const navigate = route.useNavigate()

    // Lấy dữ liệu từ API
    const { data, isLoading, isError, error } = useGetSkills()

    // Xử lý trạng thái Error
    if (isError) {
        return (
            <div className="flex h-screen flex-col items-center justify-center p-8">
                <h2 className="text-2xl font-bold text-red-600">Lỗi Tải Dữ Liệu</h2>
                <p className="text-muted-foreground mt-2">
                    Không thể kết nối đến server hoặc tải danh sách kỹ năng.
                </p>
                <p className="text-sm italic mt-1">Chi tiết lỗi: {error?.message}</p>
            </div>
        )
    }

    // Lấy dữ liệu khi đã thành công
    const skills = data || []

    return (
        <SkillsProvider>
            <>
                <Main>
                    <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                        <div>
                            <h2 className='text-2xl font-bold tracking-tight'>Quản lý kỹ năng</h2>
                            <p className='text-muted-foreground'>
                                Tạo và quản lý các kỹ năng trong hệ thống.
                            </p>
                        </div>
                        <SkillsPrimaryButtons />
                    </div>
                    <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                        {isLoading ? (
                            <div className='flex items-center justify-center py-12'>
                                <div className='text-muted-foreground'>Đang tải dữ liệu...</div>
                            </div>
                        ) : (
                            <SkillsTable data={skills} search={search} navigate={navigate} />
                        )}
                    </div>
                </Main>

                <SkillsDialogs />
            </>
        </SkillsProvider>
    )
}

