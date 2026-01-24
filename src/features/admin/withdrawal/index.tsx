import { useState, useEffect } from 'react'
import { getRouteApi } from '@tanstack/react-router'
import { Main } from '@/components/layout/main'
import { WithdrawalDialogs } from './components/withdrawal-dialogs'
import { WithdrawalProvider } from './components/withdrawal-provider'
import { WithdrawalTable } from './components/withdrawal-table'
import { useGetWithdrawalRequests } from '@/hooks/api/withdrawal/queries'
import { ErrorView } from '@/components/admin/ErrorView'
import { WITHDRAWAL_STATUS_LABEL } from './data/schema'
import { DatePicker } from '@/components/date-picker'
import { Label } from '@/components/ui/label'
import { WithdrawalStatus } from '@/hooks/api/withdrawal/enums'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { WithdrawalFilter } from '@/hooks/api/withdrawal/types'
import { formatDateToString } from '@/helpers/datetime'
import { Separator } from '@/components/ui/separator'

const route = getRouteApi('/_authenticated/admin/withdrawal/')

export default function Withdrawal() {
    const search = route.useSearch()
    const navigate = route.useNavigate()

    const [statusFilter, setStatusFilter] = useState<string>(WithdrawalStatus.PENDING)
    const [fromDate, setFromDate] = useState<Date>(new Date())
    const [toDate, setToDate] = useState<Date>(new Date())
    const [page, setPage] = useState(0)
    const [size] = useState(10)

    const statusOptions = [
        { value: 'ALL', label: 'Tất cả' },
        ...Object.values(WithdrawalStatus).map(opt => ({
            value: opt,
            label: WITHDRAWAL_STATUS_LABEL[opt],
        })),
    ]

    useEffect(() => {
        setPage(0)
    }, [statusFilter, fromDate, toDate])


    const filterParams: WithdrawalFilter = {
        status: statusFilter === 'ALL' ? '' : statusFilter,
        fromDate: formatDateToString(fromDate),
        toDate: formatDateToString(toDate),
        page: page,
        size: size,
    }

    const { data, isLoading, isError, error } = useGetWithdrawalRequests(filterParams)

    if (isError) {
        return (
            <ErrorView
                title="Lỗi Tải Dữ Liệu"
                description="Không thể kết nối đến server hoặc tải danh sách yêu cầu rút tiền."
                details={error?.message}
            />
        )
    }

    const withdrawalRequests = data?.data.data || []

    return (
        <WithdrawalProvider>
            <>
                <Main>
                    <div className='flex flex-col space-y-6'>
                        {/* Header Section */}
                        <div className='flex flex-col space-y-2'>
                            <h2 className='text-2xl font-bold tracking-tight'>Quản lý yêu cầu rút tiền</h2>
                            <p className='text-muted-foreground'>
                                Xem và xử lý các yêu cầu rút tiền từ người dùng.
                            </p>
                        </div>

                        <Separator />

                        {/* Filter Section */}
                        <div className='grid gap-6 md:grid-cols-3 lg:grid-cols-4'>
                            <div className='space-y-2'>
                                <Label htmlFor='status-filter' className='text-sm font-medium'>Trạng thái</Label>
                                <Select
                                    value={statusFilter}
                                    onValueChange={setStatusFilter}
                                >
                                    <SelectTrigger className='w-full bg-background'>
                                        <SelectValue placeholder='Chọn trạng thái' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statusOptions.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className='space-y-2'>
                                <Label className='text-sm font-medium'>Từ ngày</Label>
                                <div className='[&>button]:w-full'>
                                    <DatePicker
                                        selected={fromDate}
                                        onSelect={(date) => setFromDate(date || new Date())}
                                        placeholder='Chọn ngày bắt đầu'
                                    />
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <Label className='text-sm font-medium'>Đến ngày</Label>
                                <div className='[&>button]:w-full'>
                                    <DatePicker
                                        selected={toDate}
                                        onSelect={(date) => setToDate(date || new Date())}
                                        placeholder='Chọn ngày kết thúc'
                                        minDate={fromDate}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Table Section */}
                        <div className='flex-1'>
                            {isLoading ? (
                                <div className='flex h-64 items-center justify-center rounded-md border border-dashed bg-muted/20'>
                                    <div className='text-muted-foreground'>Đang tải dữ liệu...</div>
                                </div>
                            ) : (
                                <WithdrawalTable data={withdrawalRequests} search={search} navigate={navigate} />
                            )}
                        </div>
                    </div>
                </Main>

                <WithdrawalDialogs />
            </>
        </WithdrawalProvider>
    )
}