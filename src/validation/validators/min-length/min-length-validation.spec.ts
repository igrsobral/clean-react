import { InvalidFieldError } from "../email/invalid-field-error";
import { MinLenghtValidation } from "./min-length-validation";

describe('MinLengthValidation',  () => {
    test('Should return error if value is invalid', () =>{
        const sut = new MinLenghtValidation('field', 5);
        const error = sut.validate('123');
        expect(error).toEqual(new InvalidFieldError())
    })
})