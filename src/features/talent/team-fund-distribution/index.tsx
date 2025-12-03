import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Wallet,
  Users,
  ArrowRight,
  History,
  AlertTriangle,
  DollarSign,
  Clock,
  CheckCircle,
  ChevronLeft,
  TrendingUp,
  Share2
} from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { usePermission } from '@/hooks/usePermission'
import { getAvatarUrl } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'

// Format tiền VNĐ
const formatVND = (v: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v)

// Mock data
interface Milestone {
  id: string
  name: string
  amount: number
  releasedAt: string
  status: 'RELEASED'
}

interface TeamMember {
  id: string
  name: string
  email: string
  avatar?: string
  isLeader: boolean
}

interface Distribution {
  id: string
  fromMilestoneId: string
  milestoneName: string
  recipientId: string
  recipientName: string
  amount: number
  distributedAt: string
  distributedBy: string
}

const MOCK_MILESTONES: Milestone[] = [
  {
    id: 'm1',
    name: 'Milestone 1: Setup & Design',
    amount: 7000000,
    releasedAt: '2025-01-15T10:30:00',
    status: 'RELEASED'
  },
  {
    id: 'm2',
    name: 'Milestone 2: Backend Development',
    amount: 10500000,
    releasedAt: '2025-02-20T14:20:00',
    status: 'RELEASED'
  }
]

const MOCK_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 't1',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@student.edu.vn',
    avatar: '',
    isLeader: true
  },
  {
    id: 't2',
    name: 'Trần Thị B',
    email: 'tranthib@student.edu.vn',
    avatar: '',
    isLeader: false
  },
  {
    id: 't3',
    name: 'Lê Văn C',
    email: 'levanc@student.edu.vn',
    avatar: '',
    isLeader: false
  },
  {
    id: 't4',
    name: 'Phạm Thị D',
    email: 'phamthid@student.edu.vn',
    avatar: '',
    isLeader: false
  }
]

const MOCK_DISTRIBUTIONS: Distribution[] = [
  {
    id: 'd1',
    fromMilestoneId: 'm1',
    milestoneName: 'Milestone 1',
    recipientId: 't2',
    recipientName: 'Trần Thị B',
    amount: 2000000,
    distributedAt: '2025-01-16T09:00:00',
    distributedBy: 'Nguyễn Văn A'
  },
  {
    id: 'd2',
    fromMilestoneId: 'm1',
    milestoneName: 'Milestone 1',
    recipientId: 't3',
    recipientName: 'Lê Văn C',
    amount: 2500000,
    distributedAt: '2025-01-16T09:05:00',
    distributedBy: 'Nguyễn Văn A'
  },
  {
    id: 'd3',
    fromMilestoneId: 'm1',
    milestoneName: 'Milestone 1',
    recipientId: 't1',
    recipientName: 'Nguyễn Văn A',
    amount: 2500000,
    distributedAt: '2025-01-16T09:10:00',
    distributedBy: 'Nguyễn Văn A (Leader)'
  }
]

export const TeamFundDistributionPage: React.FC = () => {
  const navigate = useNavigate()
  const { user } = usePermission()
  const [isDistributeOpen, setIsDistributeOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<string>('')
  const [amount, setAmount] = useState<string>('')

  // Mock data - trong thực tế sẽ lấy từ API
  const milestones = MOCK_MILESTONES
  const teamMembers = MOCK_TEAM_MEMBERS
  const distributions = MOCK_DISTRIBUTIONS

  // Tính toán
  const currentUser = teamMembers.find(m => m.id === 't1') // Mock current user
  const isLeader = currentUser?.isLeader || false
  const totalReceived = milestones.reduce((sum, m) => sum + m.amount, 0)
  const totalDistributed = distributions.reduce((sum, d) => sum + d.amount, 0)
  const holdingAmount = totalReceived - totalDistributed

  // Kiểm tra cảnh báo giữ tiền quá lâu (ví dụ: > 7 ngày)
  const lastMilestone = milestones[milestones.length - 1]
  const daysSinceRelease = lastMilestone
    ? Math.floor((Date.now() - new Date(lastMilestone.releasedAt).getTime()) / (1000 * 60 * 60 * 24))
    : 0
  const shouldWarn = holdingAmount > 0 && daysSinceRelease > 7

  const handleDistribute = () => {
    if (!selectedMember || !amount) {
      toast.error('Vui lòng chọn thành viên và nhập số tiền')
      return
    }

    const amountNum = parseFloat(amount)
    if (amountNum <= 0 || amountNum > holdingAmount) {
      toast.error('Số tiền không hợp lệ')
      return
    }

    // TODO: Call API to distribute funds
    console.log('Distribute:', { recipientId: selectedMember, amount: amountNum })
    toast.success(`Đã chuyển ${formatVND(amountNum)} cho thành viên`)
    setIsDistributeOpen(false)
    setSelectedMember('')
    setAmount('')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Wallet className="h-8 w-8 text-[#2a9d8f]" />
                Quản lý Quỹ Nhóm
              </h1>
              <p className="text-gray-500 mt-1">
                Phân bổ và quản lý nguồn tiền cho thành viên trong nhóm
              </p>
            </div>
          </div>

          {isLeader && holdingAmount > 0 && (
            <Button
              className="bg-[#2a9d8f] hover:bg-[#21867a]"
              onClick={() => setIsDistributeOpen(true)}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Phân bổ tiền
            </Button>
          )}
        </div>

        {/* Warning Alert - Nếu Leader giữ tiền quá lâu */}
        {shouldWarn && (
          <Card className="border-2 border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-orange-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-orange-900">
                    ⚠️ Cảnh báo: Leader đang giữ tiền quá lâu!
                  </p>
                  <p className="text-sm text-orange-800 mt-1">
                    Đã {daysSinceRelease} ngày kể từ khi nhận tiền Milestone cuối cùng.
                    Vui lòng phân bổ số tiền {formatVND(holdingAmount)} cho các thành viên càng sớm càng tốt.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Tổng quan */}
          <div className="lg:col-span-1 space-y-6">
            {/* Ví Tạm giữ */}
            <Card className="border-2 border-[#2a9d8f]">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-[#2a9d8f]" />
                  Ví Tạm giữ (Leader)
                </CardTitle>
                <CardDescription>Số tiền chưa phân bổ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-3">
                  <div className="p-4 bg-gradient-to-r from-[#2a9d8f]/10 to-[#264653]/10 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Đang giữ</p>
                    <p className="text-3xl font-bold text-[#2a9d8f]">
                      {formatVND(holdingAmount)}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-gray-50 rounded">
                      <p className="text-gray-500">Tổng nhận</p>
                      <p className="font-semibold text-gray-900">{formatVND(totalReceived)}</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <p className="text-gray-500">Đã chia</p>
                      <p className="font-semibold text-gray-900">{formatVND(totalDistributed)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Members */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#2a9d8f]" />
                  Thành viên nhóm ({teamMembers.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${member.isLeader ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200'
                        }`}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>
                          <img src={getAvatarUrl(member.name)} alt={member.name} />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-sm text-gray-900 truncate">
                            {member.name}
                          </p>
                          {member.isLeader && (
                            <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                              Leader
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 truncate">{member.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Chi tiết */}
          <div className="lg:col-span-2 space-y-6">
            {/* Nguồn tiền từ Milestones */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#2a9d8f]" />
                  Nguồn tiền từ Milestones
                </CardTitle>
                <CardDescription>
                  Danh sách các milestone đã giải ngân (70% phần của team)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {milestones.length > 0 ? (
                  <div className="space-y-3">
                    {milestones.map((milestone) => (
                      <div
                        key={milestone.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-green-100 rounded-full">
                            <DollarSign className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{milestone.name}</p>
                            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                              <Clock className="h-3 w-3" />
                              <span>
                                Giải ngân: {new Date(milestone.releasedAt).toLocaleString('vi-VN')}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-green-600">
                            {formatVND(milestone.amount)}
                          </p>
                          <Badge className="mt-1 bg-green-100 text-green-800 text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Đã nhận
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <DollarSign className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                    <p>Chưa có milestone nào được giải ngân</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Lịch sử phân chia */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <History className="h-5 w-5 text-[#2a9d8f]" />
                  Lịch sử Phân bổ
                </CardTitle>
                <CardDescription>
                  Theo dõi các lần chia tiền cho thành viên
                </CardDescription>
              </CardHeader>
              <CardContent>
                {distributions.length > 0 ? (
                  <div className="space-y-3">
                    {distributions.map((dist) => (
                      <div
                        key={dist.id}
                        className="flex items-center justify-between p-4 border rounded-lg bg-blue-50/50 border-blue-100"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-full">
                            <ArrowRight className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">
                              {dist.recipientName}
                            </p>
                            <p className="text-xs text-gray-500">
                              Từ: {dist.milestoneName}
                            </p>
                            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                              <Clock className="h-3 w-3" />
                              <span>
                                {new Date(dist.distributedAt).toLocaleString('vi-VN')}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-blue-600">
                            {formatVND(dist.amount)}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Bởi: {dist.distributedBy}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <History className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                    <p>Chưa có lịch sử phân bổ</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* View Only Notice for Members */}
            {!isLeader && (
              <Card className="border-2 border-blue-200 bg-blue-50/30">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="font-semibold text-blue-900">
                        Bạn đang xem với quyền Member
                      </p>
                      <p className="text-sm text-blue-700 mt-1">
                        Chỉ Leader mới có thể thực hiện phân bổ tiền. Bạn có thể giám sát
                        để đảm bảo việc chia tiền diễn ra công bằng và minh bạch.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Distribute Dialog */}
      <Dialog open={isDistributeOpen} onOpenChange={setIsDistributeOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-[#2a9d8f]" />
              Phân bổ tiền cho thành viên
            </DialogTitle>
            <DialogDescription>
              Chọn thành viên và nhập số tiền cần chuyển
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Số dư hiện tại:</strong> {formatVND(holdingAmount)}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="member">Chọn thành viên</Label>
              <Select value={selectedMember} onValueChange={setSelectedMember}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn thành viên..." />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers
                    .filter(m => !m.isLeader)
                    .map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Số tiền (VNĐ)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Nhập số tiền..."
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                max={holdingAmount}
              />
              <p className="text-xs text-gray-500">
                Tối đa: {formatVND(holdingAmount)}
              </p>
            </div>

            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-yellow-800">
                ⚠️ <strong>Lưu ý:</strong> Hành động này không thể hoàn tác.
                Vui lòng kiểm tra kỹ thông tin trước khi xác nhận.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDistributeOpen(false)}
            >
              Hủy
            </Button>
            <Button
              className="bg-[#2a9d8f] hover:bg-[#21867a]"
              onClick={handleDistribute}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Xác nhận chuyển tiền
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TeamFundDistributionPage

