export const projectKeys = {
    all: ['projects'] as const,
    myCompany: () => [...projectKeys.all, 'my-company-projects'] as const,
};