import faker from 'faker'
import { InvalidFieldError } from '../email/invalid-field-error';
import { CompareFieldsValidation } from './compare-fields-validation';

const makeSut = (field: string, fieldToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(field, fieldToCompare);

describe('CompareFieldsValidation', () => {
    test('Should return error if compare is invalid', () => {
        const field = faker.database.column();
        const fieldToCompare = faker.database.column();
        const sut = makeSut(field, fieldToCompare);
        const error = sut.validate({
            [field]: faker.random.words(3),
            [fieldToCompare]: faker.random.words(4)
        });
        expect(error).toEqual(new InvalidFieldError())
    })

    test('Should return error falsy if compare is valid', () => {
        const field = faker.database.column();
        const fieldToCompare = faker.database.column();
        const value = faker.random.word();
        const sut = makeSut(field, fieldToCompare);
        const error = sut.validate({
            [field]: value,
            [fieldToCompare]: value
        });
        expect(error).toBeFalsy();
    })
})
