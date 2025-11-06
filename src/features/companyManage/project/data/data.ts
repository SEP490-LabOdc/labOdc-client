import type { ProjectStatus } from "./schema";

export const callTypes = new Map<ProjectStatus, string>([
    [
        'PENDING',
        'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300',
    ],
    [
        'APPROVED',
        'bg-blue-200/40 text-blue-900 dark:text-blue-100 border-blue-300',
    ],
    [
        'HIRING',
        'bg-emerald-200/40 text-emerald-900 dark:text-emerald-100 border-emerald-300',
    ],
    [
        'IN_PROGRESS',
        'bg-amber-200/40 text-amber-900 dark:text-amber-100 border-amber-300',
    ],
    [
        'COMPLETED',
        'bg-teal-200/40 text-teal-900 dark:text-teal-100 border-teal-300',
    ],
])