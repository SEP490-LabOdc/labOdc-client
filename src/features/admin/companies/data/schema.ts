import { z } from 'zod'

// Enum status
export const companyStatusSchema = z.union([
    z.literal('active'),
    z.literal('inactive'),
    z.literal('suspended'),
    z.literal('approving'),
    z.literal('rejected'),
])
export type CompanyStatus = z.infer<typeof companyStatusSchema>

// Schema Company
export const companySchema = z.object({
    id: z.string(),
    companyName: z.string().min(2, 'Tên công ty phải có ít nhất 2 ký tự.'),
    description: z.string().min(1, 'Mô tả là bắt buộc.'),
    email: z.string().email('Email không hợp lệ.'),
    taxId: z.string().regex(/^\d{10,13}$/, 'Mã số thuế không hợp lệ.'),
    address: z.string().min(1, 'Địa chỉ là bắt buộc.'),
    phoneNumber: z.string().min(6, 'Số điện thoại không hợp lệ.'),
    domain: z.string().min(1, 'Lĩnh vực là bắt buộc.'),
    status: companyStatusSchema,
    logo: z.string().url('Logo phải là một URL hợp lệ.'),
    banner: z.string().url('Banner phải là một URL hợp lệ.'),
    accountManager: z.string().min(1, 'Người quản lý tài khoản là bắt buộc.'),
    lastInteraction: z.coerce.date(), // ép về Date
})

export type Company = z.infer<typeof companySchema>

// Schema danh sách Company
export const companyListSchema = z.array(companySchema)
