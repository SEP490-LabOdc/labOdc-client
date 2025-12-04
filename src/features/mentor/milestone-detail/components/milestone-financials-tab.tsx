import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Shield,
  User,
  Users,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Wallet,
  TrendingUp,
  Info
} from 'lucide-react'

// Hàm format tiền
const formatVND = (v: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v)

// Payment Status types
type PaymentStatus = 'PENDING_DEPOSIT' | 'DEPOSITED' | 'RELEASED'

interface MilestoneFinancialsTabProps {
  amount: number
  status: PaymentStatus
  userRole: string
}

const getStatusInfo = (status: PaymentStatus) => {
  switch (status) {
    case 'PENDING_DEPOSIT':
      return {
        label: 'Chưa ký quỹ',
        color: 'bg-orange-100 text-orange-800 border-orange-200',
        iconColor: 'text-orange-500',
        IconComponent: AlertCircle
      }
    case 'DEPOSITED':
      return {
        label: 'Đã ký quỹ',
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        iconColor: 'text-blue-500',
        IconComponent: CheckCircle
      }
    case 'RELEASED':
      return {
        label: 'Đã giải ngân',
        color: 'bg-green-100 text-green-800 border-green-200',
        iconColor: 'text-green-500',
        IconComponent: CheckCircle
      }
  }
}

export const MilestoneFinancialsTab: React.FC<MilestoneFinancialsTabProps> = ({
  amount,
  status,
  userRole
}) => {
  const systemFee = amount * 0.1
  const mentorShare = amount * 0.2
  const teamShare = amount * 0.7

  const statusInfo = getStatusInfo(status)
  const StatusIcon = statusInfo.IconComponent

  return (
    <div className="space-y-6">
      {/* Header Card - Tổng quan */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-3">
                <DollarSign className="h-7 w-7 text-[#2a9d8f]" />
                Chi tiết Phân bổ Milestone
              </CardTitle>
              <CardDescription className="mt-2">
                Thông tin minh bạch về phân bổ ngân sách và giải ngân
              </CardDescription>
            </div>
            <Badge className={`${statusInfo.color} border flex items-center gap-2 px-3 py-1.5`}>
              <StatusIcon className={`h-4 w-4 ${statusInfo.iconColor}`} />
              {statusInfo.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Giá trị Milestone */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#2a9d8f]/10 to-[#264653]/10 rounded-lg border-2 border-[#2a9d8f]/20">
              <div>
                <p className="text-sm text-gray-600 font-medium">Tổng giá trị Milestone</p>
                <p className="text-3xl font-bold text-[#2a9d8f] mt-1">{formatVND(amount)}</p>
              </div>
              <Wallet className="h-12 w-12 text-[#2a9d8f]/30" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Breakdown Chart Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#2a9d8f]" />
            Biểu đồ Phân bổ (10/20/70)
          </CardTitle>
          <CardDescription>
            Minh bạch cách phân chia ngân sách cho các bên liên quan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Visual Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm font-medium">
              <span>Phân bổ tự động</span>
              <span className="text-gray-500">100%</span>
            </div>
            <div className="flex h-8 w-full overflow-hidden rounded-lg border-2 border-gray-200">
              <div
                className="bg-gray-400 flex items-center justify-center text-white text-xs font-bold"
                style={{ width: '10%' }}
              >
                10%
              </div>
              <div
                className="bg-blue-500 flex items-center justify-center text-white text-xs font-bold"
                style={{ width: '20%' }}
              >
                20%
              </div>
              <div
                className="bg-green-500 flex items-center justify-center text-white text-xs font-bold"
                style={{ width: '70%' }}
              >
                70%
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Hệ thống</span>
              <span>Mentor</span>
              <span>Team Talents</span>
            </div>
          </div>

          {/* Breakdown Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* System */}
            <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-400"></div>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-gray-100 rounded-full">
                  <Shield className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Phí hệ thống</p>
                  <p className="text-xs text-gray-500">10% tổng giá trị</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-700 mb-1">{formatVND(systemFee)}</div>
              <div className="text-xs text-gray-500">
                Chi phí vận hành và bảo trì
              </div>
            </div>

            {/* Mentor */}
            <div className={`p-4 rounded-lg border-2 relative overflow-hidden ${userRole === 'MENTOR'
              ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-200'
              : 'bg-blue-50 border-blue-200'
              }`}>
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-blue-100 rounded-full">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-blue-900">Mentor</p>
                  <p className="text-xs text-blue-600">20% tổng giá trị</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-700 mb-1">{formatVND(mentorShare)}</div>
              <div className="text-xs text-blue-600">
                Hướng dẫn và quản lý dự án
              </div>
              {status === 'RELEASED' && (
                <div className="mt-3 flex items-center gap-1 text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                  <CheckCircle className="w-3 h-3" />
                  Đã chuyển về ví
                </div>
              )}
            </div>

            {/* Team */}
            <div className={`p-4 rounded-lg border-2 relative overflow-hidden ${userRole === 'USER' || userRole === 'TALENT'
              ? 'bg-green-50 border-green-300 ring-2 ring-green-200'
              : 'bg-green-50 border-green-200'
              }`}>
              <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-green-100 rounded-full">
                  <Users className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-green-900">Nhóm Talents</p>
                  <p className="text-xs text-green-600">70% tổng giá trị</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-green-700 mb-1">{formatVND(teamShare)}</div>
              <div className="text-xs text-green-600">
                Thực hiện và phát triển
              </div>
              {status === 'RELEASED' && (
                <div className="mt-3 flex items-center gap-1 text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                  <CheckCircle className="w-3 h-3" />
                  Đã chuyển về ví Leader
                </div>
              )}
            </div>
          </div>

          {/* Info Note */}
          <div className="flex gap-3 p-4 bg-blue-50 text-blue-800 text-sm rounded-lg border border-blue-200">
            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Lưu ý về phân bổ tự động:</p>
              <ul className="text-xs space-y-1 text-blue-700">
                <li>• Phí hệ thống (10%) được giữ lại để vận hành nền tảng</li>
                <li>• Mentor (20%) nhận trực tiếp vào ví cá nhân</li>
                <li>• Team Talents (70%) được chuyển về ví của Leader để phân chia</li>
                <li>• Tất cả giao dịch được ghi nhận và có thể tra cứu</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}