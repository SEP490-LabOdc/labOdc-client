import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, User, Users } from 'lucide-react'

// Hàm format tiền
const formatVND = (v: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v)

export const MilestoneFinancialsTab = ({ amount, status, userRole }: any) => {
  const systemFee = amount * 0.1
  const mentorShare = amount * 0.2
  const teamShare = amount * 0.7

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Dự kiến Phân bổ (10/20/70)</CardTitle>
          <p className="text-sm text-gray-500">
            Tổng giá trị Milestone: <span className="font-bold text-indigo-600 text-lg">{formatVND(amount)}</span>
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* System */}
            <div className="p-4 bg-gray-50 rounded border border-gray-200 opacity-60">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-4 h-4" /> <span className="font-bold">Hệ thống (10%)</span>
              </div>
              <div className="text-lg font-bold">{formatVND(systemFee)}</div>
            </div>

            {/* Mentor */}
            <div className={`p-4 rounded border ${userRole === 'MENTOR' ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-100' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center gap-2 mb-1">
                <User className="w-4 h-4" /> <span className="font-bold">Mentor (20%)</span>
              </div>
              <div className="text-lg font-bold text-blue-700">{formatVND(mentorShare)}</div>
            </div>

            {/* Team */}
            <div className={`p-4 rounded border ${userRole.includes('TALENT') ? 'bg-green-50 border-green-200 ring-2 ring-green-100' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4" /> <span className="font-bold">Nhóm Talent (70%)</span>
              </div>
              <div className="text-lg font-bold text-green-700">{formatVND(teamShare)}</div>
              {status === 'RELEASED' && (
                <div className="mt-2 text-xs text-green-600 bg-green-100 px-2 py-1 rounded inline-block">
                  Đã chuyển về ví Leader
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 text-yellow-800 text-sm rounded border border-yellow-200">
            <strong>⚠️ Lưu ý:</strong> Số tiền này sẽ được tự động giải ngân về ví của các bên ngay khi Doanh nghiệp nhấn nút "Phê duyệt" trong tab Báo cáo.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}