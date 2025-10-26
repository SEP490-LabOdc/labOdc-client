import { LockKeyhole, FlaskConical, ShieldCheck, User, Building2 } from 'lucide-react'
import { type UserStatus } from './schema'

export const callTypes = new Map<UserStatus, string>([
    ['ACTIVE', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
    ['INACTIVE', 'bg-neutral-300/40 border-neutral-300'],
    ['INVITED', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
    [
        'SUSPENDED',
        'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
    ],
])

export const roles = [
    {
        label: 'Quản trị viên',
        value: 'SYSTEM_ADMIN',
        icon: LockKeyhole,
    },
    {
        label: 'Quản lý LabOdc',
        value: 'LAB_ADMIN',
        icon: FlaskConical,
    },
    {
        label: 'Giám sát viên',
        value: 'SUPERVISOR',
        icon: ShieldCheck,
    },
    {
        label: 'Sinh viên',
        value: 'USER',
        icon: User,
    },
    {
        label: 'Đại diện công ty',
        value: 'COMPANY',
        icon: Building2,
    },
] as const
