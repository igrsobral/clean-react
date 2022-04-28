import { RequiredFieldValidation } from "@/validation/validators"
import { EmailValidation } from "../email/email-validation"
import { MinLenghtValidation } from "../min-length/min-length-validation"
import { ValidationBuilder as sut } from "./validation-builder"

describe('ValidationBuilder', () => {
    test('Should return RequiredFieldValidation', () => {
       const validations = sut.field('any_field').required().build()
       expect(validations).toEqual([new RequiredFieldValidation('any_field')])
    })   

    test('Should return EmailValidation', () => {
        const validations = sut.field('any_field').required().build()
        expect(validations).toEqual([new EmailValidation('any_field')])
    })   
   
    test('Should return MinLenghtValidation', () => {
        const validations = sut.field('any_field').min(5).build()
        expect(validations).toEqual([new MinLenghtValidation('any_field', 5)])
    })   
})
