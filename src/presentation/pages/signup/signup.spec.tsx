import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SignUp from "./signup";
import faker from 'faker';
import { createMemoryHistory } from 'history';
import { Helper, ValidationStub } from '@/presentation/tests';
import { EmailInUseError } from '@/domain/errors';
import { Router } from 'react-router-dom';
import { ApiContext } from '@/presentation/contexts';
import { AddAccount } from '@/domain/useCases';
import { AddAccountSpy } from '@/domain/test';

type SutTypes = {
    addAccountSpy: AddAccountSpy;
    setCurrentAccountMock: (account: AddAccount.Model) => void;
}

type SutParams = {
    validationError: string;
}

const history = createMemoryHistory({ initialEntries: ['/login'] });
const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub();
    const addAccountSpy = new AddAccountSpy();
    validationStub.errorMessage = params?.validationError;
    const setCurrentAccountMock = jest.fn();
    render(
        <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
            <Router history={history}>
                <SignUp
                    validation={validationStub}
                    addAccount={addAccountSpy}
                />
            </Router>
        </ApiContext.Provider>
    );

    return {
        addAccountSpy,
        setCurrentAccountMock
    }
}

const simulateValidSubmit = async (name = faker.name.findName(), email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
    Helper.populateField('name', name);
    Helper.populateField('email', email);
    Helper.populateField('password', password);
    Helper.populateField('passwordConfirmation', password);
    const form = screen.queryByTestId('form');
    fireEvent.submit(form);
    await waitFor(() => form)
}

describe('SignUp component', () => {
    test('Should start with initial state', () => {
        const validationError = faker.random.words();
        makeSut({ validationError });
        expect(screen.getByTestId('error-wrap').children).toHaveLength(0)

        expect(screen.getByTestId('submit')).toBeDisabled();
        Helper.testStatusForField('name', validationError);
        Helper.testStatusForField('email', validationError);
        Helper.testStatusForField('password', validationError);
        Helper.testStatusForField('passwordConfirmation', validationError);
    });

    test('Should show name error if Validation fails', () => {
        const validationError = faker.random.words();
        makeSut({ validationError });
        Helper.populateField('name');
        Helper.testStatusForField('name', validationError);
    });

    test('Should show email error if Validation fails', () => {
        const validationError = faker.random.words();
        makeSut({ validationError });
        Helper.populateField('email');
        Helper.testStatusForField('email', validationError);
    });

    test('Should show password error if Validation fails', () => {
        const validationError = faker.random.words();
        makeSut({ validationError });
        Helper.populateField('password');
        Helper.testStatusForField('password', validationError);
    });

    test('Should show passwordConfirmation error if Validation fails', () => {
        const validationError = faker.random.words();
        makeSut({ validationError });
        Helper.populateField('passwordConfirmation');
        Helper.testStatusForField('passwordConfirmation', validationError);
    });

    test('Should show valid name if Validation succeeds', () => {
        makeSut();
        Helper.populateField('name');
        Helper.testStatusForField('name');
    });

    test('Should show valid email if Validation succeeds', () => {
        makeSut();
        Helper.populateField('email');
        Helper.testStatusForField('email');
    });

    test('Should show valid password if Validation succeeds', () => {
        makeSut();
        Helper.populateField('password');
        Helper.testStatusForField('password');
    });

    test('Should show valid passwordConfirmation if Validation succeeds', () => {
        makeSut();
        Helper.populateField('passwordConfirmation');
        Helper.testStatusForField('passwordConfirmation');
    });

    test('Should enable submit button if form is valid', () => {
        makeSut();
        Helper.populateField('name');
        Helper.populateField('email');
        Helper.populateField('password');
        Helper.populateField('passwordConfirmation');
        expect(screen.getByTestId('submit')).toBeEnabled();
    });

    test('Should show spinner on submit', async () => {
        makeSut();
        await simulateValidSubmit();
        expect(screen.queryByTestId('spinner')).toBeInTheDocument();
    });

    test('Should call AddAccount with correct values', async () => {
        const { addAccountSpy } = makeSut();
        const name = faker.name.findName();
        const email = faker.internet.password();
        const password = faker.internet.password();
        await simulateValidSubmit(name, email, password);
        expect(addAccountSpy.params).toEqual({
            name,
            email,
            password,
            passwordConfirmation: password
        });
    });

    test('Should call AddAccount only once', async () => {
        const { addAccountSpy } = makeSut();
        await simulateValidSubmit();
        await simulateValidSubmit();
        expect(addAccountSpy.callsCount).toBe(1);
    });

    test('Should not call AddAccount if form is invalid', async () => {
        const validationError = faker.random.words();
        const { addAccountSpy } = makeSut({ validationError });
        await simulateValidSubmit();
        expect(addAccountSpy.callsCount).toBe(0);
    });

    test('Should present error if Authentication fails', async () => {
        const { addAccountSpy } = makeSut();
        const error = new EmailInUseError();
        jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error);
        await simulateValidSubmit();
        expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
        expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
    });

    test('Should call UpdateCurrentAccount on success', async () => {
        const { addAccountSpy, setCurrentAccountMock } = makeSut();
        await simulateValidSubmit();
        expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account);
        expect(history.length).toBe(1);
        expect(history.location.pathname).toBe('/')
    })

    test('Should go to signup page', async () => {
        makeSut();
        const register = screen.queryByTestId('signup-link');
        fireEvent.click(register);
        expect(history.length).toBe(2);
        expect(history.location.pathname).toBe('/signup')
    })
});
