export interface MilestoneUser {
  userId: string
  name: string
  avatar: string
  email: string
  phone: string
}

export interface MilestoneDetail {
  id: string
  projectId: string
  projectName: string
  title: string
  description: string
  startDate: string
  endDate: string
  status: string
  talents: MilestoneUser[]
  mentors: MilestoneUser[]
}

import type { ApiResponse } from '@/hooks/api/types'

export type MilestoneDetailResponse = ApiResponse<MilestoneDetail>
