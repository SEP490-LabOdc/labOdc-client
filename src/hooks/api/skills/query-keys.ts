export const skillKeys = {
    all: ['skills'] as const,
    list: () => [...skillKeys.all, 'list'] as const,
}