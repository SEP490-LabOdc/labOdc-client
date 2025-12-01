import React from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Edit, MoreHorizontal, Check, RefreshCw } from 'lucide-react'
import type { MilestoneDetail } from '@/hooks/api/milestones/types'

interface MilestonePageHeaderProps {
  milestone: MilestoneDetail
  onApproveMilestone?: (milestoneId: string) => Promise<void>
  onRequestUpdate?: (milestoneId: string) => Promise<void>
}

export const MilestonePageHeader: React.FC<MilestonePageHeaderProps> = ({
                                                                          milestone,
                                                                          onApproveMilestone,
                                                                          onRequestUpdate
                                                                        }) => {

  const handleApprove = async () => {
    if (onApproveMilestone) {
      try {
        await onApproveMilestone(milestone.id)
      } catch (error) {
        console.error('Failed to approve milestone:', error)
      }
    }
  }

  const handleRequestUpdate = async () => {
    if (onRequestUpdate) {
      try {
        await onRequestUpdate(milestone.id)
      } catch (error) {
        console.error('Failed to request update:', error)
      }
    }
  }

  // Check if milestone is pending approval or needs admin actions
  const showApprovalActions = milestone.status === 'PENDING'
  const showUpdateRequest = milestone.status === 'IN_PROGRESS' || milestone.status === 'PENDING'

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-3">
            {/* Approve Milestone Button */}
            {showApprovalActions && (
              <Button
                onClick={handleApprove}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Check className="h-4 w-4 mr-2" />
                Phê duyệt
              </Button>
            )}

            {/* Request Update Button */}
            {showUpdateRequest && (
              <Button
                variant="outline"
                onClick={handleRequestUpdate}
                className="text-orange-600 border-orange-600 hover:bg-orange-50"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Yêu cầu cập nhật
              </Button>
            )}

            {/* Edit Button */}
            <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
              <Edit className="h-4 w-4 mr-2" />
              Sửa Milestone
            </Button>

            {/* More Actions Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Đánh dấu Hoàn thành</DropdownMenuItem>
                <DropdownMenuItem>Gửi thông báo</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Xóa Milestone</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}
