import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText } from 'lucide-react'
import type { MilestoneDetail } from '@/hooks/api/milestones/types'

interface MilestoneOverviewTabProps {
  milestone: MilestoneDetail
}

export const MilestoneOverviewTab: React.FC<MilestoneOverviewTabProps> = ({ milestone }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Mô tả Milestone
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
          {milestone.description || 'Chưa có mô tả'}
        </p>
      </CardContent>
    </Card>
  )
}
