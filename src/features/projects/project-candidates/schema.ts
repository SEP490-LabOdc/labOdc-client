export type Candidate = {
  id: string
  userId: string
  name: string
  cvUrl: string
  status: string
  appliedAt: string
}

export const CANDIDATE_STATUS_OPTIONS = [
  { label: 'Đang chờ', value: 'PENDING' },
  { label: 'Đã duyệt', value: 'APPROVED' },
  { label: 'Từ chối', value: 'REJECTED' },
]
