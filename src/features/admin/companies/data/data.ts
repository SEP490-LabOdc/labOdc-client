import type { CompanyStatus } from "./schema";

export const callTypes = new Map<CompanyStatus, string>([
    ['DISABLED', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
    ['UPDATE_REQUIRED', 'bg-neutral-300/40 border-neutral-300'],
    ['PENDING', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
    ['DISABLED', 'bg-red-400/30 text-red-900 dark:bg-red-700/50 dark:text-red-100 border-red-500'],
])
