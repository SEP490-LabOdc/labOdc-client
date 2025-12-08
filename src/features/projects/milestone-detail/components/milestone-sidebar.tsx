import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  CalendarDays,
  Users,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Wallet,
  Info,
  Unlock,
  ArrowRight
} from 'lucide-react'
import { getStatusColor, getStatusLabel, getRoleBasePath } from '@/lib/utils'
import { usePermission } from '@/hooks/usePermission'
import { useNavigate } from '@tanstack/react-router'
import type { Milestone } from '@/hooks/api/projects'
import { ConfirmReleaseDialog } from './confirm-release-dialog'
import { MembersAvatarList } from '@/components/members-avatar-list'
import type { ProjectMember } from '@/hooks/api/projects'
import { ROLE } from '@/const'
import { usePayMilestone } from '@/hooks/api/payment'
import { toast } from 'sonner'
import {
  usePreviewDisbursement,
  useCalculateDisbursement,
  useExecuteDisbursement,
} from '@/hooks/api/disbursement'

interface MilestoneSidebarProps {
  milestone: Milestone
  paymentStatus?: 'PENDING_DEPOSIT' | 'DEPOSITED' | 'RELEASED'
  escrowBalance?: number
  projectId?: string
}

const formatVND = (v: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v)

export const MilestoneSidebar: React.FC<MilestoneSidebarProps> = ({
  milestone,
  paymentStatus = 'PENDING_DEPOSIT',
  escrowBalance = 0,
  projectId
}) => {
  const { isCompany, user } = usePermission()
  const navigate = useNavigate()
  const [isConfirmDepositOpen, setIsConfirmDepositOpen] = useState(false)
  const [isConfirmReleaseOpen, setIsConfirmReleaseOpen] = useState(false)
  const payMilestone = usePayMilestone()
  const calculateDisbursement = useCalculateDisbursement()
  const executeDisbursement = useExecuteDisbursement()

  const calculateDaysRemaining = (endDate: string): string => {
    const end = new Date(endDate)
    const today = new Date()
    const diffTime = end.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return 'Quá hạn'
    if (diffDays === 0) return 'Hôm nay'
    return `${diffDays} ngày`
  }

  // Map talents to ProjectMember format
  const talents: ProjectMember[] = useMemo(() => {
    return (milestone.talents || []).map((talent: any) => ({
      projectMemberId: talent.userId || '',
      userId: talent.userId || '',
      fullName: talent.name || talent.fullName || 'Unknown',
      email: talent.email || '',
      avatarUrl: talent.avatar || talent.avatarUrl || '',
      roleName: ROLE.TALENT as 'TALENT',
      isLeader: talent.isLeader || false,
    }))
  }, [milestone.talents])

  // Map mentors to ProjectMember format
  const mentors: ProjectMember[] = useMemo(() => {
    return (milestone.mentors || []).map((mentor: any) => ({
      projectMemberId: mentor.userId || '',
      userId: mentor.userId || '',
      fullName: mentor.name || mentor.fullName || 'Unknown',
      email: mentor.email || '',
      avatarUrl: mentor.avatar || mentor.avatarUrl || '',
      roleName: ROLE.MENTOR as 'MENTOR',
      isLeader: mentor.isLeader || false,
    }))
  }, [milestone.mentors])

  const amount = milestone.budget || 0
  const hasEnoughBalance = escrowBalance >= amount

  // Get mentor leader and talent leader IDs
  const mentorLeaderId = useMemo(() => {
    const leader = mentors.find((m) => m.isLeader)
    return leader?.userId || ''
  }, [mentors])

  const talentLeaderId = useMemo(() => {
    const leader = talents.find((t) => t.isLeader)
    return leader?.userId || ''
  }, [talents])

  // Fetch preview disbursement data when DEPOSITED
  const { data: previewData, isLoading: isLoadingPreview } = usePreviewDisbursement(
    {
      milestoneId: milestone.id,
      totalAmount: amount,
    },
    {
      enabled: paymentStatus === 'DEPOSITED' && isCompany && hasEnoughBalance && !!projectId,
    }
  )

  // Use preview data if available, otherwise use calculated values
  const disbursementInfo = useMemo(() => {
    if (previewData?.data) {
      return {
        systemFee: previewData.data.systemFee || amount * 0.1,
        mentorShare: previewData.data.mentorShare || amount * 0.2,
        teamShare: previewData.data.teamShare || amount * 0.7,
        disbursementId: previewData.data.disbursementId,
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
  const canRelease = isCompany && paymentStatus === 'DEPOSITED' && hasEnoughBalance && !!mentorLeaderId && !!talentLeaderId

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
      toast.error(error?.message || 'Có lỗi xảy ra khi nạp tiền vào Escrow')
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
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Trạng thái:</span>
            <Badge className={`${getStatusColor(milestone.status)} rounded-full`}>
              {getStatusLabel(milestone.status)}
            </Badge>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Ngân sách:
            </span>
            <span className="font-medium text-gray-800">
              {(milestone.budget ?? 0).toLocaleString('vi-VN')} VNĐ
            </span>
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
        </div>

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

            {paymentStatus === 'PENDING_DEPOSIT' && (
              <div className="space-y-2">
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-orange-800">Chưa ký quỹ</p>
                      <p className="text-xs text-orange-700 mt-0.5">
                        Vui lòng nạp tiền vào Escrow
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-xs"
                  onClick={() => setIsConfirmDepositOpen(true)}
                  disabled={payMilestone.isPending}
                >
                  <Wallet className="w-3 h-3 mr-1.5" />
                  {payMilestone.isPending ? 'Đang xử lý...' : 'Nạp vào Escrow'}
                </Button>
              </div>
            )}

            {paymentStatus === 'DEPOSITED' && (
              <div className="space-y-2">
                {!hasEnoughBalance && (
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-orange-800">Số dư không đủ</p>
                        <p className="text-xs text-orange-700 mt-0.5">
                          Hiện tại: {formatVND(escrowBalance)}
                        </p>
                        <p className="text-xs text-orange-700">
                          Cần: {formatVND(amount)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-yellow-800 space-y-1">
                      <p className="font-semibold">Xác nhận trước khi giải ngân:</p>
                      <p className="text-yellow-700">✓ Đã phê duyệt báo cáo</p>
                      <p className="text-yellow-700">✓ Công việc hoàn thành</p>
                      <p className="text-yellow-700">✓ Không thể hoàn tác</p>
                    </div>
                  </div>
                </div>

                {(!mentorLeaderId || !talentLeaderId) && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-red-800">Thiếu thông tin leader</p>
                        <p className="text-xs text-red-700 mt-0.5">
                          Vui lòng đặt leader cho mentor và talent trước khi giải ngân
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  size="sm"
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-xs font-semibold"
                  disabled={!canRelease || calculateDisbursement.isPending || executeDisbursement.isPending || isLoadingPreview}
                  onClick={() => setIsConfirmReleaseOpen(true)}
                >
                  <CheckCircle className="w-3 h-3 mr-1.5" />
                  {calculateDisbursement.isPending || executeDisbursement.isPending
                    ? 'Đang xử lý...'
                    : `Giải ngân ${formatVND(amount)}`}
                </Button>
              </div>
            )}

            {paymentStatus === 'RELEASED' && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-green-800">Đã giải ngân</p>
                    <p className="text-xs text-green-700 mt-0.5">
                      Tiền đã chuyển về ví các bên
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* View Only for Mentor/Talent */}
        {!isCompany && (
          <div className="border-t pt-4">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-blue-800">
                    {paymentStatus === 'RELEASED'
                      ? '✅ Đã nhận tiền'
                      : paymentStatus === 'DEPOSITED'
                        ? '⏳ Đang chờ duyệt'
                        : '⏳ Đang chờ ký quỹ'}
                  </p>
                  <p className="text-xs text-blue-700 mt-0.5">
                    {paymentStatus === 'RELEASED'
                      ? `Bạn đã nhận ${user?.role === 'MENTOR' ? formatVND(mentorShare) : 'phần của mình'}.`
                      : paymentStatus === 'DEPOSITED'
                        ? 'Doanh nghiệp đang xem xét.'
                        : 'Chờ doanh nghiệp nạp tiền.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
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
        description={`Bạn có chắc chắn muốn nạp ${formatVND(amount)} vào Escrow cho milestone này?`}
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
