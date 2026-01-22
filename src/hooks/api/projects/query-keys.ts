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
  getProjectApplicationStatus: (projectId: string | undefined) => ['project-application-status', { projectId }] as const,
  getProjectMembers: (projectId: string, milestoneId?: string) =>
    ['project-members', { projectId, ...(milestoneId && { milestoneId }) }] as const,
  getProjectDocuments: (projectId: string) => ['project-documents', { projectId }] as const,
  getProjectMilestoneDocuments: (milestoneId: string) => ['project-milestone-documents', { milestoneId }] as const,
  getProjectMilestoneReports: (milestoneId: string) => ['project-milestone-reports', { milestoneId }] as const,
  getMyApplications: () => ['my-applications'] as const,
  getReportRecipients: (projectId: string, milestoneId: string) => ['report-recipients', { projectId, milestoneId }] as const,
};

