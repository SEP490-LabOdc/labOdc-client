import React from 'react'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import type { Milestone, Task } from '../../data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Users, User, Plus } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

interface MilestoneOverviewTabProps {
  milestone: Milestone;
  tasks: Task[];
}

export const MilestoneOverviewTab: React.FC<MilestoneOverviewTabProps> = ({ milestone }) => {
  return (
    <div>
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-5">
            <CardTitle className="text-lg font-semibold">Đội ngũ Cột mốc</CardTitle>

            {/* Hàng Team */}
            <div className="flex items-start">
              <div className="w-40 flex-shrink-0 flex items-center gap-3 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                <span>Team</span>
              </div>
              <div className="flex-1 flex flex-wrap items-center gap-2">
                {milestone.team.map((member, index) => (
                  <div key={index} className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm text-gray-800">{member.name}</span>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 text-sm p-1 h-auto">
                  <Plus className="h-4 w-4 mr-1" />
                  Add New
                </Button>
              </div>
            </div>

            {/* Hàng Team Lead */}
            <div className="flex items-start">
              <div className="w-40 flex-shrink-0 flex items-center gap-3 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>Team Lead</span>
              </div>
              <div className="flex-1 flex flex-wrap items-center gap-2">
                {milestone.teamLead.map((member, index) => (
                  <div key={index} className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm text-gray-800">{member.name}</span>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 text-sm p-1 h-auto">
                  <Plus className="h-4 w-4 mr-1" />
                  Add New
                </Button>
              </div>
            </div>
          </div>

          {/* === ĐƯỜNG PHÂN CÁCH === */}
          <Separator />

          {/* === PHẦN 2: MÔ TẢ === */}
          <div className="space-y-4">
            <CardTitle className="text-lg font-semibold">Mô tả Cột mốc</CardTitle>
            <p className="text-sm text-gray-600 leading-relaxed">
              {milestone.description}
            </p>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}