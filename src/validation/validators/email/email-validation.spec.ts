import { EmailValidation } from "./email-validation";
import { InvalidFieldError } from "./invalid-field-error";
import faker from 'faker'; 


describe('EmailValidation',  ()=> {
    test('Shoult return error if email is invalid', () => {
        const sut = new EmailValidation(faker.random.words());
        const error = sut.validate(faker.random.words());
        expect(error).toEqual(new InvalidFieldError())
    })
   
    test('Shoult return falsy if email is valid', () => {
        const sut = new EmailValidation(faker.random.words());
        const error = sut.validate(faker.internet.email());
        expect(error).toBeFalsy()
    })
})