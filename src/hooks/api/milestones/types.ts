import type { ApiResponse } from '@/hooks/api/types'

export type MilestoneDetailResponse = ApiResponse<MilestoneDetail>

export enum MilestoneStatus {
  PENDING = 'PENDING',
  UPDATE_REQUIRED = 'UPDATE_REQUIRED',
  REJECTED = 'REJECTED',
  PLANNING = 'PLANNING',
  ON_GOING = 'ON_GOING',
  CLOSED = 'CLOSED',
  COMPLETED = 'COMPLETED',
  PAUSED = 'PAUSED',
  PENDING_START = 'PENDING_START',
  PAID = 'PAID',
}

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
  startDate: string
  endDate: string
  status: string
  talents: MilestoneUser[]
  mentors: MilestoneUser[]
}

