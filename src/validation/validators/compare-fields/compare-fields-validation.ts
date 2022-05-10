import { FieldValidation } from "@/validation/protocols/field-validation";
import { InvalidFieldError } from "../email/invalid-field-error";

export class CompareFieldsValidation implements FieldValidation{
    constructor(readonly field: string,
    private readonly valueToCompare: string) {}
    
    validate(value: string) : Error{
       return value !== this.valueToCompare ? new InvalidFieldError() : null;
    }
}
