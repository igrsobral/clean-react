import { RequiredFieldValidation } from "@/validation/validators"
import { EmailValidation } from "../email/email-validation"
import { MinLenghtValidation } from "../min-length/min-length-validation"
import { ValidationBuilder as sut } from "./validation-builder"
import faker from "faker";

describe('ValidationBuilder', () => {
    test('Should return RequiredFieldValidation', () => {
       const field = faker.database.column();
       const validations = sut.field(field).required().build()
       expect(validations).toEqual([new RequiredFieldValidation(field)])
    })   

    test('Should return EmailValidation', () => {
        const field = faker.database.column();
        const validations = sut.field(field).required().build()
        expect(validations).toEqual([new EmailValidation(field)])
    })   
   
    test('Should return MinLenghtValidation', () => {
        const field = faker.database.column();
        const length = faker.datatype.number(1);
        const validations = sut.field(field).min(length).build()
        expect(validations).toEqual([new MinLenghtValidation(field, length)])
    })   

    test('Should return a list of validations', () => {
        const field = faker.database.column();
        const length = faker.datatype.number(1);
        const validations = sut.field(field).required().min(length).email().build()
        expect(validations).toEqual([
            new RequiredFieldValidation(field),
            new MinLenghtValidation(field, length),
            new EmailValidation(field)
        ])
    })   
})
