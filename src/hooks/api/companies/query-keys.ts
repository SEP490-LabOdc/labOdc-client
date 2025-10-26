export const companyKeys = {
    getCompanies: ["companies"] as const,
    getCompanyById: ['company'] as const,
    getCheckList: ["checklist-templates", "company-registration"] as const,
    patchCompany: ['company', 'patch'] as const,
    updateCompanyRegistration: (token: string) => ['update-company-registration', token] as const,
}