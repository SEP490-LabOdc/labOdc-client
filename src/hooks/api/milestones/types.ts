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

export interface MilestoneDetailResponse {
  success: boolean
  message: string
  data: MilestoneDetail
  errorCode: string
  timestamp: string
}
