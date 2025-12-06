import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.tsx'
import { Badge } from '@/components/ui/badge.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Progress } from '@/components/ui/progress.tsx'
import {
  Plus,
  ArrowUpRight,
  Wallet,
  ShieldCheck,
  UserCheck,
  Users,
  AlertCircle,
  CreditCard,
  Download
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'

// --- Types & Interfaces ---
export type TransactionType = 'DEPOSIT' | 'MILESTONE_RELEASE' | 'REFUND' | 'INTERNAL_DISTRIBUTION';

export interface FinancialSummary {
  totalBudget: number;
  escrowBalance: number; // Tiền Doanh nghiệp đã nạp, đang giữ
  totalReleased: number; // Tiền đã trả cho Milestone hoàn thành
  remainingBudget: number; // Chưa nạp/Chưa xử lý
  teamFund: {
    totalReceived: number;
    distributed: number;
    heldByLeader: number;
  }
}

export interface Transaction {
  id: string;
  refId: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  userRole?: string; // Để demo hiển thị nút bấm
}

interface ProjectFinancialsTabProps {
  summary: FinancialSummary;
  transactions: Transaction[];
  userRole: 'COMPANY' | 'MENTOR' | 'TALENT_LEADER' | 'TALENT_MEMBER' | 'ADMIN';
}

// --- Utils ---
const formatVND = (amount: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

const getTransactionColor = (type: TransactionType) => {
  switch (type) {
    case 'DEPOSIT': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'MILESTONE_RELEASE': return 'bg-green-100 text-green-700 border-green-200';
    case 'INTERNAL_DISTRIBUTION': return 'bg-orange-100 text-orange-700 border-orange-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export const ProjectFinancialsTab: React.FC<ProjectFinancialsTabProps> = ({
                                                                            summary,
                                                                            transactions,
                                                                            userRole
                                                                          }) => {

  // Tính toán tự động cho phần Allocation Breakdown dựa trên số tiền đã giải ngân
  const systemFee = summary.totalReleased * 0.10;
  const mentorShare = summary.totalReleased * 0.20;
  const teamShare = summary.totalReleased * 0.70;

  return (
    <div className="space-y-6">

      {/* SECTION 1: FINANCIAL HEALTH WIDGETS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Tổng Ngân sách */}
        <Card className="border-l-4 border-l-gray-500 shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tổng Ngân sách</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">{formatVND(summary.totalBudget)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Ví Escrow (Đang giữ) */}
        <Card className="border-l-4 border-l-blue-500 shadow-sm bg-blue-50/50">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Đang giữ trong Escrow</p>
                <div className="mt-2 text-2xl font-bold text-blue-900">{formatVND(summary.escrowBalance)}</div>
              </div>
              <ShieldCheck className="h-5 w-5 text-blue-400" />
            </div>
            {userRole === 'COMPANY' && (
              <Button size="sm" className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-1" /> Nạp thêm tiền
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Card 3: Đã Giải ngân */}
        <Card className="border-l-4 border-l-green-500 shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-green-600 uppercase tracking-wider">Đã Giải ngân</p>
                <div className="mt-2 text-2xl font-bold text-green-900">{formatVND(summary.totalReleased)}</div>
              </div>
              <Wallet className="h-5 w-5 text-green-400" />
            </div>
            <p className="text-xs text-green-600 mt-1">Đã chia sẻ cho các bên</p>
          </CardContent>
        </Card>

        {/* Card 4: Còn lại */}
        <Card className="border-l-4 border-l-orange-300 shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider">Ngân sách còn lại</p>
            <div className="mt-2 text-2xl font-bold text-orange-900">{formatVND(summary.remainingBudget)}</div>
            <p className="text-xs text-gray-400 mt-1">Chưa nạp hoặc chưa xử lý</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SECTION 2: ALLOCATION BREAKDOWN (MINH BẠCH 10/20/70) */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              Minh bạch Phân bổ Dòng tiền
            </CardTitle>
            <CardDescription>
              Tổng số tiền đã giải ngân ({formatVND(summary.totalReleased)}) được hệ thống tự động phân chia như sau:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* 10% System */}
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-100 flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-gray-200 rounded text-gray-600"><CreditCard className="w-4 h-4" /></div>
                  <span className="font-semibold text-gray-600">Phí Hệ thống</span>
                </div>
                <div>
                  <span className="text-xs font-bold bg-gray-200 text-gray-700 px-2 py-0.5 rounded">10%</span>
                  <div className="text-xl font-bold text-gray-800 mt-1">{formatVND(systemFee)}</div>
                </div>
              </div>

              {/* 20% Mentor */}
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-100 flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-purple-200 rounded text-purple-600"><UserCheck className="w-4 h-4" /></div>
                  <span className="font-semibold text-purple-700">Mentor</span>
                </div>
                <div>
                  <span className="text-xs font-bold bg-purple-200 text-purple-700 px-2 py-0.5 rounded">20%</span>
                  <div className="text-xl font-bold text-purple-900 mt-1">{formatVND(mentorShare)}</div>
                </div>
              </div>

              {/* 70% Team */}
              <div className="p-4 rounded-lg bg-orange-50 border border-orange-100 flex flex-col justify-between ring-2 ring-orange-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-orange-200 rounded text-orange-600"><Users className="w-4 h-4" /></div>
                  <span className="font-semibold text-orange-700">Talent Team</span>
                </div>
                <div>
                  <span className="text-xs font-bold bg-orange-200 text-orange-800 px-2 py-0.5 rounded">70%</span>
                  <div className="text-xl font-bold text-orange-900 mt-1">{formatVND(teamShare)}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SECTION 3: TEAM FUND MONITOR (DÀNH CHO TALENT TEAM) */}
        <Card className="bg-gradient-to-br from-white to-orange-50/50 border-orange-100">
          <CardHeader>
            <CardTitle className="text-lg text-orange-900">Quỹ Nhóm</CardTitle>
            <CardDescription>Theo dõi dòng tiền về nhóm</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Đã nhận (Về ví Leader)</span>
                <span className="font-bold">{formatVND(summary.teamFund.totalReceived)}</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-green-600">Đã chia cho Member</span>
                <span className="font-bold text-green-600">{formatVND(summary.teamFund.distributed)}</span>
              </div>
              <Progress value={(summary.teamFund.distributed / summary.teamFund.totalReceived) * 100 || 0} className="h-2 bg-orange-100" />
            </div>

            <div className="bg-white p-3 rounded-lg border border-orange-200 shadow-sm">
              <div className="flex items-start gap-3">
                <AlertCircle className={`w-5 h-5 mt-0.5 ${summary.teamFund.heldByLeader > 0 ? 'text-red-500' : 'text-green-500'}`} />
                <div>
                  <p className="text-sm font-medium text-gray-700">Đang giữ bởi Leader</p>
                  <p className={`text-xl font-bold ${summary.teamFund.heldByLeader > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {formatVND(summary.teamFund.heldByLeader)}
                  </p>
                </div>
              </div>
              {userRole === 'TALENT_LEADER' && summary.teamFund.heldByLeader > 0 && (
                <Button size="sm" className="w-full mt-3 bg-orange-600 hover:bg-orange-700 text-white">
                  Phân bổ ngay
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SECTION 4: TRANSACTION HISTORY */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">Lịch sử Giao dịch</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2"/> Xuất báo cáo</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-4 p-3 bg-gray-50 text-sm font-medium text-gray-500 border-b">
              <div className="col-span-4">Mô tả</div>
              <div className="col-span-2">Mã Ref</div>
              <div className="col-span-2">Loại</div>
              <div className="col-span-2 text-right">Số tiền</div>
              <div className="col-span-2 text-right">Hành động</div>
            </div>

            <div className="divide-y">
              {transactions.map((tx) => (
                <div key={tx.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors text-sm">
                  <div className="col-span-4">
                    <div className="font-medium text-gray-900">{tx.description}</div>
                    <div className="text-xs text-gray-500">{tx.date}</div>
                  </div>

                  <div className="col-span-2 font-mono text-xs text-gray-500 bg-gray-100 w-fit px-2 py-1 rounded">
                    {tx.refId}
                  </div>

                  <div className="col-span-2">
                    <Badge variant="outline" className={`${getTransactionColor(tx.type)}`}>
                      {tx.type.replace('_', ' ')}
                    </Badge>
                  </div>

                  <div className="col-span-2 text-right font-bold text-gray-800">
                    {['DEPOSIT', 'MILESTONE_RELEASE'].includes(tx.type) ? '-' : '+'}{formatVND(tx.amount)}
                  </div>

                  <div className="col-span-2 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Xem chi tiết (Flowchart)</DropdownMenuItem>
                        <DropdownMenuItem>Tải hóa đơn</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
            {transactions.length === 0 && (
              <div className="p-8 text-center text-gray-500">Chưa có giao dịch nào được ghi nhận</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}