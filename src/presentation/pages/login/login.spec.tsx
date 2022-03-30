import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import Login from './login';
import { ValidationStub } from '@/presentation/tests';
import faker from 'faker';

type SutTypes = {
    sut: RenderResult;
    validationSpy: ValidationStub;
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationStub();
    validationSpy.errorMessage = faker.random.words();
    const sut = render(<Login validation={validationSpy} />);
    return {
        sut,
        validationSpy
    }
}

describe('Login component', () => {
    test('Should start with initial state', () => {
        const { sut, validationSpy } = makeSut();
        const errorWrap = sut.getByTestId('error-wrap');
        expect(errorWrap.childElementCount).toBe(0);
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
        expect(submitButton.disabled).toBe(true);
        const emailStatus = sut.getByTestId('email-status');
        expect(emailStatus.title).toBe(validationSpy.errorMessage);
        expect(emailStatus.textContent).toBe('🔴');
        const passwordStatus = sut.getByTestId('password-status');
        expect(passwordStatus.title).toBe(validationSpy.errorMessage);
        expect(passwordStatus.textContent).toBe('🔴');
    });


    test('Should show email error if Validation fail', () => {
        const { sut, validationSpy } = makeSut();
        const emailInput = sut.getByTestId('email');
        fireEvent.input(emailInput, { target: { value: faker.internet.email() }});
        const emailStatus = sut.getByTestId('email-status');
        expect(emailStatus.title).toBe(validationSpy.errorMessage);
        expect(emailStatus.textContent).toBe('🔴');
    });

    test('Should show email error if Validation fail', () => {
        const { sut, validationSpy } = makeSut();
        const passwordInput = sut.getByTestId('email');
        fireEvent.input(passwordInput, { target: { value: faker.internet.email() }});
        const passwordStatus = sut.getByTestId('email-status');
        expect(passwordStatus.title).toBe(validationSpy.errorMessage);
        expect(passwordStatus.textContent).toBe('🔴');
    });
})