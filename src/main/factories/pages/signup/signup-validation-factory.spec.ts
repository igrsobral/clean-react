import { EmailValidation, MinLenghtValidation, RequiredFieldValidation, ValidationComposite } from "@/validation/validators"
import { CompareFieldsValidation } from "@/validation/validators/compare-fields/compare-fields-validation"
import { makeSignUpValidation } from "./signup-validation-factory"

describe('LoginValidationFactory', () => {
    test('Should make ValidationComposite return correct validations', () => {
        const composite = makeSignUpValidation()
        expect(composite).toEqual(ValidationComposite.build([
            new RequiredFieldValidation('name'),
            new MinLenghtValidation('name', 5),
            new RequiredFieldValidation('email'),
            new EmailValidation('email'),
            new RequiredFieldValidation('password'),
            new MinLenghtValidation('password', 5),
            new RequiredFieldValidation('passwordConfirmation'),
            new CompareFieldsValidation('passwordConfirmation', 'password'),
        ]));
    })
})