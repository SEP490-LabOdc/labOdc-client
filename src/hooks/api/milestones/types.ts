import type { ApiResponse } from '@/hooks/api/types'
import type { MilestoneStatus } from './enums'

export type MilestoneDetailResponse = ApiResponse<MilestoneDetail>

export interface MilestoneAttachment {
  id: string
  name: string
  fileName: string
  url: string
}

export interface Milestone {
  id: string
  projectId: string
  projectName: string
  title: string
  budget: number
  description: string
  startDate: string
  endDate: string
  status: string
  talents: MilestoneUser[]
  mentors: MilestoneUser[]
  attachments?: MilestoneAttachment[]
}

export interface MilestoneUser {
  userId: string
  name: string
  avatar: string
  email: string
  phone: string
}

export interface MilestoneMember {
  milestoneMemberId: string
  projectMemberId: string
  userId: string
  fullName: string
  email: string
  phone: string
  avatarUrl: string
  isActive: boolean
  joinedAt: string
  leftAt: string | null
  leader: boolean
}

export interface MilestoneMembersData {
  mentors: MilestoneMember[]
  talents: MilestoneMember[]
}

export type MilestoneMembersResponse = ApiResponse<MilestoneMembersData>

export interface MilestoneDetail {
  id: string
  projectId: string
  projectName: string
  title: string
  description: string
  budget: number
  startDate: string
  endDate: string
  status: string
  talents: MilestoneUser[]
  mentors: MilestoneUser[]
  attachments: MilestoneAttachment[]
}

export interface MilestoneFund {
  id: string
  title: string
  totalReceived: number
  remainingAmount: number
  status: MilestoneStatus
  releasedAt: string
  description: string
}

export interface MilestoneFeedback {
  id: string
  userId: string
  content: string
  attachments: MilestoneAttachment[]
  createdAt: string
}

export interface UpdateMilestonePayload {
  title: string
  description: string
  startDate: string
  endDate: string
  status: MilestoneStatus
  attachments: MilestoneAttachment[]
}

export interface ExtensionRequestPayload {
  milestoneId: string
  requestedEndDate: string
  currentEndDate: string
  requestReason: string
}

export interface ExtensionRequestParams {
  milestoneId: string
  projectId: string
  companyId: string
  page?: number
  size?: number
  sortDir?: string
}