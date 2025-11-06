export const projectKeys = {
  getAllProjects: ['projects'] as const,
  getProjectsByCompanyId: (companyId: string) =>  ['projects', { companyId }] as const,
}