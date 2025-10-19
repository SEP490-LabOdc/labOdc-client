import { z } from 'zod'

// Enum status
export const companyStatusSchema = z.union([
    z.literal('PENDING'),
    z.literal('UPDATE_REQUIRED'),
    z.literal('ACTIVE'),
    z.literal('DISABLED'),
])
export type CompanyStatus = z.infer<typeof companyStatusSchema>

// Schema Company
export const companySchema = z.object({
    id: z.string(),
    name: z.string().min(2, 'Tên công ty phải có ít nhất 2 ký tự.'),
    description: z.string().nullable(),
    email: z.string().email('Email không hợp lệ.'),
    taxCode: z.string().regex(/^\d{10,13}$/, 'Mã số thuế không hợp lệ.'),
    address: z.string().min(1, 'Địa chỉ là bắt buộc.'),
    phone: z.string().min(6, 'Số điện thoại không hợp lệ.'),
    domain: z.string().nullable().optional(),
    status: companyStatusSchema,
    website: z.string().nullable().optional(),
    logo: z.string().nullable(),
    banner: z.string().nullable(),
    contactPersonName: z.string().nullable().optional(),
    contactPersonEmail: z.string().email('Email người liên hệ không hợp lệ.').nullable().optional(),
    contactPersonPhone: z.string().nullable().optional(),
    createdAt: z.coerce.date(),

})

export type Company = z.infer<typeof companySchema>

// Schema danh sách Company
export const companyListSchema = z.array(companySchema)
