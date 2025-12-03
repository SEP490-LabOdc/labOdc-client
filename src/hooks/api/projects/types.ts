import React from 'react'

export enum ProjectTypes {
  PENDING = 'PENDING',
  UPDATE_REQUIRED = 'UPDATE_REQUIRED',
  REJECTED = 'REJECTED',
  PLANNING = 'PLANNING',
  ON_GOING = 'ON_GOING',
  CLOSED = 'CLOSED',
  COMPLETED = 'COMPLETED',
  PAUSED = 'PAUSED',
  PENDING_START = 'PENDING_START',
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
  leader?: boolean
}

export interface ProjectMember {
  projectMemberId: string
  userId: string
  fullName: string
  email: string
  avatarUrl?: string
  roleName: 'MENTOR' | 'TALENT'
  isLeader?: boolean
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

export interface MilestonesResponse {
  success: boolean
  message: string
  data: Milestone[]
  errorCode: string
  timestamp: string
}

export interface Note {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
}

export interface Activity {
  id: number;
  user: TeamMember;
  action: string;
  timestamp: string;
  detail?: React.ReactNode;
}

export interface Invoice {
  id: string;
  name: string;
  date: string;
  amount: number;
  status: string;
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
  remainingBudget?: number
  skills: Skill[]
  mentors: ProjectMentor[]
  talents?: TeamMember[]
  createdAt: string
  updatedAt: string
  createdBy: string
  createdByName: string
  createdByAvatar: string
  currentMilestoneId: string
  currentMilestoneName: string
  companyName: string
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

