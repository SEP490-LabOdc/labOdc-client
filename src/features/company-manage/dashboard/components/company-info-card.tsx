import {
    Building2,
    FolderKanban,
    Mail,
    Phone,
    Globe,
    MapPin,
    Briefcase,
} from 'lucide-react'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card'

import OverviewItem from './overview-item'

type CompanyInfoCardProps = {
    company: any
    projectCount: number
}

export default function CompanyInfoCard({
    company,
    projectCount,
}: CompanyInfoCardProps) {
    return (
        <Card className='gap-3'>
            <CardHeader>
                <CardTitle>Thông tin công ty</CardTitle>
                <CardDescription>
                    Thông tin tổng quan doanh nghiệp
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3 text-sm">
                <OverviewItem
                    icon={<Building2 size={16} />}
                    label="Tên công ty"
                    value={company?.name ?? '-'}
                />

                <OverviewItem
                    icon={<FolderKanban size={16} />}
                    label="Tổng số dự án"
                    value={projectCount}
                />

                <OverviewItem
                    icon={<Briefcase size={16} />}
                    label="Lĩnh vực"
                    value={company?.domain || 'Chưa cập nhật'}
                />

                <OverviewItem
                    icon={<Phone size={16} />}
                    label="Điện thoại"
                    value={company?.phone || '-'}
                />

                <OverviewItem
                    icon={<Mail size={16} />}
                    label="Email"
                    value={company?.email || '-'}
                />

                <OverviewItem
                    icon={<Globe size={16} />}
                    label="Website"
                    value={company?.website || 'Chưa cập nhật'}
                />

                <OverviewItem
                    icon={<MapPin size={16} />}
                    label="Địa chỉ"
                    value={company?.address || '-'}
                />

                {/* Company Description */}
                <div className="rounded-md border p-3">
                    <div className="mb-1 text-sm text-muted-foreground">
                        Mô tả công ty
                    </div>
                    <p className="text-sm leading-relaxed">
                        {company?.description || 'Chưa có mô tả'}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
