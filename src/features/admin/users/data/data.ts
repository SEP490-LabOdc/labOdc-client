import { LockKeyhole, FlaskConical, Building, GraduationCap, Sparkles } from 'lucide-react'
import { type UserStatus } from './schema'

export const callTypes = new Map<UserStatus, string>([
    ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
    ['inactive', 'bg-neutral-300/40 border-neutral-300'],
    ['invited', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
    [
        'suspended',
        'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
    ],
])

export const roles = [
    {
        label: 'Admin',
        value: 'admin',
        icon: LockKeyhole,
    },
    {
        label: 'Lab Manager',
        value: 'lab_manager',
        icon: FlaskConical,
    },
    {
        label: 'Company Admin',
        value: 'company_admin',
        icon: Building,
    },
    {
        label: 'Mentor',
        value: 'mentor',
        icon: GraduationCap,
    },
    {
        label: 'Talent',
        value: 'talent',
        icon: Sparkles,
    },
] as const