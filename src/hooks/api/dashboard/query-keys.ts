export const dashboardKey = {
    getCompanyLast6MonthStatistic: ['companies', 'statistics', 'last-6-months'],
    getProjectLast6MonthStatistic: ['projects', 'statistics', 'last-6-months'],
    root: ['dashboard'] as const,
    projectOverview: ['dashboard', 'project', 'overview'] as const,
    companyOverview: ['dashboard', 'company', 'overview'] as const,
    userOverview: ['dashboard', 'user', 'overview'] as const,
}