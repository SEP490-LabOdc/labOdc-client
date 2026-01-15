import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'
import { Button } from '@/components/ui/button'
import { Clock, CheckCircle, XCircle, Calendar, FileText } from 'lucide-react'
import { useGetExtensionRequestsOfCompany } from '@/hooks/api/milestones/queries'
import { MilestoneExtensionRequestStatus } from '@/hooks/api/milestones/enums'
import { formatDateOnly, formatDateLong } from '@/helpers/datetime'
import { usePermission } from '@/hooks/usePermission'
import { usePopUp } from '@/hooks/usePopUp'
import { ApproveRejectModal } from './approve-reject-modal'

interface Props {
    milestone: {
        id: string;
    };
    projectId: string;
    companyId: string;
}

interface ExtensionRequest {
    id: string;
    milestoneId: string;
    requestedEndDate: string;
    currentEndDate: string;
    requestReason: string;
    status: MilestoneExtensionRequestStatus;
    createdAt: string;
    updatedAt?: string;
    reviewReason?: string;
}

const getStatusBadge = (status: MilestoneExtensionRequestStatus) => {
    switch (status) {
        case MilestoneExtensionRequestStatus.PENDING:
            return (
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                    <Clock className="h-3 w-3 mr-1" />
                    Đang chờ duyệt
                </Badge>
            )
        case MilestoneExtensionRequestStatus.APPROVED:
            return (
                <Badge className="bg-green-100 text-green-800 border-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Đã duyệt
                </Badge>
            )
        case MilestoneExtensionRequestStatus.REJECTED:
            return (
                <Badge className="bg-red-100 text-red-800 border-red-200">
                    <XCircle className="h-3 w-3 mr-1" />
                    Đã từ chối
                </Badge>
            )
        default:
            return (
                <Badge variant="outline">
                    {status}
                </Badge>
            )
    }
}

export const ExtensionTab: React.FC<Props> = ({ milestone, projectId, companyId }) => {
    const { isCompany } = usePermission()
    const { popUp, handlePopUpOpen, handlePopUpClose } = usePopUp(['approveRejectER'] as const)

    const {
        data: extensionRequestsResponse,
        isLoading,
        refetch,
    } = useGetExtensionRequestsOfCompany({
        milestoneId: milestone.id,
        projectId,
        companyId: companyId,
        page: 1,
        size: 10,
    })

    // Extract data from API response
    const extensionRequests: ExtensionRequest[] = extensionRequestsResponse?.data?.data as ExtensionRequest[]

    const handleOpenModal = (requestId: string, action: 'approve' | 'reject') => {
        handlePopUpOpen('approveRejectER', { requestId, action })
    }

    const handleCloseModal = () => {
        handlePopUpClose('approveRejectER')
    }

    const handleSuccess = () => {
        refetch()
        handlePopUpClose('approveRejectER')
    }

    const modalData = popUp.approveRejectER.data as { requestId: string; action: 'approve' | 'reject' } | undefined

    return (
        <Card>
            <CardHeader>
                <div>
                    <CardTitle className="text-lg">Lịch sử yêu cầu gia hạn</CardTitle>
                    <CardDescription>Theo dõi các yêu cầu gia hạn milestone mà bạn đã tạo.</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex justify-center items-center h-full py-12">
                        <Spinner className="w-10 h-10" />
                    </div>
                ) : (
                    <>
                        {extensionRequests.length === 0 ? (
                            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-md border border-dashed">
                                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                                <p>Chưa có yêu cầu gia hạn nào được tạo.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {extensionRequests.map((request: ExtensionRequest) => (
                                    <div
                                        key={request.id}
                                        className="flex flex-col gap-4 p-4 border rounded-md hover:bg-gray-50 transition-colors bg-white shadow-sm"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-2">
                                                    {getStatusBadge(request.status)}
                                                    <span className="text-xs text-gray-500">
                                                        Tạo lúc: {formatDateOnly(request.createdAt)}
                                                    </span>
                                                </div>

                                                <div className="space-y-2 mt-3">
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Calendar className="h-4 w-4 text-gray-400" />
                                                        <span className="text-gray-600">Ngày kết thúc hiện tại:</span>
                                                        <span className="font-medium text-gray-900">
                                                            {formatDateLong(request.currentEndDate)}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Calendar className="h-4 w-4 text-gray-400" />
                                                        <span className="text-gray-600">Ngày kết thúc yêu cầu:</span>
                                                        <span className="font-medium text-gray-900">
                                                            {formatDateLong(request.requestedEndDate)}
                                                        </span>
                                                    </div>
                                                </div>

                                                {request.requestReason && (
                                                    <div className="mt-3 p-3 bg-gray-50 rounded-md">
                                                        <div className="flex items-start gap-2">
                                                            <FileText className="h-4 w-4 text-gray-400 shrink-0" />
                                                            <div className="flex item-center gap-2">
                                                                <p className="text-sm font-medium text-gray-500">Lý do gia hạn:</p>
                                                                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                                                    {request.requestReason}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {request.status === MilestoneExtensionRequestStatus.REJECTED && (
                                                    <div className="mt-3 p-3 bg-gray-50 rounded-md">
                                                        <div className="flex items-start gap-2">
                                                            <FileText className="h-4 w-4 text-gray-400 shrink-0" />
                                                            <div className="flex item-center gap-2">
                                                                <p className="text-sm font-medium text-gray-500">Lý do từ chối:</p>
                                                                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                                                    {request.reviewReason}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Action buttons - only show for company and pending requests */}
                                            {isCompany && request.status === MilestoneExtensionRequestStatus.PENDING && (
                                                <div className="flex items-center gap-2 shrink-0">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="text-green-600 border-green-600 hover:bg-green-50"
                                                        onClick={() => handleOpenModal(request.id, 'approve')}
                                                    >
                                                        <CheckCircle className="h-4 w-4 mr-1" />
                                                        Phê duyệt
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="text-red-600 border-red-600 hover:bg-red-50"
                                                        onClick={() => handleOpenModal(request.id, 'reject')}
                                                    >
                                                        <XCircle className="h-4 w-4 mr-1" />
                                                        Từ chối
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </CardContent>

            {/* Approve/Reject Modal */}
            {modalData && (
                <ApproveRejectModal
                    open={popUp.approveRejectER.isOpen}
                    onOpenChange={(open) => {
                        if (!open) {
                            handleCloseModal()
                        }
                    }}
                    milestoneId={milestone.id}
                    extensionRequestId={modalData.requestId}
                    action={modalData.action}
                    onSuccess={handleSuccess}
                />
            )}
        </Card>
    )
}

