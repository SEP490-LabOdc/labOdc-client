import React, { useState, useMemo } from 'react'
import { useParams, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, Download, Filter, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProjectFinancialsTab } from './components/index.tsx'
import type { FinancialSummary, Transaction } from './components/financials-tab.tsx'
import { useGetTransactionsByProjectId } from '@/hooks/api/transactions/queries'
import type { Transaction as ApiTransaction } from '@/hooks/api/transactions/types'
import { getRoleBasePath } from '@/lib/utils.ts'
import { useUser } from '@/context/UserContext/UserContext.tsx'


const ProjectFinancialPage: React.FC = () => {
  const { projectId } = useParams({ strict: false })
  const { user } = useUser();
  const navigate = useNavigate()

  // Pagination state
  const [page, setPage] = useState(0)
  const [size] = useState(20) // TODO: Add UI to change size
  const [sortBy] = useState('createdAt') // TODO: Add UI to change sortBy
  const [sortDir] = useState<'ASC' | 'DESC'>('DESC') // TODO: Add UI to change sortDir 

  // Fetch transactions from API
  const { data: apiResponse, isLoading, error } = useGetTransactionsByProjectId(projectId!, { page, size, sortBy, sortDir })

  // Map API transactions to UI format
  const transactions: Transaction[] = useMemo(() => {
    if (!apiResponse?.data?.content) return []
    return apiResponse.data.content.map((tx: ApiTransaction) => ({
      id: tx.id,
      refId: tx.refId,
      description: tx.description,
      amount: tx.amount,
      type: tx.type as any, // Cast to match UI TransactionType
      date: new Date(tx.createdAt).toLocaleDateString('vi-VN'),
      status: tx.status === 'SUCCESS' ? 'COMPLETED' : 'PENDING' as any,
    }))
  }, [apiResponse])

  // Calculate summary from transactions (placeholder logic - adjust based on business rules)
  const summary: FinancialSummary = useMemo(() => {
    const totalReleased = transactions
      .filter(tx => tx.type === 'MILESTONE_RELEASE' && tx.status === 'COMPLETED')
      .reduce((sum, tx) => sum + tx.amount, 0)
    const escrowBalance = transactions
      .filter(tx => tx.type === 'DEPOSIT' && tx.status === 'COMPLETED')
      .reduce((sum, tx) => sum + tx.amount, 0) - totalReleased
    const totalBudget = escrowBalance + totalReleased // Placeholder
    const remainingBudget = totalBudget - totalReleased // Placeholder
    return {
      totalBudget,
      escrowBalance,
      totalReleased,
      remainingBudget,
      teamFund: {
        totalReceived: 0, // Placeholder
        distributed: 0,
        heldByLeader: 0,
      }
    }
  }, [transactions])

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
              onClick={() => navigate({ to: getRoleBasePath(user.role) + `/projects/${projectId}` })} // Quay lại trang chi tiết
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
        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="text-muted-foreground">Đang tải dữ liệu...</div>
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            Lỗi khi tải dữ liệu giao dịch: {error.message}
          </div>
        )}
        {!isLoading && !error && (
          <>
            {/* Gọi lại component phức tạp chúng ta đã build */}
            <ProjectFinancialsTab
              summary={summary}
              transactions={transactions}
              userRole={currentUserRole}
              totalPages={apiResponse?.data?.totalPages || 1}
              currentPage={page}
              onPageChange={setPage}
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
          </>
        )}
      </main>
    </div>
  )
}

export default ProjectFinancialPage