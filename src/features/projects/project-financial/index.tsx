import React from 'react'
import { useParams, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, Download, Filter, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProjectFinancialsTab } from './components/index.tsx'
import type { FinancialSummary, Transaction } from './components/financials-tab.tsx'


const summary: FinancialSummary = {
  totalBudget: 100000000,
  escrowBalance: 30000000,
  totalReleased: 20000000,
  remainingBudget: 50000000,
  teamFund: {
    totalReceived: 14000000,
    distributed: 10000000,
    heldByLeader: 4000000
  }
}

const transactions: Transaction[] = [
  { id: '1', refId: 'TX-MS-01', description: 'Giải ngân Milestone 1: Thiết kế Database', amount: 10000000, type: 'MILESTONE_RELEASE', date: '2025-10-15', status: 'COMPLETED' },
  { id: '2', refId: 'TX-DEP-01', description: 'Doanh nghiệp nạp tiền Escrow', amount: 50000000, type: 'DEPOSIT', date: '2025-10-01', status: 'COMPLETED' },
  { id: '3', refId: 'TX-INT-01', description: 'Phân bổ cho Nguyễn Văn A', amount: 5000000, type: 'INTERNAL_DISTRIBUTION', date: '2025-10-16', status: 'COMPLETED' },
]



const ProjectFinancialPage: React.FC = () => {
  const { projectId } = useParams({ strict: false })
  const navigate = useNavigate()

  // Giả lập role hiện tại (Lấy từ Context/Redux)
  const currentUserRole = 'TALENT_LEADER'

  return (
    <div className="min-h-screen bg-background pb-10">

      {/* 1. Header riêng biệt cho trang Tài chính */}
      <header className="bg-card px-6 lg:px-18 py-4 border-b border-primary/20 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-muted text-muted-foreground hover:text-foreground"
              onClick={() => navigate({ to: `/projects/${projectId}` })} // Quay lại trang chi tiết
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              Quay lại Dự án
            </Button>
            <div className="h-6 w-px bg-border mx-2 hidden sm:block"></div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Dashboard Tài chính</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Dự án: Xây dựng Hệ thống E-commerce</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Calendar className="w-4 h-4 mr-2" /> Tùy chọn ngày
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" /> Xuất Báo cáo
            </Button>
          </div>
        </div>
      </header>

      {/* 2. Nội dung chính */}
      <main className="max-w-7xl mx-auto px-6 lg:px-18 py-8">
        {/* Gọi lại component phức tạp chúng ta đã build */}
        <ProjectFinancialsTab
          summary={summary}
          transactions={transactions}
          userRole={currentUserRole}
        />

        {/* Có thể thêm các section khác bên dưới nếu cần, ví dụ: Biểu đồ dòng tiền theo thời gian */}
        <div className="mt-8 grid grid-cols-1 gap-6">
          {/* Placeholder cho biểu đồ */}
          <div className="bg-card p-6 rounded-md shadow-sm border border-border">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Phân tích dòng tiền (Coming Soon)
            </h3>
            <div className="h-64 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
              Biểu đồ xu hướng thu chi sẽ hiển thị ở đây
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProjectFinancialPage