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
import { formatDateLong } from '@/helpers/datetime'
import { useUser } from '@/context/UserContext'
import { useSystemTemplates, useGetAllSystemTemplates } from '@/hooks/api/system-templates'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

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

const TEMPLATE_CATEGORIES = {
    REPORT: 'REPORT',
    PROJECT: 'PROJECT',
} as const

const TEMPLATE_CATEGORY_LABELS: Record<string, string> = {
    [TEMPLATE_CATEGORIES.REPORT]: 'Báo cáo',
    [TEMPLATE_CATEGORIES.PROJECT]: 'Dự án',
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
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [searchQuery, setSearchQuery] = useState('')

    // Build filters based on selected filters
    const filters = useMemo(() => {
        const filterArray: Array<{ key: string; operator: string; value: string; valueTo?: {} }> = []

        if (selectedCategory) {
            filterArray.push({
                key: 'category',
                operator: 'EQUAL',
                value: selectedCategory,
                valueTo: {},
            })
            // If both category and type are selected, also filter by type
            if (selectedType) {
                filterArray.push({
                    key: 'type',
                    operator: 'EQUAL',
                    value: selectedType,
                    valueTo: {},
                })
            }
        } else if (selectedType) {
            filterArray.push({
                key: 'type',
                operator: 'EQUAL',
                value: selectedType,
                valueTo: {},
            })
        }

        return filterArray
    }, [selectedCategory, selectedType])

    // Use search API when category is selected, otherwise use type-based API
    const searchResponse = useGetAllSystemTemplates(1, 100, filters)
    const typeResponse = useSystemTemplates(selectedType)

    const { data: templateResponse, isLoading, isError } = selectedCategory
        ? searchResponse
        : typeResponse

    // Extract templates from response
    const templates = useMemo(() => {
        if (!templateResponse) return []

        // Handle search API response structure (with nested data.data) - returns array
        if (selectedCategory && templateResponse.data?.data) {
            const templatesList = templateResponse.data.data as Template[]
            // Filter by selectedType if both category and type are selected
            if (selectedType) {
                return templatesList.filter(t => t.type === selectedType)
            }
            return templatesList
        }

        // Handle type-based API response structure - returns single template
        if (templateResponse.data) {
            return [templateResponse.data as Template]
        }
        if (Array.isArray(templateResponse)) {
            return templateResponse as Template[]
        }
        return []
    }, [templateResponse, selectedCategory, selectedType])

    // Filter templates by search query
    const filteredTemplates = useMemo(() => {
        if (templates.length === 0) return []

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase()
            return templates.filter(template =>
                template.name.toLowerCase().includes(query) ||
                template.description.toLowerCase().includes(query) ||
                template.type.toLowerCase().includes(query)
            )
        }

        return templates
    }, [templates, searchQuery])

    const handleDownload = (template: Template) => {
        if (template.fileUrl) {
            window.open(template.fileUrl, '_blank')
        }
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

                                {/* Category Filter */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Category</label>
                                    <Select
                                        value={selectedCategory || undefined}
                                        onValueChange={(value) => {
                                            setSelectedCategory(value)
                                            setSelectedType('') // Clear type when category is selected
                                        }}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Tất cả categories" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(TEMPLATE_CATEGORIES).map(([key, value]) => (
                                                <SelectItem key={key} value={value}>
                                                    {TEMPLATE_CATEGORY_LABELS[value]}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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
                                                onClick={() => {
                                                    setSelectedType(value)
                                                    setSelectedCategory('') // Clear category when type is selected
                                                }}
                                                disabled={!!selectedCategory}
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
                                {!isLoading && !isError && filteredTemplates.length > 0 && (
                                    <div className="pt-4 border-t border-gray-200">
                                        <div className="text-xs text-gray-500 mb-1">Đang xem:</div>
                                        <div className="text-sm font-semibold text-[#2a9d8f]">
                                            {selectedCategory
                                                ? `${TEMPLATE_CATEGORY_LABELS[selectedCategory]} (${filteredTemplates.length} template${filteredTemplates.length > 1 ? 's' : ''})`
                                                : TEMPLATE_TYPE_LABELS[selectedType]}
                                        </div>
                                    </div>
                                )}

                                {/* Clear Filters */}
                                {(selectedCategory || selectedType) && (
                                    <div className="pt-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setSelectedCategory('')
                                                setSelectedType(TEMPLATE_TYPES.REPORT_WEEKLY)
                                            }}
                                            className="w-full"
                                        >
                                            Xóa bộ lọc
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Content - Template Info */}
                    <div className="col-span-12 lg:col-span-8">
                        {/* Content */}
                        {isLoading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <Card key={i} className="border-gray-200">
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
                                ))}
                            </div>
                        ) : isError ? (
                            <Alert className="border-red-200 bg-red-50">
                                <AlertDescription className="text-red-800">
                                    Không thể tải danh sách template. Vui lòng thử lại sau.
                                </AlertDescription>
                            </Alert>
                        ) : filteredTemplates.length === 0 ? (
                            <Card className="border-gray-200">
                                <CardContent className="py-12 text-center">
                                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Không tìm thấy template
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {searchQuery
                                            ? 'Thử thay đổi từ khóa tìm kiếm hoặc chọn loại template khác'
                                            : selectedCategory
                                                ? `Hiện chưa có template cho category "${TEMPLATE_CATEGORY_LABELS[selectedCategory]}"`
                                                : `Hiện chưa có template cho loại "${TEMPLATE_TYPE_LABELS[selectedType]}"`}
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="space-y-4">
                                {filteredTemplates.map((template) => (
                                    <Card
                                        key={template.id}
                                        className="border-gray-200 hover:border-[#2a9d8f]/30 hover:shadow-lg transition-all duration-200 group"
                                    >
                                        <CardHeader>
                                            <div className="flex items-start justify-between gap-2 mb-2">
                                                <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-[#264653] transition-colors">
                                                    {template.name}
                                                </CardTitle>
                                                <CheckCircle2 className="w-5 h-5 text-[#2a9d8f] flex-shrink-0 mt-1" />
                                            </div>
                                            <Badge
                                                className={cn(
                                                    'text-xs font-medium',
                                                    TEMPLATE_TYPE_COLORS[template.type] ||
                                                    'bg-gray-100 text-gray-700 border-gray-200'
                                                )}
                                            >
                                                {TEMPLATE_TYPE_LABELS[template.type] || template.type}
                                            </Badge>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-700 mb-2">Mô tả</h3>
                                                <CardDescription className="text-sm text-gray-600">
                                                    {template.description || 'Không có mô tả'}
                                                </CardDescription>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                                                <div>
                                                    <div className="text-xs text-gray-500 mb-1">Tên file</div>
                                                    <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                                        <FileText className="w-4 h-4 text-gray-400" />
                                                        {template.fileName || 'N/A'}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-500 mb-1">Cập nhật lần cuối</div>
                                                    <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-gray-400" />
                                                        {formatDateLong(template.updatedAt)}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-4 border-t border-gray-100">
                                                <Button
                                                    onClick={() => handleDownload(template)}
                                                    className="w-full bg-[#264653] hover:bg-[#1e353d] text-white text-base py-6 transition-colors"
                                                    disabled={!template.fileUrl}
                                                    size="lg"
                                                >
                                                    <Download className="w-5 h-5 mr-2" />
                                                    Tải xuống Template
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

