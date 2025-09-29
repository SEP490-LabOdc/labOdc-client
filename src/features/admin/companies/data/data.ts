import type { CompanyStatus } from "./schema";

export const callTypes = new Map<CompanyStatus, string>([
    ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
    ['inactive', 'bg-neutral-300/40 border-neutral-300'],
    ['approving', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
    ['rejected', 'bg-red-400/30 text-red-900 dark:bg-red-700/50 dark:text-red-100 border-red-500'],
    [
        'suspended',
        'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
    ],
])
