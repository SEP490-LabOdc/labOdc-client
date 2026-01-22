import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    FileText,
    Plus,
    Download,
    Trash2,
    Calendar,
    Sparkles,
    Loader2,
} from 'lucide-react'
import { useGetAllSystemTemplates, useDeleteSystemTemplate } from '@/hooks/api/system-templates'
import { toast } from 'sonner'
import { usePermission } from '@/hooks/usePermission'
import { useNavigate } from '@tanstack/react-router'
import { CreateTemplateModal } from './components'
import { formatDateLong } from '@/helpers/datetime'

export const TEMPLATE_TYPES = {
    REPORT_WEEKLY: 'REPORT_WEEKLY',
    REPORT_MILESTONE: 'REPORT_MILESTONE',
    REPORT_DELIVERY: 'REPORT_DELIVERY',
    TASK_MANAGEMENT: 'TASK_MANAGEMENT',
    PROJECT_PLANNING: 'PROJECT_PLANNING',
} as const

export const TEMPLATE_TYPE_LABELS: Record<string, string> = {
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

export const TEMPLATE_CATEGORIES = {
    REPORT: 'REPORT',
    PROJECT: 'PROJECT',
} as const

export const TEMPLATE_CATEGORY_LABELS: Record<string, string> = {
    [TEMPLATE_CATEGORIES.REPORT]: 'Báo cáo',
    [TEMPLATE_CATEGORIES.PROJECT]: 'Dự án',
}

export default function TemplatesManagementPage() {
    const { isSystemAdmin } = usePermission()
    const navigate = useNavigate()
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [selectedType, setSelectedType] = useState<string>('')
    const [selectedCategory, setSelectedCategory] = useState<string>('')

    // Build filters based on selected filters
    const filters = React.useMemo(() => {
        const filterArray: Array<{ key: string; operator: string; value: string; valueTo?: {} }> = []

        if (selectedCategory) {
            filterArray.push({
                key: 'category',
                operator: 'EQUAL',
                value: selectedCategory,
                valueTo: {},
            })
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

    const { data: templatesResponse, isLoading } = useGetAllSystemTemplates(1, 100, filters)
    // API search returns { data: { data: [...], totalElements, totalPages, ... } }
    const templates: Template[] = templatesResponse?.data?.data || []

    const deleteMutation = useDeleteSystemTemplate()

    // Redirect if not lab-admin
    React.useEffect(() => {
        if (!isSystemAdmin) {
            navigate({ to: '/lab-admin' })
        }
    }, [isSystemAdmin, navigate])


    const handleDelete = async (templateId: string) => {
        if (!confirm('Bạn có chắc chắn muốn xóa template này?')) {
            return
        }

        try {
            await deleteMutation.mutateAsync(templateId)
            toast.success('Xóa template thành công')
        } catch (error) {
            toast.error('Xóa template thất bại')
        }
    }

    const handleDownload = (template: Template) => {
        if (template.fileUrl) {
            const link = document.createElement('a')
            link.href = template.fileUrl
            link.download = template.fileName
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }


    if (!isSystemAdmin) {
        return null
    }

    return (
        <div className="container mx-auto px-8 py-6">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <Sparkles className="h-8 w-8 text-[#2a9d8f]" />
                            Quản lý Template Hệ thống
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Quản lý và tạo các template cho hệ thống
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-[#264653] hover:bg-[#1e353d]"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Tạo Template Mới
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <div className="mb-6 flex items-end gap-4 flex-wrap">
                <div className="flex-1 min-w-[200px] space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Lọc theo Category</Label>
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
                <div className="flex-1 min-w-[200px] space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Lọc theo Type</Label>
                    <Select
                        value={selectedType || undefined}
                        onValueChange={(value) => {
                            setSelectedType(value)
                            setSelectedCategory('') // Clear category when type is selected
                        }}
                        disabled={!!selectedCategory}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Tất cả types" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(TEMPLATE_TYPES).map(([key, value]) => (
                                <SelectItem key={key} value={value}>
                                    {TEMPLATE_TYPE_LABELS[value]}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                {(selectedCategory || selectedType) && (
                    <div className="mb-0">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                setSelectedCategory('')
                                setSelectedType('')
                            }}
                        >
                            Xóa bộ lọc
                        </Button>
                    </div>
                )}
            </div>

            {/* Templates Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Danh sách Templates</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="h-6 w-6 animate-spin text-[#2a9d8f]" />
                        </div>
                    ) : templates.length === 0 ? (
                        <div className="text-center py-12">
                            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Chưa có template nào
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">
                                Tạo template đầu tiên để bắt đầu
                            </p>
                            <Button
                                onClick={() => setIsCreateModalOpen(true)}
                                className="bg-[#264653] hover:bg-[#1e353d]"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Tạo Template Mới
                            </Button>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tên Template</TableHead>
                                    <TableHead>Loại</TableHead>
                                    <TableHead>File</TableHead>
                                    <TableHead>Mô tả</TableHead>
                                    <TableHead>Cập nhật</TableHead>
                                    <TableHead className="text-right">Thao tác</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {templates.map((template) => (
                                    <TableRow key={template.id}>
                                        <TableCell className="font-medium">
                                            {template.name}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                className={
                                                    TEMPLATE_TYPE_COLORS[template.type] ||
                                                    'bg-gray-100 text-gray-700 border-gray-200'
                                                }
                                            >
                                                {TEMPLATE_TYPE_LABELS[template.type] || template.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <FileText className="h-4 w-4 text-gray-400" />
                                                <span className="text-sm text-gray-600">
                                                    {template.fileName}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="max-w-xs truncate">
                                            {template.description || 'Không có mô tả'}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <Calendar className="h-4 w-4" />
                                                {formatDateLong(template.updatedAt)}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleDownload(template)}
                                                >
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleDelete(template.id)}
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            {/* Create Template Modal */}
            <CreateTemplateModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </div>
    )
}

