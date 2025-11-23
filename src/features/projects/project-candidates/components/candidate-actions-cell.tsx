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

interface CandidateActionsCellProps {
  candidate: Candidate
}

export function CandidateActionsCell({ candidate }: CandidateActionsCellProps) {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const status = candidate.status

  const handleApprove = () => {
    console.log('Approve', candidate.id)
    // TODO: Implement approve API call
  }

  const handleReject = (note: string) => {
    console.log('Reject', candidate.id, 'with note:', note)
    // TODO: Implement reject API call with note
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
            >
              <Check className="mr-2 h-4 w-4" />
              Duyệt ứng viên
            </DropdownMenuItem>
          )}
          {status !== 'REJECTED' && (
            <DropdownMenuItem
              onClick={() => setIsRejectModalOpen(true)}
              className="text-red-600"
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
