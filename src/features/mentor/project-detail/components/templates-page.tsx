import React, { useState, useMemo } from 'react'
import { useParams, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
    FileText,
    Download,
    ChevronLeft,
    Filter,
    Search,
    Calendar,
    Sparkles,
    CheckCircle2,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { getRoleBasePath } from '@/lib/utils'
import { useUser } from '@/context/UserContext'
import { useSystemTemplates } from '@/hooks/api/system-templates/queries'

export const TEMPLATE_TYPES = {
    REPORT_WEEKLY: 'REPORT_WEEKLY',
    REPORT_MILESTONE: 'REPORT_MILESTONE',
    REPORT_DELIVERY: 'REPORT_DELIVERY',
    TASK_MANAGEMENT: 'TASK_MANAGEMENT',
    PROJECT_PLANNING: 'PROJECT_PLANNING',
} as const

const TEMPLATE_TYPE_LABELS: Record<string, string> = {
    [TEMPLATE_TYPES.REPORT_WEEKLY]: 'Báo cáo Tuần',
    [TEMPLATE_TYPES.REPORT_MILESTONE]: 'Báo cáo Milestone',
    [TEMPLATE_TYPES.REPORT_DELIVERY]: 'Báo cáo bàn giao',
    [TEMPLATE_TYPES.TASK_MANAGEMENT]: 'Quản lý Công việc',
    [TEMPLATE_TYPES.PROJECT_PLANNING]: 'Lập kế hoạch Dự án',
}

const TEMPLATE_TYPE_COLORS: Record<string, string> = {
    [TEMPLATE_TYPES.REPORT_WEEKLY]: 'bg-teal-50 text-[#2a9d8f] border-teal-200',
    [TEMPLATE_TYPES.REPORT_MILESTONE]: 'bg-slate-50 text-[#264653] border-slate-200',
    [TEMPLATE_TYPES.REPORT_DELIVERY]: 'bg-emerald-50 text-[#2a9d8f] border-emerald-200',
    [TEMPLATE_TYPES.TASK_MANAGEMENT]: 'bg-orange-50 text-[#f4a261] border-orange-200',
    [TEMPLATE_TYPES.PROJECT_PLANNING]: 'bg-slate-50 text-[#264653] border-slate-200',
}

interface Template {
    id: string
    name: string
    type: string
    fileUrl: string
    fileName: string
    description: string
    createdAt: string
    updatedAt: string
}

export const TemplatesPage: React.FC = () => {
    const { projectId } = useParams({ strict: false })
    const navigate = useNavigate()
    const { user } = useUser()
    const [selectedType, setSelectedType] = useState<string>(TEMPLATE_TYPES.REPORT_WEEKLY)
    const [searchQuery, setSearchQuery] = useState('')

    const { data: templateResponse, isLoading, isError } = useSystemTemplates(selectedType)

    // Extract template from response
    const template = useMemo(() => {
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

    // Filter template by search query
    const filteredTemplate = useMemo(() => {
        if (!template) return null

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase()
            const matches =
                template.name.toLowerCase().includes(query) ||
                template.description.toLowerCase().includes(query) ||
                template.type.toLowerCase().includes(query)

            return matches ? template : null
        }

        return template
    }, [template, searchQuery])

    const handleDownload = (template: Template) => {
        if (template.fileUrl) {
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-white border-b shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                    navigate({
                                        to: `${getRoleBasePath(user?.role)}/projects/${projectId}`,
                                    })
                                }
                                className="hover:bg-gray-100"
                            >
                                <ChevronLeft className="h-4 w-4 mr-2" />
                                Quay lại
                            </Button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    <Sparkles className="w-6 h-6 text-[#2a9d8f]" />
                                    Template Hệ thống
                                </h1>
                                <p className="text-sm text-gray-500 mt-1">
                                    Tải xuống và sử dụng các template có sẵn
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="grid grid-cols-12 gap-6">
                    {/* Left Sidebar - Filters */}
                    <div className="col-span-12 lg:col-span-4">
                        <Card className="border-[#2a9d8f]/20 shadow-sm sticky top-24">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Filter className="w-5 h-5 text-[#2a9d8f]" />
                                    Bộ lọc & Tìm kiếm
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Search */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Tìm kiếm</label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <Input
                                            placeholder="Tìm kiếm template..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                {/* Type Filter */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Loại Template</label>
                                    <div className="space-y-2">
                                        {Object.entries(TEMPLATE_TYPES).map(([key, value]) => (
                                            <Button
                                                key={key}
                                                variant={selectedType === value ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => setSelectedType(value)}
                                                className={cn(
                                                    'w-full justify-start',
                                                    selectedType === value &&
                                                    TEMPLATE_TYPE_COLORS[value]
                                                )}
                                            >
                                                {TEMPLATE_TYPE_LABELS[value]}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* Current Selection Info */}
                                {!isLoading && !isError && filteredTemplate && (
                                    <div className="pt-4 border-t border-gray-200">
                                        <div className="text-xs text-gray-500 mb-1">Đang xem:</div>
                                        <div className="text-sm font-semibold text-[#2a9d8f]">
                                            {TEMPLATE_TYPE_LABELS[selectedType]}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Content - Template Info */}
                    <div className="col-span-12 lg:col-span-8">
                        {/* Content */}
                        {isLoading ? (
                            <Card className="border-gray-200">
                                <CardHeader>
                                    <Skeleton className="h-8 w-3/4 mb-2" />
                                    <Skeleton className="h-6 w-1/3" />
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <Skeleton className="h-4 w-20 mb-2" />
                                        <Skeleton className="h-20 w-full" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                        <Skeleton className="h-16 w-full" />
                                        <Skeleton className="h-16 w-full" />
                                    </div>
                                    <Skeleton className="h-12 w-full" />
                                </CardContent>
                            </Card>
                        ) : isError ? (
                            <Alert className="border-red-200 bg-red-50">
                                <AlertDescription className="text-red-800">
                                    Không thể tải danh sách template. Vui lòng thử lại sau.
                                </AlertDescription>
                            </Alert>
                        ) : !filteredTemplate ? (
                            <Card className="border-gray-200">
                                <CardContent className="py-12 text-center">
                                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Không tìm thấy template
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {searchQuery
                                            ? 'Thử thay đổi từ khóa tìm kiếm hoặc chọn loại template khác'
                                            : `Hiện chưa có template cho loại "${TEMPLATE_TYPE_LABELS[selectedType]}"`}
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card
                                key={filteredTemplate.id}
                                className="border-gray-200 hover:border-[#2a9d8f]/30 hover:shadow-lg transition-all duration-200 group"
                            >
                                <CardHeader>
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-[#264653] transition-colors">
                                            {filteredTemplate.name}
                                        </CardTitle>
                                        <CheckCircle2 className="w-5 h-5 text-[#2a9d8f] flex-shrink-0 mt-1" />
                                    </div>
                                    <Badge
                                        className={cn(
                                            'text-xs font-medium',
                                            TEMPLATE_TYPE_COLORS[filteredTemplate.type] ||
                                            'bg-gray-100 text-gray-700 border-gray-200'
                                        )}
                                    >
                                        {TEMPLATE_TYPE_LABELS[filteredTemplate.type] || filteredTemplate.type}
                                    </Badge>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-700 mb-2">Mô tả</h3>
                                        <CardDescription className="text-sm text-gray-600">
                                            {filteredTemplate.description || 'Không có mô tả'}
                                        </CardDescription>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1">Tên file</div>
                                            <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-gray-400" />
                                                {filteredTemplate.fileName || 'N/A'}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1">Cập nhật lần cuối</div>
                                            <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                {formatDate(filteredTemplate.updatedAt)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100">
                                        <Button
                                            onClick={() => handleDownload(filteredTemplate)}
                                            className="w-full bg-[#264653] hover:bg-[#1e353d] text-white text-base py-6 transition-colors"
                                            disabled={!filteredTemplate.fileUrl}
                                            size="lg"
                                        >
                                            <Download className="w-5 h-5 mr-2" />
                                            Tải xuống Template
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

