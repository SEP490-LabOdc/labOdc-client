import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Users,
  Unlock,
  ArrowRight
} from 'lucide-react'
import { getRoleBasePath } from '@/lib/utils'
import { usePermission } from '@/hooks/usePermission'
import { useNavigate } from '@tanstack/react-router'
import type { Milestone } from '@/hooks/api/milestones'
import { ConfirmReleaseDialog } from './confirm-release-dialog'
import { MembersAvatarList } from '@/components/members-avatar-list'
import { usePayMilestone } from '@/hooks/api/payment'
import { toast } from 'sonner'
import {
  usePreviewDisbursement,
  useCalculateDisbursement,
  useExecuteDisbursement,
} from '@/hooks/api/disbursement'
import { MilestoneInfoSection } from './milestone-info-section'
import { PaymentStatusRenderer } from './payment-status-renderer'
import { PendingDepositAction } from './pending-deposit-action'
import { DepositedAction } from './deposited-action'
import { ReleasedStatus } from './released-status'
import { MentorTalentStatusView } from './mentor-talent-status-view'
import { MilestoneStatus } from '@/hooks/api/milestones/enums'
import { formatVND } from '@/helpers/currency'

interface MilestoneSidebarProps {
  milestone: Milestone
  paymentStatus?: MilestoneStatus
  projectId?: string
}

export const MilestoneSidebar: React.FC<MilestoneSidebarProps> = ({
  milestone,
  projectId
}) => {
  const { isCompany, user } = usePermission()
  const navigate = useNavigate()
  const [isConfirmDepositOpen, setIsConfirmDepositOpen] = useState(false)
  const [isConfirmReleaseOpen, setIsConfirmReleaseOpen] = useState(false)
  const payMilestone = usePayMilestone()
  const calculateDisbursement = useCalculateDisbursement()
  const executeDisbursement = useExecuteDisbursement()

  // Map talents to ProjectMember format
  const talents = useMemo(() => {
    return (milestone.talents || []).map((talent: any) => ({
      userId: talent.userId || '',
      fullName: talent.name || 'Unknown',
      email: talent.email || '',
      avatarUrl: talent.avatar || '',
      leader: talent.isLeader || false,
    }))
  }, [milestone.talents])

  // Map mentors to ProjectMember format
  const mentors = useMemo(() => {
    return (milestone.mentors || []).map((mentor: any) => ({
      userId: mentor.userId || '',
      fullName: mentor.name || 'Unknown',
      email: mentor.email || '',
      avatarUrl: mentor.avatar || '',
      leader: mentor.isLeader || false,
    }))
  }, [milestone.mentors])

  const amount = milestone.budget || 0

  // Get mentor leader and talent leader IDs
  const mentorLeaderId = useMemo(() => {
    const leader = mentors.find((m) => m.leader)
    return leader?.userId || ''
  }, [mentors])

  const talentLeaderId = useMemo(() => {
    const leader = talents.find((t) => t.leader)
    return leader?.userId || ''
  }, [talents])

  // Fetch preview disbursement data when DEPOSITED
  const { data: previewData, isLoading: isLoadingPreview } = usePreviewDisbursement(
    {
      milestoneId: milestone.id,
      totalAmount: amount,
    },
  )

  // Use preview data if available, otherwise use calculated values
  const disbursementInfo = useMemo(() => {
    if (previewData?.data) {
      return {
        systemFee: previewData.data.systemFee || amount * 0.1,
        mentorShare: previewData.data.mentorLeader.amount || amount * 0.2,
        teamShare: previewData.data.talentLeader.amount || amount * 0.7,
      }
    }
    return {
      systemFee: amount * 0.1,
      mentorShare: amount * 0.2,
      teamShare: amount * 0.7,
      disbursementId: undefined,
    }
  }, [previewData, amount])

  const systemFee = disbursementInfo.systemFee
  const mentorShare = disbursementInfo.mentorShare
  const teamShare = disbursementInfo.teamShare
  const canRelease = isCompany && milestone.status === MilestoneStatus.PAID

  // Handle nạp tiền vào Escrow
  const handleDepositToEscrow = async () => {
    if (!projectId) {
      toast.error('Không tìm thấy thông tin dự án')
      return
    }

    try {
      const result = await payMilestone.mutateAsync({
        milestoneId: milestone.id,
        projectId: projectId,
        milestoneTitle: milestone.title,
        amount: amount
      })

      if (result.paymentUrl) {
        // Redirect to payment URL
        window.location.href = result.paymentUrl
      } else {
        toast.success('Nạp tiền vào Escrow thành công!')
        setIsConfirmDepositOpen(false)
        // Optionally refresh data here
      }
    } catch (error: any) {
      console.error(error)
    }
  }

  // Handle giải ngân/phân bổ tiền
  const handleReleaseFunds = async () => {
    if (!projectId) {
      toast.error('Không tìm thấy thông tin dự án')
      return
    }

    if (!mentorLeaderId || !talentLeaderId) {
      toast.error('Không tìm thấy leader của mentor hoặc talent')
      return
    }

    try {
      // Step 1: Calculate disbursement
      const calculateResult = await calculateDisbursement.mutateAsync({
        projectId: projectId,
        milestoneId: milestone.id,
        mentorLeaderId: mentorLeaderId,
        talentLeaderId: talentLeaderId,
        totalAmount: amount,
      })

      const disbursementId = calculateResult.data?.disbursementId

      if (!disbursementId) {
        toast.error('Không thể tính toán phân bổ tiền')
        return
      }

      // Step 2: Execute disbursement
      await executeDisbursement.mutateAsync({
        disbursementId: disbursementId,
      })

      toast.success('Giải ngân thành công!')
      setIsConfirmReleaseOpen(false)
      // Optionally refresh data here
    } catch (error: any) {
      toast.error(error?.message || 'Có lỗi xảy ra khi giải ngân')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Chi tiết Milestone</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <MilestoneInfoSection milestone={milestone} />

        <div className="border-t pt-4 space-y-4">
          {/* Mentors Section */}
          {mentors.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Users className="h-4 w-4" />
                <span>Mentors ({mentors.length})</span>
              </div>
              <MembersAvatarList
                members={mentors}
                size="md"
                maxVisible={5}
                showCount={false}
                emptyMessage="Chưa có mentor"
              />
            </div>
          )}

          {/* Talents Section */}
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Users className="h-4 w-4" />
              <span>Talents ({talents.length})</span>
            </div>
            <MembersAvatarList
              members={talents}
              size="md"
              maxVisible={5}
              showCount={false}
              emptyMessage="Chưa có talent"
            />
          </div>

          {/* Navigate to members page */}
          <div className="pt-2">
            <button
              onClick={() => {
                const basePath = getRoleBasePath(user?.role || '')
                navigate({
                  to: `${basePath}/projects/${milestone.projectId}/${milestone.id}/members`,
                })
              }}
              className="flex items-center gap-2 text-sm text-[#2a9d8f] hover:text-[#1e7a6e] transition-colors w-full justify-center py-2 hover:bg-gray-50 rounded-md"
            >
              <span>Xem tất cả thành viên</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Action Section - Giải ngân */}
        {isCompany && (
          <div className="border-t pt-4 space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Unlock className="h-4 w-4 text-[#2a9d8f]" />
              <span>Hành động giải ngân</span>
            </div>

            <PaymentStatusRenderer status={milestone.status as MilestoneStatus}>
              {{
                completed: (
                  <PendingDepositAction
                    onDeposit={() => setIsConfirmDepositOpen(true)}
                    isLoading={payMilestone.isPending}
                  />
                ),
                paid: (
                  <DepositedAction
                    amount={amount}
                    canRelease={canRelease}
                    isLoading={calculateDisbursement.isPending || executeDisbursement.isPending}
                    isLoadingPreview={isLoadingPreview}
                    onRelease={() => setIsConfirmReleaseOpen(true)}
                    formatVND={formatVND}
                  />
                ),
                released: <ReleasedStatus />,
              }}
            </PaymentStatusRenderer>
          </div>
        )}

        {/* View Only for Mentor/Talent */}
        {!isCompany && (
          <MentorTalentStatusView
            status={milestone.status as MilestoneStatus}
            userRole={user?.role || ''}
            mentorShare={mentorShare}
            formatVND={formatVND}
          />
        )}
      </CardContent>

      {/* Confirm Deposit Dialog - Nạp tiền vào Escrow */}
      <ConfirmReleaseDialog
        isOpen={isConfirmDepositOpen}
        onClose={() => setIsConfirmDepositOpen(false)}
        onConfirm={handleDepositToEscrow}
        amount={amount}
        systemFee={systemFee}
        mentorShare={mentorShare}
        teamShare={teamShare}
        isLoading={payMilestone.isPending}
        title="Xác nhận Nạp tiền vào Escrow"
        description={`Bạn có chắc chắn muốn nạp ${formatVND(milestone.budget)} vào Escrow cho milestone này?`}
        showDistribution={false}
      />

      {/* Confirm Release Dialog - Giải ngân */}
      <ConfirmReleaseDialog
        isOpen={isConfirmReleaseOpen}
        onClose={() => setIsConfirmReleaseOpen(false)}
        onConfirm={handleReleaseFunds}
        amount={amount}
        systemFee={systemFee}
        mentorShare={mentorShare}
        teamShare={teamShare}
        isLoading={calculateDisbursement.isPending || executeDisbursement.isPending}
      />
    </Card>
  )
}
