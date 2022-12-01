import { Validation } from '@/presentation/protocols/validation'
import { deepStrictEqual } from 'assert';

export class ValidationStub implements Validation {
    errorMessage: string;

    validate(fieldName: string, input: object): string {
        return this.errorMessage;
    }
}
