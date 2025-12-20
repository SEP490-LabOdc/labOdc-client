import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { Badge } from '@/components/ui/badge.tsx'
import { Button } from '@/components/ui/button.tsx'
import {
  Plus,
  ArrowUpRight,
  Wallet,
  ShieldCheck,
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

      {/* SECTION 4: TRANSACTION HISTORY */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">Lịch sử Giao dịch</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2" /> Xuất báo cáo</Button>
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