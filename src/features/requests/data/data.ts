import { type RequestStatus } from './schema'
import { type RequestType } from './schema'

export const requestStatusCallTypes = new Map<RequestStatus, string>([
    [
        'PENDING',
        'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300',
    ],
    [
        'APPROVED',
        'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200',
    ],
    [
        'REJECTED',
        'bg-red-400/30 text-red-900 dark:bg-red-700/50 dark:text-red-100 border-red-500',
    ],
])

export const requestTypeCallTypes = new Map<RequestType, string>([
    [
        'UPDATE_USER',
        'bg-teal-100/50 text-teal-900 dark:bg-teal-900/30 dark:text-teal-200 border-teal-300',
    ],
    [
        'UPDATE_COMPANY',
        'bg-violet-100/50 text-violet-900 dark:bg-violet-900/30 dark:text-violet-200 border-violet-300',
    ]
])