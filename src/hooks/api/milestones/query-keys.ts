export const milestoneKeys = {
    all: ['milestones'] as const,

    list: (projectId: string) =>
        [...milestoneKeys.all, 'list', projectId] as const,

    detail: (id: string) =>
        [...milestoneKeys.all, 'detail', id] as const,
}