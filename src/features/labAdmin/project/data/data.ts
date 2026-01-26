import type { ProjectStatus } from "./schema";

export const callTypes = new Map<ProjectStatus, string>([
    [
        'PENDING',
        'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300',
    ],
    [
        'UPDATE_REQUIRED',
        'bg-orange-200/40 text-orange-900 dark:text-orange-100 border-orange-300',
    ],
    [
        'REJECTED',
        'bg-red-200/40 text-red-900 dark:text-red-100 border-red-300',
    ],
    [
        'PLANNING',
        'bg-blue-200/40 text-blue-900 dark:text-blue-100 border-blue-300',
    ],
    [
        'ON_GOING',
        'bg-emerald-200/40 text-emerald-900 dark:text-emerald-100 border-emerald-300',
    ],
    [
        'PAUSED',
        'bg-gray-200/40 text-gray-900 dark:text-gray-100 border-gray-300',
    ],
    [
        'CLOSED',
        'bg-slate-200/40 text-slate-900 dark:text-slate-100 border-slate-300',
    ],
    [
        'COMPLETE',
        'bg-teal-200/40 text-teal-900 dark:text-teal-100 border-teal-300',
    ],
    [
        'PENDING_CLOSURE',
        'bg-teal-100 text-teal-800 border-teal-200'
    ]
]);
