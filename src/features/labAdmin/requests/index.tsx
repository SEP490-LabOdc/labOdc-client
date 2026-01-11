import { getRouteApi } from '@tanstack/react-router'
import { Main } from '@/components/layout/main'
import { UsersDialogs } from '@/features/users/components/users-dialogs'
import { UsersProvider } from '@/features/users/components/users-provider'
import { RequestTable } from '@/features/requests/components/request-table'
import type { RequestList } from '@/features/requests/data/schema'

const route = getRouteApi('/_authenticated/lab-admin/requests/')

export const mockRequests: RequestList = [
    {
        id: '1',
        code: '00000001',
        requestType: 'UPDATE_USER',
        targetName: 'Nguyễn Văn A',
        createdByName: 'Nguyễn Văn A',
        status: 'PENDING',
        processedByName: null,
        note: 'Cập nhật số điện thoại',
        createdAt: new Date('2025-12-01T08:30:00'),
        updatedAt: new Date('2025-12-01T08:30:00'),
    },
    {
        id: '2',
        code: '00000002',
        requestType: 'UPDATE_COMPANY',
        targetName: 'Công ty TNHH ABC',
        createdByName: 'Lê Kim Bảo Nhật',
        status: 'APPROVED',
        processedByName: 'Admin Lab',
        note: 'Cập nhật địa chỉ công ty',
        createdAt: new Date('2025-12-02T09:15:00'),
        updatedAt: new Date('2025-12-02T10:00:00'),
    },
    {
        id: '3',
        code: '00000003',
        requestType: 'UPDATE_USER',
        targetName: 'Trần Quốc Bảo',
        createdByName: 'Trần Quốc Bảo',
        status: 'REJECTED',
        processedByName: 'Admin Lab',
        note: 'Cập nhật email',
        createdAt: new Date('2025-12-03T14:20:00'),
        updatedAt: new Date('2025-12-03T15:00:00'),
    },
    {
        id: '4',
        code: '00000004',
        requestType: 'UPDATE_COMPANY',
        targetName: 'Công ty Cổ phần XYZ',
        createdByName: 'Nguyễn Minh Hoàng',
        status: 'PENDING',
        processedByName: null,
        note: null,
        createdAt: new Date('2025-12-04T11:45:00'),
        updatedAt: new Date('2025-12-04T11:45:00'),
    },
    {
        id: '5',
        code: '00000005',
        requestType: 'UPDATE_USER',
        targetName: 'Phạm Thanh Sơn',
        createdByName: 'Phạm Thanh Sơn',
        status: 'APPROVED',
        processedByName: 'Admin Lab',
        note: 'Cập nhật ảnh đại diện',
        createdAt: new Date('2025-12-05T08:10:00'),
        updatedAt: new Date('2025-12-05T09:00:00'),
    },
    {
        id: '6',
        code: '00000006',
        requestType: 'UPDATE_COMPANY',
        targetName: 'Công ty TNHH Giải Pháp Số',
        createdByName: 'Lê Phương Anh',
        status: 'REJECTED',
        processedByName: 'Admin Lab',
        note: 'Cập nhật người liên hệ',
        createdAt: new Date('2025-12-05T13:30:00'),
        updatedAt: new Date('2025-12-05T14:10:00'),
    },
    {
        id: '7',
        code: '00000007',
        requestType: 'UPDATE_USER',
        targetName: 'Đặng Nhật Huy',
        createdByName: 'Đặng Nhật Huy',
        status: 'PENDING',
        processedByName: null,
        note: 'Cập nhật ngày sinh',
        createdAt: new Date('2025-12-06T09:00:00'),
        updatedAt: new Date('2025-12-06T09:00:00'),
    },
    {
        id: '8',
        code: '00000008',
        requestType: 'UPDATE_COMPANY',
        targetName: 'Công ty TNHH Dịch Vụ IT',
        createdByName: 'Trần Quốc Bảo',
        status: 'APPROVED',
        processedByName: 'Admin Lab',
        note: null,
        createdAt: new Date('2025-12-06T10:40:00'),
        updatedAt: new Date('2025-12-06T11:30:00'),
    },
    {
        id: '9',
        code: '00000009',
        requestType: 'UPDATE_USER',
        targetName: 'Nguyễn Bình An',
        createdByName: 'Nguyễn Bình An',
        status: 'REJECTED',
        processedByName: 'Admin Lab',
        note: 'Cập nhật họ tên',
        createdAt: new Date('2025-12-07T15:20:00'),
        updatedAt: new Date('2025-12-07T16:00:00'),
    },
    {
        id: '10',
        code: '00000010',
        requestType: 'UPDATE_COMPANY',
        targetName: 'Công ty Cổ phần Công Nghệ Trẻ',
        createdByName: 'Nguyễn Minh Hoàng',
        status: 'PENDING',
        processedByName: null,
        note: 'Cập nhật số điện thoại công ty',
        createdAt: new Date('2025-12-08T08:50:00'),
        updatedAt: new Date('2025-12-08T08:50:00'),
    },
]


export default function Users() {
    const search = route.useSearch()
    const navigate = route.useNavigate()

    // // 1. Lấy trạng thái truy vấn từ hook
    // const { data, isError, error } = useGetUsers();

    // // 3. Xử lý trạng thái Error
    // if (isError) {
    //     return (
    //         <div className="flex h-screen flex-col items-center justify-center p-8">
    //             <h2 className="text-2xl font-bold text-red-600">Lỗi Tải Dữ Liệu</h2>
    //             <p className="text-muted-foreground mt-2">Không thể kết nối đến server hoặc tải danh sách công ty.</p>
    //             <p className="text-sm italic mt-1">Chi tiết lỗi: {error.message}</p>
    //         </div>
    //     )
    // }

    // 4. Lấy dữ liệu khi đã thành công
    // Giả định API response có cấu trúc { data: Company[], ... }
    // const users = data?.data || [];

    return (
        <UsersProvider>
            <>
                <Main>
                    <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                        <div>
                            <h2 className='text-2xl font-bold tracking-tight'>Danh sách yêu cầu</h2>
                            <p className='text-muted-foreground'>
                                Quản lý các yêu cầu tại đây.
                            </p>
                        </div>
                        <div>
                        </div>
                    </div>
                    <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                        <RequestTable data={mockRequests} search={search} navigate={navigate} />
                    </div>
                </Main>

                <UsersDialogs />
            </>
        </UsersProvider>
    )
}