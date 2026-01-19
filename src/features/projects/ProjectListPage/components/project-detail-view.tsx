import { Badge } from "@/components/ui/badge.tsx";
import { type Project } from '@/hooks/api/projects/types.ts';
import { Clock, Users, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button.tsx";
import { useGetProjectApplicationStatus } from '@/hooks/api/projects/queries.ts';
import { format } from 'date-fns';
import { getCandidateStatusLabel, getCandidateStatusColor } from '@/lib/utils';

interface ProjectDetailViewProps {
  project: Project | null
  onApply: (project: Project) => void
}

export function ProjectDetailView({ project, onApply }: ProjectDetailViewProps) {
  const { data: applicationStatus, isLoading: isAppLoading } = useGetProjectApplicationStatus(project?.projectId);

  if (!project) {
    return (
      <div className="p-10 text-center text-muted-foreground bg-card rounded-md shadow-md sticky top-6 h-[calc(100vh-80px)] border border-border">
        <Users className="h-8 w-8 mx-auto mb-3" />
        <p className="text-lg font-medium">Chọn một dự án để xem chi tiết yêu cầu</p>
        <p className="text-sm mt-2">Thông tin kỹ năng, thời gian, và mô tả sẽ hiển thị tại đây.</p>
      </div>
    );
  }

  const canApply = applicationStatus?.data?.canApply ?? true;
  const applicationInfo = applicationStatus?.data ?? null;
  const hasApplied = applicationInfo && !canApply;

  const projectDuration = Math.ceil(
    (new Date(project.endDate).getTime() - new Date(project.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30)
  );

  const getStatusIcon = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'PENDING':
        return <AlertCircle className="h-4 w-4" />
      case 'APPROVED':
        return <CheckCircle2 className="h-4 w-4" />
      case 'REJECTED':
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="bg-card p-6 rounded-md shadow-md sticky top-6 overflow-y-auto h-[calc(100vh-80px)] border border-border">
      <div className="border-b border-border pb-4 mb-4">
        <h2 className="text-foreground text-3xl font-bold">{project.projectName}</h2>
        <p className="text-muted-foreground mt-1 mb-3">Chi tiết thông tin dự án</p>

        <Button
          className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white text-lg py-3 font-bold mt-2 shadow-lg hover:shadow-xl transition-all"
          onClick={() => onApply(project)}
          disabled={!canApply || isAppLoading}
        >
          {isAppLoading ? 'Đang kiểm tra...' : (!canApply ? 'Đã ứng tuyển' : 'Ứng Tuyển Dự Án Này')}
        </Button>

        {/* Chỉ hiển thị khi đã apply */}
        {hasApplied && applicationInfo?.status && (
          <div className={`mt-3 rounded-md border-2 p-4 ${getCandidateStatusColor(applicationInfo.status)}`}>
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-0.5">
                {getStatusIcon(applicationInfo.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm mb-2">
                  Trạng thái đơn ứng tuyển: {getCandidateStatusLabel(applicationInfo.status)}
                </div>
                <div className="space-y-1.5 text-xs">
                  {applicationInfo.submittedAt && (
                    <div className="text-foreground/80">
                      <span className="font-medium">Thời gian nộp:</span>{' '}
                      {format(new Date(applicationInfo.submittedAt), 'dd/MM/yyyy HH:mm')}
                    </div>
                  )}
                  {applicationInfo.fileLink && (
                    <div className="text-foreground/80">
                      <span className="font-medium">Tệp đính kèm:</span>{' '}
                      <a
                        className="text-primary underline hover:text-primary/80 break-all"
                        href={applicationInfo.fileLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {applicationInfo.fileName ?? 'Tải xuống'}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* BODY CONTENT */}
      <div className="space-y-6">

        {/* TRẠNG THÁI VÀ SỐ ỨNG VIÊN */}
        <div className="flex items-center gap-4">
          <Badge className="bg-secondary/20 text-secondary text-sm px-3 py-1 border-secondary/30">
            Đang Mở
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-2" />
            <span className="font-medium">{project.currentApplicants}</span>&nbsp;ứng viên đã ứng tuyển
          </div>
        </div>

        {/* MÔ TẢ DỰ ÁN */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground text-xl">Mô Tả Dự Án</h4>
          <p className="text-foreground/80 leading-relaxed">{project.description}</p>
        </div>

        {/* KỸ NĂNG YÊU CẦU */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground text-xl">Kỹ Năng Yêu Cầu</h4>
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <Badge key={skill.id} className="bg-secondary text-secondary-foreground px-3 py-1 text-sm">
                {skill.name}
              </Badge>
            ))}
          </div>
          <div className="mt-3 text-sm text-foreground/80 p-4 bg-muted rounded-md">
            <p className="font-semibold text-foreground mb-2">Chi tiết kỹ năng:</p>
            <ul className="list-disc list-inside space-y-1">
              {project.skills.map((skill) => (
                <li key={skill.id}>
                  <span className="font-medium text-foreground">{skill.name}:</span> {skill.description}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* GRID 3 CỘT (META DATA) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-border">
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-lg">Thời Gian Dự Án</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ngày bắt đầu:</span>
                <span className="font-medium text-foreground">{project.startDate ? new Date(project.startDate).toLocaleDateString('vi-VN') : 'Không xác định'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ngày kết thúc:</span>
                <span className="font-medium text-foreground">{project.endDate ? new Date(project.endDate).toLocaleDateString('vi-VN') : 'Không xác định'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Thời gian thực hiện:</span>
                <span className="font-medium text-foreground">{projectDuration} tháng</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-lg">Trạng Thái Ứng Tuyển</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Số ứng viên hiện tại:</span>
                <span className="font-medium text-foreground">{project.currentApplicants} ứng viên</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Hạn ứng tuyển:</span>
                <span className="font-medium text-brand-orange">
                  {Math.floor(Math.random() * 10) + 3} ngày nữa
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cơ hội được chọn:</span>
                <span className="font-medium text-secondary">
                  {project.currentApplicants === 0 ? 'Rất cao' :
                    project.currentApplicants < 5 ? 'Cao' : 'Trung bình'}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-lg">Thông Tin Khác</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Số mentor:</span>
                <span className="font-medium text-foreground">{project.mentors.length} mentor</span>
              </div>
            </div>

            <div className="p-3 bg-muted rounded-md">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-2 shrink-0" />
                <span>Phản hồi thường trong vòng 24h</span>
              </div>
            </div>
          </div>
        </div>

        {/* LỜI KHUYÊN (Đã bỏ nút ứng tuyển cũ) */}
        <div className="space-y-4 pt-6 border-t border-border">
          <div className="bg-primary/5 p-4 rounded-md border border-primary/10">
            <h4 className="font-semibold text-foreground mb-2 text-lg">💡 Lời khuyên ứng tuyển</h4>
            <ul className="text-sm text-foreground/80 space-y-1 list-disc list-inside">
              <li>Đọc kỹ mô tả dự án và yêu cầu kỹ năng</li>
              <li>Chuẩn bị portfolio phù hợp với công nghệ sử dụng</li>
              <li>Viết cover letter thể hiện hiểu biết về dự án</li>
              <li>Đề xuất timeline và phương pháp thực hiện cụ thể</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
