import { faker } from '@faker-js/faker'

faker.seed(12345)

export type Company = {
    id: string
    companyName: string
    description: string
    taxId: string
    address: string
    industry: string
    status: 'approving' | 'rejected' | 'active' | 'inactive' | 'suspended'
    techStack: string
    accountManagerId: string
    lastInteraction: Date
    logoUrl: string // Thêm trường URL ảnh logo
}

export const companies: Company[] = Array.from({ length: 150 }, () => {
    return {
        id: faker.string.uuid(),
        companyName: faker.company.name(),
        description: faker.company.catchPhrase(),
        taxId: faker.finance.accountNumber(10),
        address: faker.location.streetAddress(false),
        industry: faker.helpers.arrayElement([
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
            'rejected'
        ]),
        techStack: faker.helpers.arrayElement([
            'React/Node.js/AWS',
            'Angular/.NET/Azure',
            'Python/Django/GCP',
            'iOS/Android (Native)',
            'Java/Spring/Microservices',
        ]),
        accountManagerId: faker.person.fullName(),
        lastInteraction: faker.date.recent({ days: 60 }),
        logoUrl: faker.image.url({ width: 64, height: 64 }),
    }
})
