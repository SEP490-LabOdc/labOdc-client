import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'
import { MoreHorizontal, Check, X, Eye } from 'lucide-react'
import { type Candidate } from '../schema'
import { RejectCandidateModal } from './reject-candidate-modal'
import { useApproveProjectApplication, useRejectProjectApplication } from '@/hooks/api/projects/mutation'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { projectKeys } from '@/hooks/api/projects'
import { useParams } from '@tanstack/react-router'

interface CandidateActionsCellProps {
  candidate: Candidate
}

export function CandidateActionsCell({ candidate }: CandidateActionsCellProps) {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const queryClient = useQueryClient()
  const { projectId } = useParams({ strict: false })
  const status = candidate.status

  const approveMutation = useApproveProjectApplication()
  const rejectMutation = useRejectProjectApplication()

  const handleApprove = async () => {
    try {
      await approveMutation.mutateAsync(candidate.id)
      toast.success('Đã duyệt ứng viên thành công')
      await queryClient.invalidateQueries({
        queryKey: projectKeys.getProjectApplicants(projectId as string)
      })
    } catch (error) {
      console.error(error)
      toast.error('Có lỗi xảy ra khi duyệt ứng viên')
    }
  }

  const handleReject = async (note: string) => {
    try {
      await rejectMutation.mutateAsync({
        projectApplicationId: candidate.id,
        reviewNotes: note
      })
      toast.success('Đã từ chối ứng viên')
      await queryClient.invalidateQueries({
        queryKey: projectKeys.getProjectApplicants(projectId as string)
      })
      setIsRejectModalOpen(false)
    } catch (error) {
      console.error(error)
      toast.error('Có lỗi xảy ra khi từ chối ứng viên')
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Mở menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Hành động</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => window.open(candidate.cvUrl, '_blank')}
          >
            <Eye className="mr-2 h-4 w-4" />
            Xem CV
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {status !== 'APPROVED' && (
            <DropdownMenuItem
              onClick={handleApprove}
              className="text-green-600"
              disabled={approveMutation.isPending}
            >
              <Check className="mr-2 h-4 w-4" />
              Duyệt ứng viên
            </DropdownMenuItem>
          )}
          {status !== 'REJECTED' && (
            <DropdownMenuItem
              onClick={() => setIsRejectModalOpen(true)}
              className="text-red-600"
              disabled={rejectMutation.isPending}
            >
              <X className="mr-2 h-4 w-4" />
              Từ chối ứng viên
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <RejectCandidateModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={handleReject}
        candidateName={candidate.name}
      />
    </>
  )
}
