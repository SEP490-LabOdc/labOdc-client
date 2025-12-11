import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
    FileText,
    Calendar,
    Clock,
    CheckCircle2,
    XCircle,
    Eye,
    ExternalLink
} from 'lucide-react'
import { useGetMyApplications } from '@/hooks/api/projects'
import { getCandidateStatusColor, getCandidateStatusLabel } from '@/lib/utils'
import { useNavigate } from '@tanstack/react-router'
import { getRoleBasePath } from '@/lib/utils'
import { usePermission } from '@/hooks/usePermission'
import { CandidateDetailModal } from '@/features/projects/project-candidates/components/candidate-detail-modal'
import { formatDateLongWithTime } from '@/helpers/datetime'

interface Application {
    id: string
    userId: string
    projectId: string
    projectName: string
    status: string
    appliedAt: string
    updatedAt: string
    cvUrl?: string
}


export default function MyApplicationsPage() {
    const { user } = usePermission()
    const navigate = useNavigate()
    const [selectedApplication, setSelectedApplication] = React.useState<Application | null>(null)
    const [isDetailModalOpen, setIsDetailModalOpen] = React.useState(false)

    const { data: applicationsResponse, isLoading, error } = useGetMyApplications()
    const applications: Application[] = applicationsResponse?.data?.data || []

    const handleViewDetail = (application: Application) => {
        setSelectedApplication(application)
        setIsDetailModalOpen(true)
    }

    const handleViewProject = (projectId: string) => {
        const roleBasePath = user?.role ? getRoleBasePath(user.role) : '/talent'
        navigate({
            to: `${roleBasePath}/projects/${projectId}`,
            params: { projectId }
        })
    }

    const getStatusIcon = (status: string) => {
        switch (status.toUpperCase()) {
            case 'PENDING':
                return <Clock className="h-4 w-4" />
            case 'APPROVED':
                return <CheckCircle2 className="h-4 w-4" />
            case 'REJECTED':
                return <XCircle className="h-4 w-4" />
            default:
                return <Clock className="h-4 w-4" />
        }
    }

    if (isLoading) {
        return (
            <div className="container mx-auto px-8 py-6">
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-32 w-full" />
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mx-auto px-8 py-12 text-center">
                <div className="text-red-500">Lỗi khi tải danh sách đơn ứng tuyển</div>
            </div>
        )
    }

    return (
        <>
            <div className="container mx-auto px-8 py-2">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <FileText className="h-8 w-8 text-[#2a9d8f]" />
                        Đơn ứng tuyển của tôi
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Xem và quản lý các đơn ứng tuyển bạn đã gửi
                    </p>
                </div>

                {/* Applications List */}
                {applications.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Chưa có đơn ứng tuyển nào
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">
                                Bạn chưa ứng tuyển vào dự án nào. Hãy tìm và ứng tuyển vào các dự án phù hợp với bạn.
                            </p>
                            <Button
                                onClick={() => navigate({ to: '/talent/projects' })}
                                className="bg-[#264653] hover:bg-[#264653]/90"
                            >
                                Xem danh sách dự án
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {applications.map((application) => (
                            <Card key={application.id} className="hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <CardTitle className="text-lg mb-2">
                                                {application.projectName}
                                            </CardTitle>
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <Badge
                                                    className={`${getCandidateStatusColor(application.status)} rounded-full border px-3 py-1 flex items-center gap-1.5`}
                                                >
                                                    {getStatusIcon(application.status)}
                                                    {getCandidateStatusLabel(application.status)}
                                                </Badge>
                                                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>Ứng tuyển: {formatDateLongWithTime(application.appliedAt)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="text-sm text-gray-500">
                                                Cập nhật: {formatDateLongWithTime(application.updatedAt)}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {application.cvUrl && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => window.open(application.cvUrl, '_blank')}
                                                >
                                                    <ExternalLink className="h-4 w-4 mr-2" />
                                                    Xem CV
                                                </Button>
                                            )}
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleViewDetail(application)}
                                            >
                                                <Eye className="h-4 w-4 mr-2" />
                                                Xem chi tiết
                                            </Button>
                                            <Button
                                                size="sm"
                                                onClick={() => handleViewProject(application.projectId)}
                                                className="bg-[#2a9d8f] hover:bg-[#21867a]"
                                            >
                                                Xem dự án
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {selectedApplication && (
                <CandidateDetailModal
                    isOpen={isDetailModalOpen}
                    onClose={() => {
                        setIsDetailModalOpen(false)
                        setSelectedApplication(null)
                    }}
                    candidate={{
                        id: selectedApplication.id,
                        userId: selectedApplication.userId,
                        name: selectedApplication.projectName,
                        cvUrl: selectedApplication.cvUrl || '',
                        status: selectedApplication.status,
                        appliedAt: selectedApplication.appliedAt,
                        aiScanResult: undefined // Will be fetched separately if needed
                    }}
                />
            )}
        </>
    )
}

