export interface MyCompanyInfo {
    id: string
    name: string
    email: string
    phone: string
    taxCode: string
    address: string
    description: string
    website: string
    domain: string
    status: string
}

export interface PatchPendingCompanyPayload {
    id: string
    status: 'ACTIVE' | 'UPDATE_REQUIRED'
    templateId: string
    assigneeId: string
    notes?: string
    items: {
        templateItemId: string
        completedById: string
        isChecked: boolean
    }[]
}

export interface SearchCompaniesPayload {
    filters: [
        {
            key: string,
            operator: string,
            value: string,
            valueTo: Object
        }
    ],
    sorts: [
        {
            key: string,
            direction: string
        }
    ],
    page: number,
    size: number
}

export interface Company {
    id: string
    name: string
    email: string
    phone: string
    taxCode: string
    address: string
    logo: string
    description: string
    website: string
    status: string
    domain: string
    contactPersonName: string
    contactPersonEmail: string
    contactPersonPhone: string
}
