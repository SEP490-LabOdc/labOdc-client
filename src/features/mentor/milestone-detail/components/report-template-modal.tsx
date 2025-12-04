import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { FileText, Download, CheckCircle2, Calendar } from 'lucide-react'
import { useSystemTemplates } from '@/hooks/api/system-templates/queries'

interface ReportTemplateModalProps {
    isOpen: boolean
    onClose: () => void
    reportType?: 'DAILY_REPORT' | 'WEEKLY_REPORT' | 'MILESTONE_REPORT' | 'DELIVERY_REPORT'
}

const TEMPLATE_TYPE_MAP: Record<string, string> = {
    'DAILY_REPORT': 'REPORT_DAILY',
    'WEEKLY_REPORT': 'REPORT_WEEKLY',
    'MILESTONE_REPORT': 'REPORT_MILESTONE',
    'DELIVERY_REPORT': 'REPORT_DELIVERY',
}

const TEMPLATE_TYPE_LABELS: Record<string, string> = {
    'REPORT_DAILY': 'Báo cáo Hàng ngày',
    'REPORT_WEEKLY': 'Báo cáo Tuần',
    'REPORT_MILESTONE': 'Báo cáo Milestone',
    'REPORT_DELIVERY': 'Báo cáo Bàn giao',
}

export const ReportTemplateModal: React.FC<ReportTemplateModalProps> = ({
    isOpen,
    onClose,
    reportType,
}) => {
    // Map report type to template type
    const templateType = reportType ? TEMPLATE_TYPE_MAP[reportType] : 'REPORT_MILESTONE'

    const { data: templateResponse, isLoading, isError } = useSystemTemplates(templateType)

    // Extract template from response
    const template = React.useMemo(() => {
        if (!templateResponse) return null

        // Handle different response structures
        if (templateResponse.data) {
            return templateResponse.data
        }
        if (Array.isArray(templateResponse)) {
            return templateResponse[0] || null
        }
        return null
    }, [templateResponse])

    const handleDownload = () => {
        if (template?.fileUrl) {
            window.open(template.fileUrl, '_blank')
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-2xl max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <FileText className="w-5 h-5 text-indigo-600" />
                        Mẫu Báo cáo
                    </DialogTitle>
                    <DialogDescription>
                        Xem và tải xuống mẫu template để sử dụng cho báo cáo của bạn
                    </DialogDescription>
                </DialogHeader>

                <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
                    {isLoading ? (
                        <div className="space-y-4">
                            <Skeleton className="h-32 w-full" />
                            <Skeleton className="h-20 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    ) : isError ? (
                        <Alert className="border-red-200 bg-red-50">
                            <AlertDescription className="text-red-800">
                                Không thể tải mẫu template. Vui lòng thử lại sau.
                            </AlertDescription>
                        </Alert>
                    ) : !template ? (
                        <Card className="border-gray-200">
                            <CardContent className="py-12 text-center">
                                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Không có mẫu template
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Hiện chưa có mẫu template cho loại báo cáo này
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="border-indigo-200 shadow-sm">
                            <CardHeader>
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CardTitle className="text-lg font-semibold text-gray-900">
                                                {template.name}
                                            </CardTitle>
                                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        </div>
                                        <Badge
                                            variant="outline"
                                            className="bg-indigo-100 text-indigo-700 border-indigo-200"
                                        >
                                            {TEMPLATE_TYPE_LABELS[template.type] || template.type}
                                        </Badge>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <CardDescription className="text-sm text-gray-600">
                                    {template.description || 'Không có mô tả'}
                                </CardDescription>

                                <div className="space-y-3 pt-4 border-t border-gray-100">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <FileText className="w-4 h-4 text-gray-400" />
                                        <span className="font-medium">Tên file:</span>
                                        <span className="text-gray-900">{template.fileName || 'N/A'}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        <span className="font-medium">Cập nhật:</span>
                                        <span className="text-gray-900">
                                            {template.updatedAt ? formatDate(template.updatedAt) : 'N/A'}
                                        </span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-100">
                                    <Button
                                        onClick={handleDownload}
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                                        disabled={!template.fileUrl}
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Tải xuống Template
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

