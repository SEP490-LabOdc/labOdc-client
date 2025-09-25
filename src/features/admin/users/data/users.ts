// Function to generate a random UUID
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Function to generate a random string
function randomString(length: any) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Function to generate a random number within a range
function randomNumber(min: any, max: any) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random email
function randomEmail(firstName: any, lastName: any) {
    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomNumber(10, 99)}@example.com`;
}

// Function to generate a random phone number
function randomPhoneNumber() {
    const areaCode = randomNumber(100, 999);
    const prefix = randomNumber(100, 999);
    const suffix = randomNumber(1000, 9999);
    return `+1 (${areaCode}) ${prefix}-${suffix}`;
}

// Function to generate a random date within a range
function randomDate(start: any, end: any) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Array of possible values
const statuses = ['active', 'inactive', 'invited', 'suspended'];
const roles = ['superadmin', 'admin', 'cashier', 'manager'];
const firstNames = ['John', 'Jane', 'Peter', 'Susan', 'Mike', 'Emily', 'David', 'Laura'];
const lastNames = ['Smith', 'Doe', 'Jones', 'Williams', 'Brown', 'Davis', 'Miller'];

// Generate the users array
export const users = Array.from({ length: 500 }, () => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const role = roles[Math.floor(Math.random() * roles.length)];
    const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${randomNumber(1, 100)}`;

    return {
        id: uuidv4(),
        firstName,
        lastName,
        username: username,
        email: randomEmail(firstName, lastName),
        phoneNumber: randomPhoneNumber(),
        status,
        role,
        createdAt: randomDate(new Date(2020, 0, 1), new Date()),
        updatedAt: randomDate(new Date(2022, 0, 1), new Date()),
    };
});