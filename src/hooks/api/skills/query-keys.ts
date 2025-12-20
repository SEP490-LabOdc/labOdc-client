export const skillKeys = {
    all: ['skills'] as const,
    list: () => [...skillKeys.all, 'list'] as const,
    byId: (id: string) => [...skillKeys.all, 'by-id', id] as const,
}