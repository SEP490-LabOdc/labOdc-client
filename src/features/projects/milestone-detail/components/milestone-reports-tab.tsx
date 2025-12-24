import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { History, Eye, Plus, Filter, FileText } from 'lucide-react'
import { ReportDetailModal, SubmitReportModal, ReportTemplateModal, ReportNotice } from './report'
import { usePermission } from '@/hooks/usePermission'
import { useGetProjectMilestoneReports } from '@/hooks/api/projects'
import { ROLE } from '@/const.ts'
import { ReportType, type Report } from '@/hooks/api/report'
import {
  getReportTypeLabel,
  getReportTypeBadge,
  getStatusBadge,
} from '@/helpers/report'
import { Spinner } from '@/components/ui/spinner'
import { getAvatarFallback } from '@/helpers/stringUtils'
import { formatDateOnly } from '@/helpers/datetime'
import { usePopUp } from '@/hooks/usePopUp'

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
    data: reportsResponse,
    isLoading,
  } = useGetProjectMilestoneReports(milestone.id);

  const reports = reportsResponse?.data?.data || [];

  // Get report recipients
  // const { data: recipientsResponse, isLoading: isLoadingRecipients } =
  //   useGetReportRecipients(milestone.projectId, milestone.id);

  // const recipients = recipientsResponse?.data || [];

  const { popUp, handlePopUpOpen, handlePopUpClose } = usePopUp(['reportDetail', 'reportReject', 'reportSubmit', 'reportTemplate'])

  const isMentorOrTalent = hasRole(ROLE.MENTOR, ROLE.USER);

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
                  handlePopUpOpen('reportTemplate', { reportType: selectedReportType !== 'ALL' ? (selectedReportType as ReportType) : ReportType.MILESTONE_REPORT })
                }}
                className="border-[#2a9d8f]/30 text-[#2a9d8f] hover:bg-[#2a9d8f]/10"
              >
                <FileText className="w-4 h-4 mr-2" />
                Mẫu báo cáo
              </Button>
              <Button onClick={() => handlePopUpOpen('reportSubmit')} className="bg-[#264653] hover:bg-[#264653]/90">
                <Plus className="w-4 h-4 mr-2" />
                Tạo Báo cáo
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Spinner className="w-10 h-10" />
            </div>
          ) : (
            <>
              {/* Report Notice for Mentor/Talent */}
              {isMentorOrTalent && (
                <ReportNotice />
              )}

              {/* Recipients Info Section */}
              {/* {isLoadingRecipients ? (
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
              )} */}

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
                    <Button variant="link" onClick={() => handlePopUpOpen('reportSubmit')}>Nộp báo cáo đầu tiên</Button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {reports.map((report: Report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors bg-white shadow-sm">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10 flex-shrink-0 mt-1">
                          <AvatarImage src={report.reporterAvatar} alt={report.reporterName} />
                          <AvatarFallback>
                            {getAvatarFallback(report.reporterName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-gray-500 mb-1">
                            <span className="font-medium text-gray-700">{report.reporterName}</span> • {formatDateOnly(report.createdAt)}
                          </div>
                          <div className="flex items-center gap-2">
                            <p>{getReportTypeBadge(report.reportType)}</p>
                            <p>{getStatusBadge(report.status)}</p>
                          </div>
                          {report.attachmentsUrl.length > 0 && (
                            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                              <History className="w-3 h-3" />
                              <span>{report.attachmentsUrl.length} tệp đính kèm</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <Button variant="ghost" size="sm" onClick={() => handlePopUpOpen('reportDetail', { report })} className="flex-shrink-0">
                        <Eye className="w-4 h-4" /> Xem chi tiết
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <ReportDetailModal
        isOpen={popUp.reportDetail.isOpen}
        onClose={() => handlePopUpClose('reportDetail')}
        report={popUp.reportDetail.data?.report}
        isCompany={isCompany}
        onApprove={() => handlePopUpClose('reportDetail')}
        onRequestChanges={() => handlePopUpOpen('reportReject', { report: popUp.reportDetail.data.report })}
        milestoneId={milestone.id}
      />

      <SubmitReportModal
        isOpen={popUp.reportSubmit.isOpen}
        onClose={() => handlePopUpClose('reportSubmit')}
        onSuccess={() => handlePopUpClose('reportSubmit')}
        lastFeedback={popUp.reportSubmit?.data?.report?.feedback}
        projectId={milestone.projectId}
        milestoneId={milestone.id}
      />

      <ReportTemplateModal
        isOpen={popUp.reportTemplate.isOpen}
        onClose={() => handlePopUpClose('reportTemplate')}
        reportType={popUp.reportTemplate?.data?.reportType}
      />
    </>
  )
}
