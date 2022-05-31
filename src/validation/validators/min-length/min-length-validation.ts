import { FieldValidation } from "@/validation/protocols/field-validation";
import { InvalidFieldError } from "../email/invalid-field-error";

export class MinLenghtValidation implements FieldValidation{
    constructor (readonly field: string, private readonly minLenght: number) {}

    validate(input: object) : Error{
        return input[this.field]?.length < this.minLenght ? new InvalidFieldError() : null;
    }
}
