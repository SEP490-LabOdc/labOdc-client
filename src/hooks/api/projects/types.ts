export enum ProjectTypes {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CLOSED = 'CLOSED',
}

export interface Skill {
  id: string;
  name: string;
  description: string;
}

export interface Project {
  projectId: string
  projectName: string
  description: string
  startDate: string
  endDate: string
  currentApplicants: number
  mentors: any[]
  skills: Skill[]
  budget?: number // Add if needed
  status?: ProjectTypes // Add if needed
}