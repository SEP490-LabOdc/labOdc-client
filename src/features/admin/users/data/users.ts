import { faker } from '@faker-js/faker'

// Set a fixed seed for consistent data generation
faker.seed(67890)

export const users = Array.from({ length: 500 }, () => {
    const userFullName = faker.person.fullName()
    const lastName = userFullName.split(' ').pop() || userFullName;;
    return {
        id: faker.string.uuid(),
        fullName: userFullName,
        username: faker.internet
            .username({ lastName })
            .toLocaleLowerCase(),
        email: faker.internet.email({ lastName }).toLocaleLowerCase(),
        phoneNumber: faker.phone.number({ style: 'international' }),
        status: faker.helpers.arrayElement([
            'active',
            'inactive',
            'invited',
            'suspended',
        ]),
        role: faker.helpers.arrayElement([
            'admin',
            'lab_manager',
            'company_admin',
            'mentor',
            'talent',
        ]),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
    }
})
