export const systemTemplateKeys = {
    getSystemTemplates: (templateType: string) => ['system-templates', { templateType }] as const,
};