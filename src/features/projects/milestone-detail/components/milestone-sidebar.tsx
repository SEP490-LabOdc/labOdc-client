import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Users,
  Unlock,
  ArrowRight,
  UserPlus
} from 'lucide-react'
import { getRoleBasePath } from '@/lib/utils'
import { usePermission } from '@/hooks/usePermission'
import { useNavigate } from '@tanstack/react-router'
import { useAddMentorIntoMilestone, type Milestone } from '@/hooks/api/milestones'
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
import { Button } from '@/components/ui/button'
import { AddMemberModal } from '@/features/projects/components/add-member-modal'
import { 
  useAddTalentToMilestone, 
  useGetProjectMembers
} from '@/hooks/api/projects'
import { UserRole } from '@/hooks/api/users/enums'

interface MilestoneSidebarProps {
  milestone: Milestone
  projectId: string
  onRefresh?: () => void
}

export const MilestoneSidebar: React.FC<MilestoneSidebarProps> = ({
  milestone,
  projectId,
  onRefresh
}) => {
  const { isCompany, isMentor, isLabAdmin, user } = usePermission()
  const navigate = useNavigate()
  const [isConfirmDepositOpen, setIsConfirmDepositOpen] = useState(false)
  const [isConfirmReleaseOpen, setIsConfirmReleaseOpen] = useState(false)
  const payMilestone = usePayMilestone()
  const calculateDisbursement = useCalculateDisbursement()
  const executeDisbursement = useExecuteDisbursement()
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false)
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string | null>(null)
  const [targetRole, setTargetRole] = useState<UserRole>(UserRole.TALENT)

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

  // Fetch ALL project members (candidates for both Mentor and Talent)
  const { data: projectMembersData } = useGetProjectMembers(projectId)

  const addTalentMutation = useAddTalentToMilestone()
  const addMentorMutation = useAddMentorIntoMilestone()

  // Filter out members who are already in the milestone
  const filteredProjectMembers = useMemo(() => {
    const isMentorTarget = targetRole === UserRole.MENTOR
    
    // Select source list
    const sourceList = projectMembersData?.data || []

    // Get current members in milestone to check against
    const currentMilestoneMemberIds = isMentorTarget
      ? mentors.map(m => m.userId)
      : talents.map(t => t.userId)

    // Return only those NOT in the current milestone AND NOT the current user
    return sourceList.filter((candidate: any) => {
      const candidateId = candidate.userId
      
      // Filter out the currently logged-in user
      if (user?.userId === candidateId) return false;

      return !currentMilestoneMemberIds.includes(candidateId)
    })
  }, [targetRole, projectMembersData, mentors, talents, user])

  const handleAddMembers = async (selectedUserIds: string[]) => {
    if (!selectedMilestoneId) return

    try {
      if (targetRole === UserRole.MENTOR) {
        await addMentorMutation.mutateAsync({
          milestoneId: selectedMilestoneId,
          projectMemberIds: selectedUserIds
        })
      } else {
        await addTalentMutation.mutateAsync({
          milestoneId: selectedMilestoneId,
          projectMemberIds: selectedUserIds
        })
      }
      
      toast.success(`Thêm ${targetRole === UserRole.MENTOR ? 'Mentor' : 'Talent'} vào milestone thành công`)
      onRefresh?.()
    } catch (error) {
      console.error(error)
      toast.error('Thêm thành viên thất bại')
    }
  }

  const openAddMemberModal = (milestoneId: string, role: UserRole) => {
    setSelectedMilestoneId(milestoneId)
    setTargetRole(role)
    setIsAddMemberModalOpen(true)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Chi tiết Milestone</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <MilestoneInfoSection milestone={milestone} />

        <div className="border-t border-border pt-4 space-y-4">
          {/* Mentors Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Users className="h-4 w-4" />
                <span>Mentors ({mentors.length})</span>
              </div>
              {(isLabAdmin || isMentor) && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={() => openAddMemberModal(milestone.id, UserRole.MENTOR)}
                >
                  <UserPlus className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            {mentors.length > 0 ? (
              <MembersAvatarList
                members={mentors}
                size="md"
                maxVisible={5}
                showCount={false}
                emptyMessage="Chưa có mentor"
              />
            ) : (
              <p className="text-sm text-muted-foreground italic">Chưa có mentor</p>
            )}
          </div>

          {/* Talents Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Users className="h-4 w-4" />
                <span>Talents ({talents.length})</span>
              </div>
              {(isMentor || isLabAdmin) && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={() => openAddMemberModal(milestone.id, UserRole.TALENT)}
                >
                  <UserPlus className="h-4 w-4" />
                </Button>
              )}
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
          <div>
            <button
              onClick={() => {
                const basePath = getRoleBasePath(user?.role || '')
                navigate({
                  to: `${basePath}/projects/${milestone.projectId}/${milestone.id}/members`,
                })
              }}
              className="flex items-center gap-2 text-sm text-secondary hover:text-secondary/90 transition-colors w-full justify-center py-2 hover:bg-muted rounded-md"
            >
              <span>Xem tất cả thành viên</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Action Section - Giải ngân */}
        {isCompany && (
          <div className="border-t border-border pt-4 space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
              <Unlock className="h-4 w-4 text-secondary" />
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
                distributed: <ReleasedStatus />,
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
        title="Xác nhận Nạp tiền vào ví cột mốc"
        description={`Bạn có chắc chắn muốn nạp ${formatVND(milestone.budget)} vào ví cột mốc?`}
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

      <AddMemberModal
        isOpen={isAddMemberModalOpen}
        onClose={() => {
          setIsAddMemberModalOpen(false)
          setSelectedMilestoneId(null)
        }}
        onAddMembers={handleAddMembers}
        projectMembers={filteredProjectMembers}
        targetRole={targetRole}
      />
    </Card>
  )
}