import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { History, Eye, Plus, AlertCircle, Filter, FileText } from 'lucide-react'
import { ReportDetailModal } from '@/features/projects/milestone-detail/components/report-detail-modal'
import { RejectReportModal } from '@/features/projects/milestone-detail/components/reject-report-modal'
import { SubmitReportModal } from '@/features/projects/milestone-detail/components/submit-report-modal'
import { ReportTemplateModal } from '@/features/projects/milestone-detail/components/report-template-modal'
import { usePermission } from '@/hooks/usePermission'
import { useGetProjectMilestoneReports } from '@/hooks/api/projects'
import { useGetReportRecipients } from '@/hooks/api/projects'
import type { ReportRecipient } from '@/hooks/api/projects/types'
import { ROLE } from '@/const.ts'
import { ReportType } from '@/hooks/api/report'
import {
  mapApiReportsToUI,
  getReportTypeLabel,
  getReportTypeBadge,
  getStatusBadge,
  type ReportVersion,
} from '@/helpers/report'

interface Props {
  milestone: {
    id: string;
    projectId: string;
  };
}

export const MilestoneReportsTab: React.FC<Props> = ({ milestone }) => {
  const { hasRole, isCompany } = usePermission();

  // Filter state
  const [selectedReportType, setSelectedReportType] = useState<string>('ALL');

  // API Query
  const {
    data: apiResponse,
    isLoading,
    isError,
    refetch,
  } = useGetProjectMilestoneReports(milestone.id);

  // Get report recipients
  const { data: recipientsResponse, isLoading: isLoadingRecipients } =
    useGetReportRecipients(milestone.projectId, milestone.id);

  const recipients = recipientsResponse?.data || [];

  // Map API data to UI format and filter by reportType
  const reports = useMemo(() => {
    if (!apiResponse?.data?.data) return [];
    // Sort by createdAt descending (newest first)
    const sortedReports = [...apiResponse.data.data].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    const mappedReports = mapApiReportsToUI(sortedReports);

    // Filter by reportType if selected
    if (selectedReportType === 'ALL') {
      return mappedReports;
    }
    return mappedReports.filter((report) => report.reportType === selectedReportType);
  }, [apiResponse, selectedReportType]);

  // States quản lý hiển thị Modal
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ReportVersion | null>(null);
  const [selectedTemplateType, setSelectedTemplateType] = useState<ReportType | undefined>(undefined);

  // Checks logic
  const isLatestRejected = reports.length > 0 && reports[0].status === 'CHANGES_REQUESTED';
  const isMentorOrTalent = hasRole(ROLE.MENTOR, ROLE.USER);

  // --- HANDLERS ---
  const handleOpenDetail = (report: ReportVersion) => {
    setSelectedReport(report);
    setIsDetailOpen(true);
  };

  const handleOpenReject = () => {
    setIsDetailOpen(false);
    setTimeout(() => setIsRejectOpen(true), 100);
  };

  const handleConfirmReject = async (_reason: string) => {
    if (!selectedReport) return;

    // API call sẽ được thực hiện trong RejectReportModal với reason
    // Sau khi thành công, refetch data
    setIsRejectOpen(false);
    await refetch();
  };

  const handleApprove = async () => {
    if (!selectedReport) return;

    // API call sẽ được thực hiện trong ReportDetailModal
    // Sau khi thành công, refetch data
    setIsDetailOpen(false);
    await refetch();
    console.log("Approved! Triggering payment release...");
  };

  const handleSubmitSuccess = async () => {
    // Refetch reports after successful submission
    await refetch();
    setIsSubmitOpen(false);
  };

  // Loading State
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-4 w-96 mt-2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Error State
  if (isError) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 text-red-800">
            <AlertCircle className="h-6 w-6 flex-shrink-0" />
            <div>
              <p className="font-semibold">Không thể tải danh sách báo cáo</p>
              <p className="text-sm">Vui lòng thử lại sau</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => refetch()} className="ml-auto">
              Thử lại
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Lịch sử Báo cáo & Nghiệm thu</CardTitle>
            <CardDescription>Theo dõi các báo cáo đã nộp cho milestone này.</CardDescription>
          </div>

          {isMentorOrTalent && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedTemplateType(selectedReportType !== 'ALL' ? (selectedReportType as ReportType) : ReportType.MILESTONE_REPORT)
                  setIsTemplateOpen(true)
                }}
                className="border-[#2a9d8f]/30 text-[#2a9d8f] hover:bg-[#2a9d8f]/10"
              >
                <FileText className="w-4 h-4 mr-2" />
                Mẫu báo cáo
              </Button>
              <Button onClick={() => setIsSubmitOpen(true)} className="bg-[#264653] hover:bg-[#264653]/90">
                <Plus className="w-4 h-4 mr-2" />
                {isLatestRejected ? 'Nộp Phiên bản Mới' : 'Tạo Báo cáo'}
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          {/* Recipients Info Section */}
          {isLoadingRecipients ? (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <Skeleton className="h-4 w-48" />
            </div>
          ) : recipients.length > 0 && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-blue-800">Người nhận báo cáo:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {recipients.map((recipient: ReportRecipient) => (
                  <Badge
                    key={recipient.id}
                    variant="outline"
                    className="bg-white text-blue-700 border-blue-300"
                  >
                    {recipient.name} ({recipient.roleName})
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Filter by Report Type */}
          <div className="mb-4 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Loại báo cáo:</span>
            </div>
            <Select value={selectedReportType} onValueChange={setSelectedReportType}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Tất cả loại báo cáo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Tất cả loại báo cáo</SelectItem>
                <SelectItem value={ReportType.DAILY_REPORT}>{getReportTypeLabel(ReportType.DAILY_REPORT)}</SelectItem>
                <SelectItem value={ReportType.WEEKLY_REPORT}>{getReportTypeLabel(ReportType.WEEKLY_REPORT)}</SelectItem>
                <SelectItem value={ReportType.MILESTONE_REPORT}>{getReportTypeLabel(ReportType.MILESTONE_REPORT)}</SelectItem>
                <SelectItem value={ReportType.DELIVERY_REPORT}>{getReportTypeLabel(ReportType.DELIVERY_REPORT)}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {reports.length === 0 ? (
            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed">
              <p>Chưa có báo cáo nào được nộp{selectedReportType !== 'ALL' ? ` cho loại này` : ''}.</p>
              {isMentorOrTalent && (
                <Button variant="link" onClick={() => setIsSubmitOpen(true)}>Nộp báo cáo đầu tiên</Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors bg-white shadow-sm">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10 flex-shrink-0 mt-1">
                      <AvatarImage src={report.submittedByAvatar} alt={report.submittedBy} />
                      <AvatarFallback>
                        {report.submittedBy.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        {getReportTypeBadge(report.reportType)}
                        {getStatusBadge(report.status)}
                      </div>
                      <div className="text-sm text-gray-500 mb-1">
                        <span className="font-medium text-gray-700">{report.submittedBy}</span> • {report.submittedAt}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{report.content}</p>
                      {report.files.length > 0 && (
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                          <History className="w-3 h-3" />
                          <span>{report.files.length} tệp đính kèm</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button variant="outline" size="sm" onClick={() => handleOpenDetail(report)} className="flex-shrink-0">
                    <Eye className="w-4 h-4 mr-2" /> Xem chi tiết
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <ReportDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        report={selectedReport}
        isCompany={isCompany}
        onApprove={handleApprove}
        onRequestChanges={handleOpenReject}
        milestoneId={milestone.id}
      />

      <RejectReportModal
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        onConfirm={handleConfirmReject}
        reportId={selectedReport?.id || ''}
        milestoneId={milestone.id}
      />

      <SubmitReportModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        onSuccess={handleSubmitSuccess}
        lastFeedback={isLatestRejected ? reports[0]?.feedback : undefined}
        projectId={milestone.projectId}
        milestoneId={milestone.id}
        recipients={recipients}
      />

      <ReportTemplateModal
        isOpen={isTemplateOpen}
        onClose={() => setIsTemplateOpen(false)}
        reportType={selectedTemplateType}
      />
    </>
  )
}
