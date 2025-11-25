export const projectKeys = {
  getAllProjects: ['projects'] as const,
  getProjectsByCompanyId: (companyId: string) => ['projects', { companyId }] as const,
  all: ['projects'] as const,
  myCompany: () => [...projectKeys.all, 'my-company-projects'] as const,
  byId: (id: string) => [...projectKeys.all, 'by-id', id] as const,
  list: () => [...projectKeys.all, 'list'] as const,
  getProjectHiring: ['project-hiring'] as const,
  getProjectParticipants: (projectId: string) => ['project-participants', { projectId }] as const,
  getProjectMilestones: (projectId: string) => ['project-milestones', { projectId }] as const,
  getProjectApplicants: (projectId: string) => ['project-applicants', { projectId }] as const,
  getMyProjects: (status: string) => ['my-projects', { status }] as const,
  getProjectApplicationStatus: (projectId: string) => ['project-application-status', { projectId }] as const,
};

