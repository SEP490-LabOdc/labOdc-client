import { z } from 'zod'

export const USER_STATUS = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    INVITED: 'INVITED',
    SUSPENDED: 'SUSPENDED',
} as const;

export const userStatusSchema = z.nativeEnum(USER_STATUS);
export type UserStatus = z.infer<typeof userStatusSchema>;

export const USER_STATUS_LABEL: Record<UserStatus, string> = {
    [USER_STATUS.ACTIVE]: 'Hoạt động',
    [USER_STATUS.INACTIVE]: 'Ngừng hoạt động',
    [USER_STATUS.INVITED]: 'Đã mời',
    [USER_STATUS.SUSPENDED]: 'Tạm khóa',
};

export const USER_STATUS_OPTIONS = Object.entries(USER_STATUS_LABEL).map(
    ([value, label]) => ({ value, label })
);

export const USER_ROLE = {
    SYSTEM_ADMIN: 'SYSTEM_ADMIN',
    LAB_ADMIN: 'LAB_ADMIN',
    SUPERVISOR: 'SUPERVISOR',
    USER: 'USER',
    COMPANY: 'COMPANY',
} as const;

export const userRoleSchema = z.nativeEnum(USER_ROLE);
export type UserRole = z.infer<typeof userRoleSchema>;

export const USER_ROLE_LABEL: Record<UserRole, string> = {
    [USER_ROLE.SYSTEM_ADMIN]: 'Quản trị hệ thống',
    [USER_ROLE.LAB_ADMIN]: 'Quản lý LabOdc',
    [USER_ROLE.SUPERVISOR]: 'Mentor',
    [USER_ROLE.USER]: 'Sinh Viên',
    [USER_ROLE.COMPANY]: 'Doanh nghiệp',
};

export const USER_ROLE_OPTIONS = Object.entries(USER_ROLE_LABEL).map(
    ([value, label]) => ({ value, label })
);


export const userSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    phone: z.string().nullable().optional(),
    fullName: z.string(),
    birthDate: z.string().datetime().nullable().optional(),
    avatarUrl: z.string().url().nullable().optional(),
    role: userRoleSchema,
    gender: z.union([z.literal('MALE'), z.literal('FEMALE')]).nullable().optional(),
    status: userStatusSchema.default('ACTIVE'),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
})
export type User = z.infer<typeof userSchema>

export const userListSchema = z.array(userSchema)
