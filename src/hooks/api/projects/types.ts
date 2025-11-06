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
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  companyId: string;
  mentorId: string;
  title: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  budget: number;
  skills: Skill[];
  createdAt: string;
  updatedAt: string;
}