import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts'
import { useGetCompanyLast6MonthStatistic, useGetProjectLast6MonthStatistic } from '@/hooks/api/dashboard'

const formatMonthLabel = (month: string) => {
    const [year, m] = month.split('-')
    return `${m}/${year}`
}

export default function MonthlyBarChart({ type }: { type: 'project' | 'company' }) {
    const hook =
        type === 'project'
            ? useGetProjectLast6MonthStatistic
            : useGetCompanyLast6MonthStatistic

    const { data, isLoading } = hook()

    const chartData =
        data?.map((item: { month: string; total: number }) => ({
            label: formatMonthLabel(item.month),
            total: item.total,
        })) ?? []

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {type === 'project' ? 'Dự án mới theo tháng' : 'Doanh nghiệp mới theo tháng'}
                </CardTitle>
                <CardDescription>
                    6 tháng gần nhất
                </CardDescription>
            </CardHeader>

            <CardContent className="h-[220px]">
                {isLoading ? (
                    <p className="text-sm text-muted-foreground">Đang tải dữ liệu...</p>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <XAxis dataKey="label" />
                            <YAxis allowDecimals={false} />
                            <Bar dataKey="total" radius={[4, 4, 0, 0]} className="fill-primary" />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    )
}
