import { getRouteApi } from '@tanstack/react-router'
import { Main } from '@/components/layout/main'
import { CompaniesProvider } from './components/companies-provider'
import { CompaniesTable } from './components/companies-table'
//import { companies } from './data/companies'
import { CompaniesDialogs } from './components/companies-dialogs'
import { useGetCompanies } from '@/hooks/api/companies'
import { ErrorView } from '@/components/admin/ErrorView'


const route = getRouteApi('/_authenticated/lab-admin/companies/')

const CompaniesTableSkeleton = () => (
    <div className="space-y-3 p-4 border rounded-lg bg-background shadow">
        <div className="flex justify-between space-x-4 mb-4">
            <div className="h-9 w-64 animate-pulse rounded-md bg-gray-200 dark:bg-gray-600" />
            <div className="h-9 w-24 animate-pulse rounded-md bg-gray-200 dark:bg-gray-600" />
        </div>

        {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-2 py-2 border-b border-gray-100 dark:border-gray-700">
                <div className="h-4 w-4 animate-pulse rounded-sm bg-gray-200 dark:bg-gray-500" />
                <div className="h-4 w-[12%] animate-pulse rounded-sm bg-gray-200 dark:bg-gray-500" />
                <div className="h-4 w-[10%] animate-pulse rounded-sm bg-gray-200 dark:bg-gray-500" />
                <div className="h-4 w-[15%] animate-pulse rounded-sm bg-gray-200 dark:bg-gray-500" />
                <div className="h-4 w-[10%] animate-pulse rounded-sm bg-gray-200 dark:bg-gray-500" />
                <div className="h-4 w-[12%] animate-pulse rounded-sm bg-gray-200 dark:bg-gray-500" />
                <div className="h-4 w-[8%] animate-pulse rounded-sm bg-gray-200 dark:bg-gray-500" />
                <div className="h-4 w-[8%] animate-pulse rounded-md bg-gray-200 dark:bg-gray-500" />
                <div className="h-4 w-[8%] animate-pulse rounded-sm bg-gray-200 dark:bg-gray-500" />
                <div className="h-4 w-4 ms-auto animate-pulse rounded-full bg-gray-200 dark:bg-gray-500" />
            </div>
        ))}
        <div className="flex justify-between pt-2">
            <div className="h-6 w-24 animate-pulse rounded-sm bg-gray-200 dark:bg-gray-600" />
            <div className="h-6 w-32 animate-pulse rounded-sm bg-gray-200 dark:bg-gray-600" />
        </div>
    </div>
)


export default function Companies() {
    const search = route.useSearch()
    const navigate = route.useNavigate()

    // 1. Lấy trạng thái truy vấn từ hook
    const { data, isLoading, isError, error } = useGetCompanies()

    // 3. Xử lý trạng thái Error
    if (isError) {
        return (
            <ErrorView
                title="Lỗi Tải Dữ Liệu"
                description="Không thể kết nối đến server hoặc tải danh sách công ty."
                details={error.message}
            />
        )
    }

    // 4. Lấy dữ liệu khi đã thành công
    // Giả định API response có cấu trúc { data: Company[], ... }
    const companies = data?.data || [];

    return (
        <CompaniesProvider>
            <>
                <Main>
                    <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                        <div>
                            <h2 className='text-2xl font-bold tracking-tight'>Danh sách công ty</h2>
                            <p className='text-muted-foreground'>
                                Quản lý công ty tại đây.
                            </p>
                        </div>
                    </div>
                    <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                        {/* 5. Điều kiện hóa: Nếu đang tải, hiển thị Skeleton, ngược lại hiển thị Bảng */}
                        {isLoading ? (
                            <CompaniesTableSkeleton />
                        ) : (
                            <CompaniesTable data={companies} search={search} navigate={navigate} />
                        )}
                    </div>
                </Main>
            </>
            <CompaniesDialogs />
        </CompaniesProvider>
    )
}