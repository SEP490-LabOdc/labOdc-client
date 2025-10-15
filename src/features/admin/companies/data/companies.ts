import { faker } from '@faker-js/faker'

faker.seed(12345)

export type Company = {
    id: string
    name: string
    email: string
    taxCode: string
    address: string
    phone: string
    domain: string | null
    status: 'approving' | 'rejected' | 'active' | 'inactive' | 'suspended' | 'Pending'
    contactPersonName: string | null
    contactPersonEmail: string | null
    contactPersonPhone: string | null
    website: string | null
    createdAt: Date
}

export const companies: Company[] = Array.from({ length: 150 }, () => {
    const status = faker.helpers.arrayElement([
        'approving',
        'active',
        'inactive',
        'suspended',
        'rejected',
        'Pending',
    ]) as Company['status']

    return {
        id: faker.string.uuid(),
        name: faker.company.name(),
        email: faker.internet.email(),
        taxCode: faker.finance.accountNumber(),
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        domain: faker.helpers.arrayElement([faker.lorem.word(), '', null]),
        status: status,
        contactPersonName: faker.person.fullName(),
        contactPersonEmail: faker.internet.email(),
        contactPersonPhone: faker.phone.number(),
        website: faker.helpers.arrayElement([faker.internet.url(), '', null]),
        createdAt: faker.date.recent({ days: 180 }),
    }
})