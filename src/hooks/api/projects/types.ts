export enum ProjectTypes {
  PENDING = 'PENDING',
  UPDATE_REQUIRED = 'UPDATE_REQUIRED',
  REJECTED = 'REJECTED',
  PLANNING = 'PLANNING',
  ON_GOING = 'ON_GOING',
  CLOSED = 'CLOSED',
  COMPLETE = 'COMPLETE',
  PAUSED = 'PAUSED',
}

export interface Skill {
  id: string
  name: string
  description: string
}

export interface ProjectMentor {
  id: string
  name: string
  roleName: string
  leader: boolean
}

export interface TeamMember {
  id: string
  name: string
  avatar?: string
  roleName: string
}

export interface ProjectDetail {
  id: string
  companyId: string
  mentorId: string
  title: string
  description: string
  status: string
  isOpenForApplications: boolean
  startDate: string
  endDate: string
  budget: number
  skills: Skill[]
  mentors: ProjectMentor[]
  team?: TeamMember[]
  createdAt: string
  updatedAt: string
  createdBy: string
  createdByName: string
  createdByAvatar: string
  currentMilestoneId: string
  currentMilestoneName: string
  companyName: string
}

export interface ProjectListItem {
  id: string
  title: string
  description: string
  status: ProjectTypes
  startDate: string
  endDate: string
  budget: number
  mentors: ProjectMentor[]
  skills: Skill[]
  companyName?: string
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  errorCode: string
  timestamp: string
}

export interface Project {
  projectId: string
  projectName: string
  description: string
  startDate: string
  endDate: string
  currentApplicants: number
  mentors: ProjectMentor[]
  skills: Skill[]
  budget?: number
  status?: ProjectTypes
}
export interface MilestoneUser {
  userId: string
  name: string
  avatar: string
  email: string
  phone: string
}

export interface Milestone {
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

export interface MilestonesResponse {
  success: boolean
  message: string
  data: Milestone[]
  errorCode: string
  timestamp: string
}

