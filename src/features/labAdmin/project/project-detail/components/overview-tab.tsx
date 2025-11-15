import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Button } from '@/components/ui/button'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  FileText,
  Plus,
  CircleDotDashed,
  Users,
  User,
  Tag,
  CheckSquare,
  Briefcase,
  Circle,
  // 1. Thêm icon cho nút mới
  ArrowRight,
} from 'lucide-react'
import { cn, getStatusColor, getTagColor } from '@/lib/utils'
import { PROJECT_STATUS_LABEL } from '../../data/schema';
import { callTypes } from '../../data/data';

export const ProjectOverviewTab: React.FC<any> = ({ initialData }) => {
  const [isHiring, setIsHiring] = useState(false); // Bạn có thể đổi thành true để test

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        {/* Phần Thông tin chung (Tiêu đề) */}
        <div className="flex items-start gap-4">
          <CircleDotDashed className="h-10 w-10 text-purple-600 flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-bold">{initialData?.title}</h2>
            <p className="text-sm text-gray-500">Mã dự án: {initialData?.id}</p>
          </div>
        </div>

        {/* === PHẦN LAYOUT KEY-VALUE === */}
        <div className="space-y-5 pt-4 border-t">

          {/* Hàng Status */}
          <div className="flex items-start">
            <div className="w-40 flex-shrink-0 flex items-center gap-3 text-sm text-gray-600">
              <CheckSquare className="h-4 w-4" />
              <span>Trạng thái</span>
            </div>
            <div className="flex-1">
              {(() => {
                const status = initialData?.status;

                const vietnameseStatusLabel =
                  PROJECT_STATUS_LABEL[status as keyof typeof PROJECT_STATUS_LABEL];

                const badgeColor = callTypes.get(status);

                return (
                  <div className="flex space-x-2">
                    <Badge variant="outline" className={cn(' px-3 py-1 rounded text-xs font-medium', badgeColor)}>
                      {vietnameseStatusLabel}
                    </Badge>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Hàng Hiring */}
          <div className="flex items-start">
            <div className="w-40 flex-shrink-0 flex items-center gap-3 text-sm text-gray-600">
              <Briefcase className="h-4 w-4" />
              <span>Tuyển dụng</span>
            </div>
            <div className="flex-1 flex items-center gap-3">
              <Switch
                id="hiring-status"
                checked={isHiring}
                onCheckedChange={setIsHiring}
              />

              {isHiring ? (
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              ) : (
                <Circle
                  className="h-3 w-3 text-red-500 fill-red-500"
                />
              )}

              <Label
                htmlFor="hiring-status"
                className={`text-sm font-bold ${isHiring ? 'text-green-700' : 'text-red-700'}`}
              >
                {isHiring ? "Dự án đang tuyển" : "Dự án đã đóng tuyển"}
              </Label>
            </div>
          </div>

          {/* === 2. THÊM NÚT ĐIỀU HƯỚNG KHI HIRING === */}
          {isHiring && (
            <div className="flex items-start">
              {/* Giữ lề trái 160px (w-40) để căn chỉnh thẳng hàng */}
              <div className="w-40 flex-shrink-0" />
              <div className="flex-1">
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                // Thêm onClick để điều hướng (ví dụ dùng react-router)
                // onClick={() => navigate(`/projects/${projectData.id}/candidates`)}
                >
                  Xem danh sách ứng viên
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
          {/* === HẾT PHẦN CẬP NHẬT === */}

          {/* Hàng Team Lead */}
          <div className="flex items-start">
            <div className="w-40 flex-shrink-0 flex items-center gap-3 text-sm text-gray-600">
              <User className="h-4 w-4" />
              <span>Mentor</span>
            </div>
            <div className="flex-1 flex flex-wrap items-center gap-2">
              {initialData?.mentors.map((member: any) => (
                <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-sm text-gray-800">{member.name}</span>
                </div>
              ))}
              {
                initialData?.mentors.length < 2 && (
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 text-sm p-1 h-auto">
                    <Plus className="h-4 w-4 mr-1" />
                    Thêm mới
                  </Button>
                )
              }

            </div>
          </div>

          {/* Hàng Tags */}
          <div className="flex items-start">
            <div className="w-40 flex-shrink-0 flex items-center gap-3 text-sm text-gray-600">
              <Tag className="h-4 w-4" />
              <span>Kỹ năng</span>
            </div>
            <div className="flex-1 flex flex-wrap items-center gap-2">
              <TooltipProvider>
                <div className="flex-1 flex flex-wrap items-center gap-2">
                  {initialData?.skills.map((skill: any) => (
                    <Tooltip key={skill.id}>
                      <TooltipTrigger>
                        <Badge
                          variant="secondary"
                          className="text-sm px-3 py-1 cursor-help"
                        >
                          {skill.name}
                        </Badge>
                      </TooltipTrigger>

                      {skill.description && (
                        <TooltipContent className="max-w-xs">
                          {skill.description}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
            </div>
          </div>

          {/* Hàng Description */}
          <div className="flex items-start">
            <div className="w-40 flex-shrink-0 flex items-center gap-3 text-sm text-gray-600">
              <FileText className="h-4 w-4" />
              <span>Mô tả</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 leading-relaxed">{initialData?.description}</p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}