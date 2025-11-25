// typescript
import { Badge } from "@/components/ui/badge.tsx";
import { type Project } from '@/hooks/api/projects/types.ts';
import { Clock, Users } from 'lucide-react';
import { Button } from "@/components/ui/button.tsx";
import { useGetProjectApplicationStatus } from '@/hooks/api/projects/queries.ts';
import { format } from 'date-fns';

interface ProjectDetailViewProps {
  project: Project | null
  onApply: (project: Project) => void
}

export function ProjectDetailView({ project, onApply }: ProjectDetailViewProps) {
  const { data: applicationStatus, isLoading: isAppLoading } = useGetProjectApplicationStatus(project?.projectId);

  if (!project) {
    return (
      <div className="p-10 text-center text-gray-500 bg-white rounded-lg shadow-md sticky top-6 h-[calc(100vh-80px)]">
        <Users className="h-8 w-8 mx-auto mb-3" />
        <p className="text-lg font-medium">Chọn một dự án để xem chi tiết yêu cầu</p>
        <p className="text-sm mt-2">Thông tin kỹ năng, thời gian, và mô tả sẽ hiển thị tại đây.</p>
      </div>
    );
  }

  const canApply = applicationStatus?.data?.canApply ?? true;
  const applicationInfo = applicationStatus?.data ?? null;

  const projectDuration = Math.ceil(
    (new Date(project.endDate).getTime() - new Date(project.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30)
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md sticky top-6 overflow-y-auto h-[calc(100vh-80px)]">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-[#264653] text-3xl font-bold">{project.projectName}</h2>
        <p className="text-gray-500 mt-1 mb-3">Chi tiết thông tin dự án</p>

        <Button
          className="w-full bg-red-600 hover:bg-red-700 text-lg py-3 font-bold mt-2"
          onClick={() => onApply(project)}
          disabled={!canApply || isAppLoading}
        >
          {isAppLoading ? 'Đang kiểm tra...' : (!canApply ?  'Đã ứng tuyển' : 'Ứng Tuyển Dự Án Này')}
        </Button>

        {applicationInfo && (
          <div className="mt-3 text-sm text-gray-700">
            <div>Trạng thái: <span className="font-medium">{applicationInfo.status ?? 'Đã nộp'}</span></div>
            {applicationInfo.submittedAt && (
              <div>Thời gian nộp: <span className="font-medium">{format(new Date(applicationInfo.submittedAt), 'dd/MM/yyyy HH:mm')}</span></div>
            )}
            {applicationInfo.fileLink && (
              <div>
                Tệp đính kèm: <a className="text-blue-600 underline" href={applicationInfo.fileLink} target="_blank" rel="noreferrer">{applicationInfo.fileName ?? 'Tải xuống'}</a>
              </div>
            )}
          </div>
        )}
      </div>

      {/* BODY CONTENT */}
      <div className="space-y-6">

        {/* TRẠNG THÁI VÀ SỐ ỨNG VIÊN */}
        <div className="flex items-center gap-4">
          <Badge className="bg-green-100 text-green-800 text-sm px-3 py-1">
            Đang Mở
          </Badge>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <span className="font-medium">{project.currentApplicants}</span>&nbsp;ứng viên đã ứng tuyển
          </div>
        </div>

        {/* MÔ TẢ DỰ ÁN */}
        <div className="space-y-4">
          <h4 className="font-semibold text-[#264653] text-xl">Mô Tả Dự Án</h4>
          <p className="text-gray-700 leading-relaxed">{project.description}</p>
        </div>

        {/* KỸ NĂNG YÊU CẦU */}
        <div className="space-y-4">
          <h4 className="font-semibold text-[#264653] text-xl">Kỹ Năng Yêu Cầu</h4>
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <Badge key={skill.id} className="bg-[#2a9d8f] text-white px-3 py-1 text-sm">
                {skill.name}
              </Badge>
            ))}
          </div>
          <div className="mt-3 text-sm text-gray-700 p-4 bg-gray-50 rounded-lg">
            <p className="font-semibold text-gray-800 mb-2">Chi tiết kỹ năng:</p>
            <ul className="list-disc list-inside space-y-1">
              {project.skills.map((skill) => (
                <li key={skill.id}>
                  <span className="font-medium text-gray-900">{skill.name}:</span> {skill.description}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* GRID 3 CỘT (META DATA) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t">
          <div className="space-y-4">
            <h4 className="font-semibold text-[#264653] text-lg">Thời Gian Dự Án</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Ngày bắt đầu:</span>
                <span className="font-medium">{new Date(project.startDate).toLocaleDateString('vi-VN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ngày kết thúc:</span>
                <span className="font-medium">{new Date(project.endDate).toLocaleDateString('vi-VN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Thời gian thực hiện:</span>
                <span className="font-medium">{projectDuration} tháng</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-[#264653] text-lg">Trạng Thái Ứng Tuyển</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Số ứng viên hiện tại:</span>
                <span className="font-medium">{project.currentApplicants} ứng viên</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hạn ứng tuyển:</span>
                <span className="font-medium text-orange-600">
                  {Math.floor(Math.random() * 10) + 3} ngày nữa
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cơ hội được chọn:</span>
                <span className="font-medium text-green-600">
                  {project.currentApplicants === 0 ? 'Rất cao' :
                    project.currentApplicants < 5 ? 'Cao' : 'Trung bình'}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-[#264653] text-lg">Thông Tin Khác</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Số mentor:</span>
                <span className="font-medium">{project.mentors.length} mentor</span>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>Phản hồi thường trong vòng 24h</span>
              </div>
            </div>
          </div>
        </div>

        {/* LỜI KHUYÊN (Đã bỏ nút ứng tuyển cũ) */}
        <div className="space-y-4 pt-6 border-t">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-[#264653] mb-2 text-lg">💡 Lời khuyên ứng tuyển</h4>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
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
