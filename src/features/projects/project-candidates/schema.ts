export type AiScanResult = {
  is_cv: boolean
  reason: string
  match_score: number
  summary: string
  pros: string[]
  cons: string[]
}

export type Candidate = {
  id: string
  userId: string
  name: string
  cvUrl: string
  status: string
  appliedAt: string
  aiScanResult?: AiScanResult
}

export const CANDIDATE_STATUS_OPTIONS = [
  { label: 'Đang chờ', value: 'PENDING' },
  { label: 'Đã duyệt', value: 'APPROVED' },
  { label: 'Từ chối', value: 'REJECTED' },
]
