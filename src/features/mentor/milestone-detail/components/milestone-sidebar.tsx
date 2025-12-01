import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CalendarDays, Users, Link } from 'lucide-react'
import { getStatusColor, getStatusLabel } from '@/lib/utils'
import { getAvatarFallback } from '@/helpers/stringUtils'
import type { MilestoneDetail } from '@/hooks/api/milestones/types'

interface MilestoneSidebarProps {
  milestone: MilestoneDetail
}

export const MilestoneSidebar: React.FC<MilestoneSidebarProps> = ({ milestone }) => {
  const calculateDaysRemaining = (endDate: string): string => {
    const end = new Date(endDate)
    const today = new Date()
    const diffTime = end.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return 'Quá hạn'
    if (diffDays === 0) return 'Hôm nay'
    return `${diffDays} ngày`
  }

  const talents = milestone.talents || []
  const mentors = milestone.mentors || []

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Chi tiết Milestone</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Trạng thái:</span>
            <Badge className={`${getStatusColor(milestone.status)} rounded-full`}>
              {getStatusLabel(milestone.status)}
            </Badge>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Ngày bắt đầu:
            </span>
            <span className="font-medium text-gray-800">
              {new Date(milestone.startDate).toLocaleDateString('vi-VN')}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Ngày kết thúc:
            </span>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-800">
                {new Date(milestone.endDate).toLocaleDateString('vi-VN')}
              </span>
              <Badge className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                {calculateDaysRemaining(milestone.endDate)}
              </Badge>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 flex items-center gap-2">
              <Link className="h-4 w-4" />
              Dự án:
            </span>
            <span className="font-medium text-gray-800 hover:underline cursor-pointer">
              {milestone.projectName}
            </span>
          </div>
        </div>

        <div className="border-t pt-4 space-y-4">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Users className="h-4 w-4" />
              <span>Talents ({talents.length})</span>
            </div>
            <div className="space-y-2">
              {talents.length > 0 ? (
                talents.map((talent) => (
                  <div key={talent.userId} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={talent.avatar} />
                      <AvatarFallback className="text-xs">{getAvatarFallback(talent.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{talent.name}</p>
                      <p className="text-xs text-gray-500 truncate">{talent.email}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 text-center py-2">Chưa có thành viên</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Users className="h-4 w-4" />
              <span>Mentors ({mentors.length})</span>
            </div>
            <div className="space-y-2">
              {mentors.length > 0 ? (
                mentors.map((mentor) => (
                  <div key={mentor.userId} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={mentor.avatar} />
                      <AvatarFallback className="text-xs">{getAvatarFallback(mentor.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{mentor.name}</p>
                      <p className="text-xs text-gray-500 truncate">{mentor.email}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 text-center py-2">Chưa có mentor</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
