import { type RequestStatus } from './schema'
import { type RequestType } from './schema'

export const requestStatusCallTypes = new Map<RequestStatus, string>([
    [
        'PENDING',
        'bg-sky-100/40 text-sky-900 dark:text-sky-100 border-sky-300',
    ],
    [
        'APPROVED',
        'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200',
    ],
    [
        'REJECTED',
        'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
    ],
])

export const requestTypeCallTypes = new Map<RequestType, string>([
    [
        'UPDATE_USER',
        'bg-indigo-100/40 text-indigo-900 dark:text-indigo-200 border-indigo-300',
    ],
    [
        'UPDATE_COMPANY',
        'bg-amber-100/40 text-amber-900 dark:text-amber-200 border-amber-300',
    ],
])