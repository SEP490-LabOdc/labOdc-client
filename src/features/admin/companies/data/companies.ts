import { faker } from '@faker-js/faker'

faker.seed(12345)

export type Company = {
    id: string
    companyName: string
    description: string
    email: string
    taxId: string
    address: string
    phoneNumber: string
    domain: string
    status: 'approving' | 'rejected' | 'active' | 'inactive' | 'suspended'
    logo: string
    banner: string
    accountManager: string
    lastInteraction: Date
}

export const companies: Company[] = Array.from({ length: 150 }, () => {
    return {
        id: faker.string.uuid(),
        companyName: faker.company.name(),
        description: faker.company.catchPhrase(),
        email: faker.internet.email(),
        taxId: faker.finance.accountNumber(10),
        address: faker.location.streetAddress(),
        phoneNumber: faker.phone.number(),
        domain: faker.helpers.arrayElement([
            'Fintech',
            'E-commerce',
            'Healthcare',
            'EdTech',
            'Logistics',
            'Gaming',
            'SaaS',
            'AI/ML',
        ]),
        status: faker.helpers.arrayElement([
            'approving',
            'active',
            'inactive',
            'suspended',
            'rejected',
        ]),
        logo: faker.image.url({ width: 96, height: 96 }),
        banner: faker.image.url({ width: 1200, height: 300 }),
        accountManager: faker.person.fullName(),
        lastInteraction: faker.date.recent({ days: 60 }),
    }
})
