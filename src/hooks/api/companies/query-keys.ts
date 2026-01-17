export const companyKeys = {
    getCompanies: ["companies"] as const,
    getCompanyById: ['company'] as const,
    getCheckList: ["checklist-templates", "company-registration"] as const,
    patchCompany: ['company', 'patch'] as const,
    getCompanyChecklists: ['companies', 'checklists'] as const,
    updateCompanyRegistration: (token: string) => ['update-company-registration', token] as const,
    me: () => ['companies', 'me'] as const,
    getPublicCompanies: ['companies', 'public'] as const,
    getPublicCompanyDetails: (companyId: string) => ['company-public-details', companyId] as const,
}