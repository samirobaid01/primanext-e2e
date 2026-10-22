import { faker } from '@faker-js/faker';

export const createUser = () => ({
  firstName: faker.person.firstName(),
  lastName:  faker.person.lastName(),
  email:     faker.internet.email(),
  phone:     faker.phone.number({ style: 'national' }),
});

export const createOrg = () => ({
  name:    faker.company.name(),
  address: faker.location.streetAddress({ useFullAddress: true }),
});
