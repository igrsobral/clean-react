import { FieldValidation } from "@/validation/protocols/field-validation";
import { InvalidFieldError } from "../email/invalid-field-error";

export class MinLenghtValidation implements FieldValidation{
    constructor(readonly field: string, private readonly minLenght: number) {}

    validate(value: string) : Error{
        return value.length >= this.minLenght ? null : new InvalidFieldError();
    }
}
