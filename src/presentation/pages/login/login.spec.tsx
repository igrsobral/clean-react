import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import Login from './login';
import { ValidationStub } from '@/presentation/tests';
import faker from 'faker';

type SutTypes = {
    sut: RenderResult;
    validationStub: ValidationStub;
}

const makeSut = (): SutTypes => {
    const validationStub = new ValidationStub();
    validationStub.errorMessage = faker.random.words();
    const sut = render(<Login validation={validationStub} />);
    return {
        sut,
        validationStub
    }
}

describe('Login component', () => {
    test('Should start with initial state', () => {
        const { sut, validationStub } = makeSut();
        const errorWrap = sut.getByTestId('error-wrap');
        expect(errorWrap.childElementCount).toBe(0);
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
        expect(submitButton.disabled).toBe(true);
        const emailStatus = sut.getByTestId('email-status');
        expect(emailStatus.title).toBe(validationStub.errorMessage);
        expect(emailStatus.textContent).toBe('🔴');
        const passwordStatus = sut.getByTestId('password-status');
        expect(passwordStatus.title).toBe(validationStub.errorMessage);
        expect(passwordStatus.textContent).toBe('🔴');
    });


    test('Should show email error if Validation fail', () => {
        const { sut, validationStub } = makeSut();
        const emailInput = sut.getByTestId('email');
        fireEvent.input(emailInput, { target: { value: faker.internet.email() }});
        const emailStatus = sut.getByTestId('email-status');
        expect(emailStatus.title).toBe(validationStub.errorMessage);
        expect(emailStatus.textContent).toBe('🔴');
    });

    test('Should show email error if Validation fail', () => {
        const { sut, validationStub } = makeSut();
        const passwordInput = sut.getByTestId('email');
        fireEvent.input(passwordInput, { target: { value: faker.internet.email() }});
        const passwordStatus = sut.getByTestId('email-status');
        expect(passwordStatus.title).toBe(validationStub.errorMessage);
        expect(passwordStatus.textContent).toBe('🔴');
    });

    test('Should show valid email state if Validation succeeds', () => {
        const { sut, validationStub } = makeSut();
        validationStub.errorMessage = null;
        const emailInput = sut.getByTestId('password')
        fireEvent.input(emailInput, { target: { value: faker.internet.email() }});
        const emailStatus = sut.getByTestId('email-status');
        expect(emailStatus.title).toBe('Tudo certo');
        expect(emailStatus.textContent).toBe('✅');
    });

    test('Should show valid email state if Validation succeeds', () => {
        const { sut, validationStub } = makeSut();
        validationStub.errorMessage = null;
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() }});
        const passwordStatus = sut.getByTestId('email-status');
        expect(passwordStatus.title).toBe('Tudo certo');
        expect(passwordStatus.textContent).toBe('✅');
    });

    test('Should enable submit button if form is valid', () => {
        const { sut, validationStub } = makeSut();
        validationStub.errorMessage = null;
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() }});
        const passwordStatus = sut.getByTestId('email-status');
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
        expect(submitButton.disabled).toBe(false);
    });
})