import { EmailValidation } from "./email-validation";
import { InvalidFieldError } from "./invalid-field-error";



describe('EmailValidation',  ()=> {
    test('Shoult return error if email is invalid', () => {
        const sut = new EmailValidation('email');
        const error = sut.validate('');
        expect(error).toEqual(new InvalidFieldError())
    })
})