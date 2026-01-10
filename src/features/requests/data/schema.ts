import z from "zod"

export const REQUEST_STATUS = {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
} as const

export const requestStatusSchema = z.nativeEnum(REQUEST_STATUS)
export type RequestStatus = z.infer<typeof requestStatusSchema>

export const REQUEST_STATUS_LABEL: Record<RequestStatus, string> = {
    [REQUEST_STATUS.PENDING]: 'Chờ duyệt',
    [REQUEST_STATUS.APPROVED]: 'Đã duyệt',
    [REQUEST_STATUS.REJECTED]: 'Từ chối',
}

export const REQUEST_STATUS_OPTIONS = Object.entries(REQUEST_STATUS_LABEL).map(
    ([value, label]) => ({ value, label })
)

export const REQUEST_TYPE = {
    UPDATE_USER: 'UPDATE_USER',
    UPDATE_COMPANY: 'UPDATE_COMPANY',
} as const

export const requestTypeSchema = z.nativeEnum(REQUEST_TYPE)
export type RequestType = z.infer<typeof requestTypeSchema>

export const REQUEST_TYPE_LABEL: Record<RequestType, string> = {
    [REQUEST_TYPE.UPDATE_USER]: 'Cập nhật thông tin người dùng',
    [REQUEST_TYPE.UPDATE_COMPANY]: 'Cập nhật thông tin công ty',
}

export const REQUEST_TYPE_OPTIONS = Object.entries(REQUEST_TYPE_LABEL).map(
    ([value, label]) => ({ value, label })
)

export const requestSchema = z.object({
    id: z.string(),

    code: z.string(),

    requestType: requestTypeSchema,

    targetId: z.string(),
    // userId hoặc companyId – FE chỉ cần hiển thị tên (BE map)

    targetName: z.string().optional(),
    // Tên user / company (BE trả thêm cho list)

    createdByName: z.string().optional(),

    status: requestStatusSchema,

    processedByName: z.string().nullable().optional(),

    note: z.string().nullable().optional(),

    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
})

export const requestListSchema = z.array(requestSchema)
export type Request = z.infer<typeof requestSchema>
export type RequestList = z.infer<typeof requestListSchema>