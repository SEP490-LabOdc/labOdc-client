import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'
import { Clock, CheckCircle, XCircle, Calendar, FileText } from 'lucide-react'
import { useGetMyMilestoneExtensionRequests } from '@/hooks/api/milestones/queries'
import { MilestoneExtensionRequestStatus } from '@/hooks/api/milestones/enums'
import { formatDateOnly, formatDateLong } from '@/helpers/datetime'

interface Props {
    milestone: {
        id: string;
    };
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

export const ExtensionTab: React.FC<Props> = ({ milestone }) => {
    const {
        data: extensionRequestsResponse,
        isLoading,
    } = useGetMyMilestoneExtensionRequests(milestone.id)

    // Extract data from API response
    const extensionRequests: ExtensionRequest[] =
        (extensionRequestsResponse?.data?.data || extensionRequestsResponse?.data || []) as ExtensionRequest[]

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
                            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed">
                                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                                <p>Chưa có yêu cầu gia hạn nào được tạo.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {extensionRequests.map((request: ExtensionRequest) => (
                                    <div
                                        key={request.id}
                                        className="flex flex-col gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors bg-white shadow-sm"
                                    >
                                        <div className="flex items-start justify-between">
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
                                                            <FileText className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                                            <div className="flex-1">
                                                                <p className="text-xs font-medium text-gray-500 mb-1">Lý do gia hạn:</p>
                                                                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                                                    {request.requestReason}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    )
}

