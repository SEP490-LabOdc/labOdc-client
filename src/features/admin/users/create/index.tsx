import { Main } from '@/components/layout/main'
import UsersForm from '../../../users/components/users-forms'

export default function CreateUser() {

    return (
        <>
            <Main>
                <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Thêm Người dùng Mới</h2>
                        <p className='text-muted-foreground'>
                            Tạo người dùng mới tại đây. Nhấn lưu khi bạn hoàn tất.
                        </p>
                    </div>
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <UsersForm mode="create" />
                </div>
            </Main>
        </>
    )
}