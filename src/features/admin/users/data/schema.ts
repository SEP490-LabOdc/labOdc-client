import { z } from 'zod'

const userStatusSchema = z.union([
    z.literal('ACTIVE'),
    z.literal('INACTIVE'),
    z.literal('INVITED'),
    z.literal('SUSPENDED'),
])
export type UserStatus = z.infer<typeof userStatusSchema>

const userRoleSchema = z.union([
    z.literal('SYSTEM_ADMIN'),
    z.literal('LAB_ADMIN'),
    z.literal('SUPERVISOR'),
    z.literal('USER'),
    z.literal('COMPANY'),
])
export type UserRole = z.infer<typeof userRoleSchema>

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
