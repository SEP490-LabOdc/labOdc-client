import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useGetProjectClosureRequest } from '@/hooks/api/projects/queries'
import { useUser } from '@/context/UserContext'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Loader2 } from 'lucide-react'
import { ProjectClosureStatus } from '@/hooks/api/projects/enums'
import type { ProjectClosureRequest } from '@/hooks/api/projects/types'
import { usePermission } from '@/hooks/usePermission'
import { Button } from '@/components/ui/button'
import { ReviewClosureRequestModal } from './review-closure-request-modal'
import { useCancelClosureRequest } from '@/hooks/api/projects/mutation'
import { toast } from 'sonner'
import { ConfirmDialog } from '@/components/confirm-dialog'

interface ProjectActivityTabProps {
  projectId: string;
}

export const ProjectActivityTab = ({ projectId }: ProjectActivityTabProps) => {
  const { user } = useUser()
  const { isLabAdmin, isMentor, isCompany } = usePermission()
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null)
  const [reviewType, setReviewType] = useState<'lab-admin' | 'company'>('lab-admin')
  const [requestToCancel, setRequestToCancel] = useState<string | null>(null)
  
  const { data: requests, isLoading } = useGetProjectClosureRequest({
    projectId,
    role: user?.role || ''
  })

  const { mutateAsync: cancelRequest, isPending: isCanceling } = useCancelClosureRequest()

  const handleCancelRequest = async () => {
    if (!requestToCancel) return

    try {
      await cancelRequest({
        projectId,
        requestId: requestToCancel
      })
      toast.success('Đã hủy yêu cầu đóng dự án')
      setRequestToCancel(null)
    } catch (error) {
      console.error(error)
      toast.error('Không thể hủy yêu cầu')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case ProjectClosureStatus.APPROVED:
        return 'bg-green-100 text-green-800 hover:bg-green-100'
      case ProjectClosureStatus.REJECTED_BY_LAB_ADMIN:
      case ProjectClosureStatus.REJECTED_BY_COMPANY:
        return 'bg-red-100 text-red-800 hover:bg-red-100'
      case ProjectClosureStatus.PENDING_LAB_ADMIN:
      case ProjectClosureStatus.PENDING_COMPANY:
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
      case ProjectClosureStatus.CANCELLED:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case ProjectClosureStatus.APPROVED:
        return 'Đã duyệt'
      case ProjectClosureStatus.REJECTED_BY_LAB_ADMIN:
        return 'Từ chối bởi Lab Admin'
      case ProjectClosureStatus.REJECTED_BY_COMPANY:
        return 'Từ chối bởi Doanh nghiệp'
      case ProjectClosureStatus.PENDING_LAB_ADMIN:
        return 'Chờ Lab Admin duyệt'
      case ProjectClosureStatus.PENDING_COMPANY:
        return 'Chờ Doanh nghiệp duyệt'
      case ProjectClosureStatus.CANCELLED:
        return 'Đã hủy'
      default:
        return status
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lịch sử yêu cầu đóng dự án</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {requests && requests.data.length > 0 ? (
          <div className="space-y-4">
            {requests.data.map((request: ProjectClosureRequest) => {
              const isCreatorInfoMissing = !request.createdByName;
              const creatorName = isCreatorInfoMissing ? user?.name : request.createdByName;
              const creatorAvatar = isCreatorInfoMissing ? user?.avatarUrl : request.createdByAvatar;
              const isCurrentUser = isCreatorInfoMissing || (user?.id && request.createdBy === user.id);
              
              const canCancel = isMentor && isCurrentUser && (
                request.status === ProjectClosureStatus.PENDING_LAB_ADMIN || 
                request.status === ProjectClosureStatus.PENDING_COMPANY
              );

              return (
                <div 
                  key={request.id} 
                  className="p-4 border border-border rounded-lg bg-card hover:bg-accent/5 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-border">
                        <AvatarImage src={creatorAvatar} />
                        <AvatarFallback>{creatorName?.[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {creatorName}
                          {isCurrentUser && <span className="text-muted-foreground font-normal ml-1">(Bạn)</span>}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {request.createdAt ? format(new Date(request.createdAt), 'dd/MM/yyyy HH:mm') : ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="secondary" className={`w-fit ${getStatusColor(request.status)}`}>
                        {getStatusText(request.status)}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pl-1">
                    <div className="grid grid-cols-[80px_1fr] gap-2 text-sm">
                      <span className="font-medium text-muted-foreground">Lý do:</span>
                      <span className="text-foreground">{request.reason}</span>
                    </div>
                    
                    <div className="space-y-1.5">
                      <p className="text-sm font-medium text-muted-foreground">Tóm tắt kết quả:</p>
                      <div className="bg-muted/30 p-3 rounded-md border border-border/50 text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                        {request.summary}
                      </div>
                    </div>

                    <div className="flex justify-end pt-2 border-t border-border/50 mt-3 gap-2">
                      {isLabAdmin && request.status === ProjectClosureStatus.PENDING_LAB_ADMIN && (
                        <Button 
                          size="sm" 
                          onClick={() => {
                            setSelectedRequestId(request.id)
                            setReviewType('lab-admin')
                          }}
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          Duyệt yêu cầu
                        </Button>
                      )}

                      {isCompany && request.status === ProjectClosureStatus.PENDING_COMPANY && (
                        <Button 
                          size="sm" 
                          onClick={() => {
                            setSelectedRequestId(request.id)
                            setReviewType('company')
                          }}
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          Duyệt yêu cầu
                        </Button>
                      )}

                      {canCancel && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setRequestToCancel(request.id)}
                          className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                        >
                          Hủy yêu cầu
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center mb-3">
              <svg
                className="h-6 w-6 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-foreground">Không có dữ liệu</h3>
            <p className="text-sm text-muted-foreground mt-1">Chưa có yêu cầu đóng dự án nào được tạo.</p>
          </div>
        )}

        <ReviewClosureRequestModal
          open={!!selectedRequestId}
          onOpenChange={(open) => !open && setSelectedRequestId(null)}
          projectId={projectId}
          requestId={selectedRequestId || ''}
          onSuccess={() => setSelectedRequestId(null)}
          reviewType={reviewType}
        />

        <ConfirmDialog
          open={!!requestToCancel}
          onOpenChange={(open) => !open && setRequestToCancel(null)}
          title="Xác nhận hủy yêu cầu"
          desc="Bạn có chắc chắn muốn hủy yêu cầu đóng dự án này không? Hành động này không thể hoàn tác."
          confirmText={isCanceling ? "Đang hủy..." : "Hủy yêu cầu"}
          cancelBtnText="Không"
          handleConfirm={handleCancelRequest}
          isLoading={isCanceling}
          className="bg-red-600 hover:bg-red-700 text-white"
        />
      </CardContent>
    </Card>
  )
}