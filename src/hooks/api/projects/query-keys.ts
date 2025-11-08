export const projectKeys = {
  getAllProjects: ['projects'] as const,
  getProjectsByCompanyId: (companyId: string) => ['projects', { companyId }] as const,
  all: ['projects'] as const,
  myCompany: () => [...projectKeys.all, 'my-company-projects'] as const,
  byId: (id: string) => [...projectKeys.all, 'by-id', id] as const,
};

