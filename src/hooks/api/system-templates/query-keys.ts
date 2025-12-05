export interface FilterOption {
    key: string
    operator: string
    value: string
    valueTo?: {}
}

export const systemTemplateKeys = {
    getSystemTemplates: (templateType: string) => ['system-templates', { templateType }] as const,
    getAllSystemTemplates: (page?: number, size?: number, filters?: FilterOption[]) =>
        ['system-templates', 'all', { page, size, filters }] as const,
};