import { Main } from '@/components/layout/main'
import ProjectForm from '../components/project-create-form'

export default function CreateProject() {

    return (
        <>
            <Main>
                <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Thêm dự án Mới</h2>
                        <p className='text-muted-foreground'>
                            Tạo dự án mới tại đây. Nhấn lưu khi bạn hoàn tất.
                        </p>
                    </div>
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <ProjectForm mode="create" />
                </div>
            </Main>
        </>
    )
}