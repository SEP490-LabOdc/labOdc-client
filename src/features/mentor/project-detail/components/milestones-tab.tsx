import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { CalendarDays, CheckCircle2, Circle, Clock, Plus, Users } from 'lucide-react'
import { getStatusColor } from '@/lib/utils'
import { getAvatarFallback } from '@/helpers/stringUtils'
import { useNavigate } from '@tanstack/react-router'
import type { Milestone } from '@/hooks/api/projects/types'
import { CreateMilestoneModal } from '@/features/mentor/project-detail/components/create-milestone-modal.tsx'
import { Button } from '@/components/ui/button.tsx'

interface MilestonesTabProps {
  milestones: Milestone[]
  projectId: string
  onRefresh?: () => void
}

export const MilestonesTab: React.FC<MilestonesTabProps> = ({
                                                              milestones,
                                                              projectId,
                                                              onRefresh
}) => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const calculateProgress = (startDate: string, endDate: string): number => {
    const start = new Date(startDate).getTime()
    const end = new Date(endDate).getTime()
    const now = Date.now()

    if (now < start) return 0
    if (now > end) return 100

    return Math.round(((now - start) / (end - start)) * 100)
  }

  const getStatusIcon = (status: string) => {
    switch (status.toUpperCase()) {
      case 'COMPLETED':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case 'IN_PROGRESS':
        return <Clock className="h-4 w-4 text-blue-600" />
      default:
        return <Circle className="h-4 w-4 text-gray-400" />
    }
  }

  const statusLabels: Record<string, string> = {
    PLANNING: 'Đang lên kế hoạch',
    IN_PROGRESS: 'Đang thực hiện',
    COMPLETED: 'Hoàn thành',
    ON_HOLD: 'Tạm dừng',
  }

  const handleNavigateToMilestone = async (milestoneId: string) => {
    await navigate({ to: `/mentor/projects/$projectId/${milestoneId}/` })
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Milestones</h2>
        <Button onClick={() => setIsModalOpen(true)} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Tạo Milestone
        </Button>
      </div>
      {milestones.map((milestone) => {
        const talents = milestone.talents || []
        const mentors = milestone.mentors || []
        const progress = calculateProgress(milestone.startDate, milestone.endDate)

        return (
          <Card key={milestone.id} className="hover:shadow-md transition-shadow">
            <CardContent>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getStatusIcon(milestone.status)}
                </div>

                <div className="flex-1 min-w-0 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-semibold text-sm truncate hover:text-blue-600 cursor-pointer"
                        onClick={() => handleNavigateToMilestone(milestone.id)}
                      >
                        {milestone.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{milestone.description}</p>
                    </div>
                    <Badge className={`${getStatusColor(milestone.status)} rounded-full text-xs flex-shrink-0`}>
                      {statusLabels[milestone.status] || milestone.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />
                      <span>
                        {new Date(milestone.startDate).toLocaleDateString('vi-VN')} -{' '}
                        {new Date(milestone.endDate).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <span className="font-medium text-gray-800">{progress}%</span>
                  </div>

                  <Progress value={progress} className="h-1.5" />

                  <div className="flex items-center gap-6 pt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <Users className="h-3.5 w-3.5" />
                        <span>Talents</span>
                      </div>
                      <div className="flex -space-x-2">
                        {talents.length > 0 ? (
                          talents.slice(0, 3).map((talent) => (
                            <Avatar key={talent.userId} className="h-6 w-6 border-2 border-white">
                              <AvatarImage src={talent.avatar} alt={talent.name} />
                              <AvatarFallback className="text-xs">
                                {getAvatarFallback(talent.name)}
                              </AvatarFallback>
                            </Avatar>
                          ))
                        ) : (
                          <span className="text-xs text-gray-400">Chưa có</span>
                        )}
                        {talents.length > 3 && (
                          <div className="h-6 w-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">+{talents.length - 3}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <Users className="h-3.5 w-3.5" />
                        <span>Mentors</span>
                      </div>
                      <div className="flex -space-x-2">
                        {mentors.length > 0 ? (
                          mentors.slice(0, 3).map((mentor) => (
                            <Avatar key={mentor.userId} className="h-6 w-6 border-2 border-white">
                              <AvatarImage src={mentor.avatar} alt={mentor.name} />
                              <AvatarFallback className="text-xs">
                                {getAvatarFallback(mentor.name)}
                              </AvatarFallback>
                            </Avatar>
                          ))
                        ) : (
                          <span className="text-xs text-gray-400">Chưa có</span>
                        )}
                        {mentors.length > 3 && (
                          <div className="h-6 w-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">+{mentors.length - 3}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}

      {milestones.length === 0 && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center text-gray-500">
              <Clock className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-sm">Chưa có milestone nào được tạo</p>
            </div>
          </CardContent>
        </Card>
      )}

      <CreateMilestoneModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        projectId={projectId}
        onSuccess={onRefresh}
      />
    </div>
  )
}
