import { z } from 'zod'

export const COMPANY_STATUS = {
    PENDING: 'PENDING',
    UPDATE_REQUIRED: 'UPDATE_REQUIRED',
    ACTIVE: 'ACTIVE',
    DISABLED: 'DISABLED',
} as const;

export const COMPANY_STATUS_LABEL: Record<CompanyStatus, string> = {
    [COMPANY_STATUS.PENDING]: 'Chờ duyệt',
    [COMPANY_STATUS.UPDATE_REQUIRED]: 'Cần cập nhật',
    [COMPANY_STATUS.ACTIVE]: 'Đang hoạt động',
    [COMPANY_STATUS.DISABLED]: 'Ngừng hoạt động',
};

export const COMPANY_STATUS_OPTIONS = Object.entries(COMPANY_STATUS_LABEL).map(
    ([value, label]) => ({ value, label })
);
export const companyStatusSchema = z.enum(COMPANY_STATUS);
export type CompanyStatus = z.infer<typeof companyStatusSchema>;

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
