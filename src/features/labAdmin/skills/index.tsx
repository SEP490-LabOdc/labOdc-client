import { getRouteApi } from '@tanstack/react-router'
import { Main } from '@/components/layout/main'
import { SkillsTable } from './components/skills-table'
import { SkillsPrimaryButtons } from './components/skills-primary-buttons'
import { useGetSkills } from '@/hooks/api/skills/queries'
import { usePopUp } from '@/hooks/usePopUp'
import type { Skill } from './data/schema'
import { SkillsCreateDialog } from './components/skills-create-dialog'
import { SkillsEditDialog } from './components/skills-edit-dialog'
import { SkillsConfirmDialog } from './components/skills-confirm-dialog'

const route = getRouteApi('/_authenticated/lab-admin/skills/')

export default function Skills() {
    const search = route.useSearch()
    const navigate = route.useNavigate()

    const { popUp, handlePopUpOpen, handlePopUpClose } = usePopUp([
        'createSkills',
        'editSkills',
        'deleteSkills',
    ] as const)

    const { data, isLoading, isError, error } = useGetSkills()

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

    const skills = data || []

    return (
        <>
            <Main>
                <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Quản lý kỹ năng</h2>
                        <p className='text-muted-foreground'>
                            Tạo và quản lý các kỹ năng trong hệ thống.
                        </p>
                    </div>
                    <SkillsPrimaryButtons onOpenCreate={() => handlePopUpOpen('createSkills')} />
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    {isLoading ? (
                        <div className='flex items-center justify-center py-12'>
                            <div className='text-muted-foreground'>Đang tải dữ liệu...</div>
                        </div>
                    ) : (
                        <SkillsTable
                            data={skills}
                            search={search}
                            navigate={navigate}
                            onOpenEdit={(skill: Skill) => handlePopUpOpen('editSkills', skill)}
                            onOpenDelete={(skill: Skill) => handlePopUpOpen('deleteSkills', skill)}
                        />
                    )}
                </div>
            </Main>

            <SkillsCreateDialog
                isOpen={popUp.createSkills.isOpen}
                onOpenChange={() => handlePopUpClose('createSkills')}
            />

            <SkillsEditDialog
                isOpen={popUp.editSkills.isOpen}
                onOpenChange={() => handlePopUpClose('editSkills')}
                skill={popUp.editSkills.data}
            />

            <SkillsConfirmDialog
                isOpen={popUp.deleteSkills.isOpen}
                onOpenChange={() => handlePopUpClose('deleteSkills')}
                skill={popUp.deleteSkills.data}
            />
        </>
    )
}

