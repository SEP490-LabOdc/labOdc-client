import type { ApiResponse } from '@/hooks/api/types'

/**
 * Properties của system config (fee-distribution)
 */
export interface FeeDistributionProperties {
    systemFeeRate: number
    mentorShareRate: number
    talentShareRate: number
}

/**
 * System Config entity với generic properties
 */
export interface SystemConfig<T = Record<string, any>> {
    id: string
    createdAt: string
    updatedAt: string
    createdBy: string | null
    updatedBy: string | null
    isDeleted: boolean | null
    properties: T
    name: string
    description: string
}

/**
 * Type-safe config types
 */
export type FeeDistributionConfig = SystemConfig<FeeDistributionProperties>

/**
 * Paginated response cho system configs
 */
export interface SystemConfigsPageData {
    data: SystemConfig[]
    totalElements: number
    totalPages: number
    currentPage: number
    hasNext: boolean
    hasPrevious: boolean
}

export type SystemConfigsResponse = ApiResponse<SystemConfigsPageData>

/**
 * Payload để update system config với generic properties
 */
export interface UpdateSystemConfigPayload<T = Record<string, any>> {
    id: string
    properties: T
}

/**
 * Payload để tạo system config mới
 */
export interface CreateSystemConfigPayload<T = Record<string, any>> {
    name: string
    description: string
    properties: T
}

