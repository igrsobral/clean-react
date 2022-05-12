import React from 'react'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import SignUp from "./signup";
import faker from 'faker';
import { Helper, ValidationStub } from '@/presentation/tests';
import { populateField } from '@/presentation/tests/form-helper';

type SutTypes = {
    sut: RenderResult;
}

type SutParams = {
    validationError: string;
}
const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub();
    validationStub.errorMessage = params?.validationError;
    const sut = render(
        <SignUp validation={validationStub} />
    );

    return {
        sut,
    }
}

describe('SignUp component', () => {
    afterEach(cleanup);

    test('Should start with initial state', () => {
        const validationError = faker.random.words();
        const { sut } = makeSut({ validationError });
        Helper.testChildCount(sut, 'error-wrap', 0);
        Helper.testButtonIsDisabled(sut, 'submit', true);
        Helper.testStatusForField(sut, 'name', validationError);
        Helper.testStatusForField(sut, 'email', 'Campo obrigatório');
        Helper.testStatusForField(sut, 'password', 'Campo obrigatório');
        Helper.testStatusForField(sut, 'passwordConfirmation', 'Campo obrigatório');
    });

    test('Should show name error if Validation fails', () => {
        const validationError = faker.random.words();
        const { sut } = makeSut({ validationError });
        populateField(sut, 'name');
        Helper.testStatusForField(sut, 'name', validationError);
    });
});