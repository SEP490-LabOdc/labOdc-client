export const reportKeys = {
    all: ['reports'] as const,
    lists: () => [...reportKeys.all, 'list'] as const,
    list: (filters?: { page?: number; pageSize?: number }) =>
        [...reportKeys.lists(), { filters }] as const,
    byId: (id: string) => [...reportKeys.all, 'by-id', id] as const,
}