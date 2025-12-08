export const systemConfigKeys = {
    all: ['system-config'] as const,
    lists: () => [...systemConfigKeys.all, 'list'] as const,
    list: (page?: number, pageSize?: number) =>
        [...systemConfigKeys.lists(), page, pageSize] as const,
    details: () => [...systemConfigKeys.all, 'detail'] as const,
    detail: (id: string) => [...systemConfigKeys.details(), id] as const,
}

