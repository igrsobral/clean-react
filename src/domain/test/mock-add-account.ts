import * as faker from 'faker'
import { AddAccountParams } from '../useCases'


export const mockAddAccountParams = (): AddAccountParams => {
    const password = faker.internet.password()
    return {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: password,
        passwordConfirmation: password
    }
}