import { z } from 'zod'

const companyStatusSchema = z.union([
    z.literal('active'),
    z.literal('inactive'),
    z.literal('suspended'),
    z.literal('approving'),
    z.literal('rejected'),
])
export type CompanyStatus = z.infer<typeof companyStatusSchema>

export const companySchema = z.object({
    id: z.string(),
    companyName: z.string().min(2, 'Tên công ty phải có ít nhất 2 ký tự.'),
    description: z.string(),
    taxId: z.string().regex(/^\d{10,13}$/, 'Mã số thuế không hợp lệ.'),
    address: z.string().nullable().optional(),
    industry: z.string(),
    techStack: z.string(),
    accountManagerId: z.string(),
    status: companyStatusSchema,
    lastInteraction: z.coerce.date(),
    logoUrl: z.string(),
})
export type Company = z.infer<typeof companySchema>

export const companyListSchema = z.array(companySchema)
