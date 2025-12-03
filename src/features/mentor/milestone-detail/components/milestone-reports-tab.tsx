import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  History,
  Eye,
  Plus,
} from 'lucide-react'
import { ReportDetailModal } from '@/features/mentor/milestone-detail/components/report-detail-modal.tsx'
import { RejectReportModal } from '@/features/mentor/milestone-detail/components/reject-report-modal.tsx'
import { SubmitReportModal } from '@/features/mentor/milestone-detail/components/submit-report-modal.tsx'

// --- Types ---
export type ReportStatus = 'SUBMITTED' | 'CHANGES_REQUESTED' | 'APPROVED';
export type UserRole = 'COMPANY' | 'MENTOR' | 'TALENT_LEADER' | 'TALENT_MEMBER';

export interface ReportVersion {
  id: string;
  version: number;
  submittedAt: string;
  submittedBy: string;
  content: string;
  files: { name: string; size: string }[];
  status: ReportStatus;
  feedback?: string;
}

interface Props {
  milestone: any;
  userRole: UserRole;
}

// Mock Data
const MOCK_REPORTS: ReportVersion[] = [
  {
    id: 'r2',
    version: 2,
    submittedAt: '2025-10-20 14:30',
    submittedBy: 'Nguyễn Văn A',
    content: 'Đã cập nhật lại màu sắc UI theo feedback. Đã fix bug login.',
    files: [{ name: 'Source_Code_v2.zip', size: '15MB' }],
    status: 'SUBMITTED',
  },
  {
    id: 'r1',
    version: 1,
    submittedAt: '2025-10-18 09:00',
    submittedBy: 'Nguyễn Văn A',
    content: 'Hoàn thành backend API và Database.',
    files: [{ name: 'Source_Code_v1.zip', size: '14MB' }],
    status: 'CHANGES_REQUESTED',
    feedback: 'Giao diện chưa đúng thiết kế, nút bấm quá nhỏ. Cần sửa lại.',
  },
];

const getStatusBadge = (status: ReportStatus) => {
  switch (status) {
    case 'SUBMITTED': return <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">Đang chờ duyệt</Badge>;
    case 'CHANGES_REQUESTED': return <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">Yêu cầu sửa</Badge>;
    case 'APPROVED': return <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">Đã nghiệm thu</Badge>;
    default: return null;
  }
}

export const MilestoneReportsTab: React.FC<Props> = ({ milestone, userRole }) => {
  const [reports, setReports] = useState<ReportVersion[]>(MOCK_REPORTS);

  // States quản lý hiển thị Modal
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false); // State cho modal nộp bài
  const [selectedReport, setSelectedReport] = useState<ReportVersion | null>(null);

  // Checks logic
  // Cho phép nộp bài nếu chưa có report nào HOẶC report mới nhất bị từ chối
  const canSubmitReport = reports.length === 0 || reports[0].status === 'CHANGES_REQUESTED';
  const isLatestRejected = reports.length > 0 && reports[0].status === 'CHANGES_REQUESTED';

  // --- HANDLERS ---
  const handleOpenDetail = (report: ReportVersion) => {
    setSelectedReport(report);
    setIsDetailOpen(true);
  };

  const handleOpenReject = () => {
    setIsDetailOpen(false);
    setTimeout(() => setIsRejectOpen(true), 100);
  };

  const handleConfirmReject = (reason: string) => {
    if (!selectedReport) return;

    const updated = reports.map(r =>
      r.id === selectedReport.id
        ? { ...r, status: 'CHANGES_REQUESTED' as ReportStatus, feedback: reason }
        : r
    );

    setReports(updated);
    setIsRejectOpen(false);
  };

  const handleApprove = () => {
    if (!selectedReport) return;

    const updated = reports.map(r =>
      r.id === selectedReport.id
        ? { ...r, status: 'APPROVED' as ReportStatus }
        : r
    );

    setReports(updated);
    setIsDetailOpen(false);
    console.log("Approved! Triggering payment release...");
  };

  const handleSubmitNewVersion = (content: string, files: any[]) => {
    const newReport: ReportVersion = {
      id: `r${reports.length + 1}`,
      version: reports.length + 1,
      submittedAt: new Date().toLocaleString(),
      submittedBy: 'Nguyễn Văn A', // Lấy từ context
      content: content,
      files: [{ name: 'New_Report.zip', size: '10MB' }], // Mock file upload
      status: 'SUBMITTED'
    };

    setReports([newReport, ...reports]); // Thêm report mới lên đầu
    setIsSubmitOpen(false);
  };

  // --- GIAO DIỆN CHÍNH ---
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Lịch sử Báo cáo & Nghiệm thu</CardTitle>
            <CardDescription>Theo dõi các phiên bản báo cáo đã nộp cho milestone này.</CardDescription>
          </div>

          {/* Nút Tạo Báo Cáo (Chỉ hiện cho Mentor khi đủ điều kiện) */}
          {userRole === 'MENTOR' && canSubmitReport && (
            <Button onClick={() => setIsSubmitOpen(true)} className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="w-4 h-4 mr-2" />
              {isLatestRejected ? 'Nộp Phiên bản Mới' : 'Tạo Báo cáo'}
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {reports.length === 0 ? (
            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed">
              <p>Chưa có báo cáo nào được nộp.</p>
              {userRole === 'MENTOR' && (
                <Button variant="link" onClick={() => setIsSubmitOpen(true)}>Nộp báo cáo đầu tiên</Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors bg-white shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-gray-100 rounded-full mt-1">
                      <History className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900">Phiên bản {report.version}</span>
                        {getStatusBadge(report.status)}
                      </div>
                      <div className="text-sm text-gray-500 mb-1">
                        Nộp bởi: <span className="font-medium text-gray-700">{report.submittedBy}</span> • {report.submittedAt}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-1 max-w-md">{report.content}</p>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" onClick={() => handleOpenDetail(report)}>
                    <Eye className="w-4 h-4 mr-2" /> Xem chi tiết
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* --- CÁC MODAL --- */}

      {/* 1. Xem chi tiết */}
      <ReportDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        report={selectedReport}
        userRole={userRole}
        isLatest={selectedReport?.id === reports[0].id}
        onApprove={handleApprove}
        onRequestChanges={handleOpenReject}
      />

      {/* 2. Từ chối / Yêu cầu sửa */}
      <RejectReportModal
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        onConfirm={handleConfirmReject}
      />

      {/* 3. Nộp báo cáo mới */}
      <SubmitReportModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        onSubmit={handleSubmitNewVersion}
        versionNumber={reports.length + 1}
        lastFeedback={isLatestRejected ? reports[0].feedback : undefined}
      />
    </>
  )
}