import { useNavigate, useParams } from '@tanstack/react-router'
import { useGetProjectApplicants } from '@/hooks/api/projects/queries'
import { CandidatesTable } from './components/candidate-table'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Plus } from 'lucide-react'

export const CandidateListPage: React.FC = () => {
  const { projectId } = useParams({ strict: false })
  const navigate = useNavigate()

  const { data, isLoading } = useGetProjectApplicants(projectId as string)

  const candidates = data?.data ?? []

  const mockNavigate = () => {}

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Đang tải...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <Button
              variant="ghost"
              className="text-gray-600"
              onClick={() => navigate({ to: '/projects' })}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Quay lại Dự án
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">
              Danh sách Ứng viên
            </h1>
            <p className="text-gray-500">
              Quản lý các ứng viên cho dự án.
            </p>
          </div>
          <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
            <Plus className="h-4 w-4 mr-2" />
            Thêm Ứng viên
          </Button>
        </div>

        {/* Table với filters */}
        <CandidatesTable
          data={candidates}
          search={{}}
          navigate={mockNavigate}
        />
      </div>
    </div>
  )
}

export default CandidateListPage
