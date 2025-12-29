import type { ExtensionRequestParams } from "./types";

export const milestoneKeys = {
    all: ['milestones'] as const,

    list: (projectId: string) =>
        [...milestoneKeys.all, 'list', projectId] as const,

    detail: (id: string) =>
        [...milestoneKeys.all, 'detail', id] as const,

    milestoneMembers: (milestoneId: string) =>
        [...milestoneKeys.all, 'milestone-members', milestoneId] as const,
    milestoneMembersByRole: (milestoneId: string, role: string) =>
        [...milestoneKeys.all, 'milestone-members-by-role', milestoneId, role] as const,
    milestoneFeedbacks: (milestoneId: string) =>
        [...milestoneKeys.all, 'milestone-feedbacks', milestoneId] as const,
    milestoneExtensionRequests: (milestoneId: string) =>
        [...milestoneKeys.all, 'milestone-extension-requests', milestoneId] as const,
    extensionRequests: (params: ExtensionRequestParams) =>
        [...milestoneKeys.all, 'extension-requests', params.milestoneId, params.projectId, params.companyId, params.page, params.size, params.sortDir] as const,
}