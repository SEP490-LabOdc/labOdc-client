export interface Report {
    id: string
    projectId: string
    projectName: string
    reporterId: string
    reporterName: string
    reporterEmail: string
    reporterAvatar: string
    reportType: string
    status: string
    content: string
    attachmentsUrl: string[]
    reportingDate: string
    createdAt: string
    feedback: string
    milestoneId: string
    milestoneTitle: string
    companyId: string
    companyName: string
    companyLogo: string
    companyEmail: string
    userCompanyId: string
    userCompanyEmail: string
    userCompanyAvatar: string
}   