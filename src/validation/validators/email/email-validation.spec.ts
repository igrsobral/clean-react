import { EmailValidation } from "./email-validation";
import { InvalidFieldError } from "./invalid-field-error";
import faker from 'faker'; 

const makeSut = (field: string) : EmailValidation => new EmailValidation(field);


describe('EmailValidation',  ()=> {
    test('Shoult return error if email is invalid', () => {
        const field = faker.database.column();
        const sut = makeSut(field);
        const error = sut.validate({[field]: faker.random.words()});
        expect(error).toEqual(new InvalidFieldError())
    })
   
    test('Should return falsy if email is valid', () => {
        const field = faker.database.column();
        const sut = makeSut(field);
        const error = sut.validate({[field]: faker.internet.email()});
        expect(error).toBeFalsy()
    })
   
    test('Should return falsy if email is empty', () => {
        const field = faker.random.word();
        const sut = makeSut(field);
        const error = sut.validate({[field]: ""});
        expect(error).toBeFalsy()
    })
})