import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  CalendarDays,
  Users,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Wallet,
  Info,
  Unlock
} from 'lucide-react'
import { getStatusColor, getStatusLabel } from '@/lib/utils'
import { getAvatarFallback } from '@/helpers/stringUtils'
import { usePermission } from '@/hooks/usePermission'
import type { Milestone } from '@/hooks/api/projects'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface MilestoneSidebarProps {
  milestone: Milestone
  paymentStatus?: 'PENDING_DEPOSIT' | 'DEPOSITED' | 'RELEASED'
  escrowBalance?: number
}

const formatVND = (v: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v)

export const MilestoneSidebar: React.FC<MilestoneSidebarProps> = ({
  milestone,
  paymentStatus = 'PENDING_DEPOSIT',
  escrowBalance = 0
}) => {
  const { isCompany, user } = usePermission()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

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

  const amount = milestone.budget || 0
  const systemFee = amount * 0.1
  const mentorShare = amount * 0.2
  const teamShare = amount * 0.7
  const hasEnoughBalance = escrowBalance >= amount
  const canRelease = isCompany && paymentStatus === 'DEPOSITED' && hasEnoughBalance

  const handleReleaseFunds = () => {
    // TODO: Integrate with API
    console.log('Releasing funds for milestone:', milestone.id)
    setIsConfirmOpen(false)
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
                <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700 text-xs">
                  <Wallet className="w-3 h-3 mr-1.5" />
                  Nạp vào Escrow
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

                <Button
                  size="sm"
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-xs font-semibold"
                  disabled={!canRelease}
                  onClick={() => setIsConfirmOpen(true)}
                >
                  <CheckCircle className="w-3 h-3 mr-1.5" />
                  Giải ngân {formatVND(amount)}
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

      {/* Confirm Dialog */}
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              Xác nhận Giải ngân
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-3 pt-2">
              <p className="font-semibold text-gray-900">
                Bạn có chắc chắn muốn giải ngân <span className="text-green-600">{formatVND(amount)}</span>?
              </p>
              <div className="bg-gray-50 p-3 rounded text-sm space-y-1">
                <p>Số tiền sẽ được phân chia:</p>
                <ul className="space-y-1 ml-4 text-xs">
                  <li>• Hệ thống (10%): <strong>{formatVND(systemFee)}</strong></li>
                  <li>• Mentor (20%): <strong>{formatVND(mentorShare)}</strong></li>
                  <li>• Team (70%): <strong>{formatVND(teamShare)}</strong></li>
                </ul>
              </div>
              <p className="text-red-600 text-sm font-semibold">
                ⚠️ Hành động này không thể hoàn tác!
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReleaseFunds}
              className="bg-green-600 hover:bg-green-700"
            >
              Xác nhận Giải ngân
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
