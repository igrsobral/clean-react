import React from 'react'
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import SignUp from "./signup";
import faker from 'faker';
import { createMemoryHistory } from 'history';
import { Helper, ValidationStub, AddAccountSpy } from '@/presentation/tests';
import { EmailInUseError } from '@/domain/errors';
import { Router } from 'react-router-dom';
import { ApiContext } from '@/presentation/contexts';
import { AccountModel } from '@/domain/models';

type SutTypes = {
    sut: RenderResult;
    addAccountSpy: AddAccountSpy;
    setCurrentAccountMock: (account: AccountModel) => void;
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
    const sut = render(
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
        sut,
        addAccountSpy,
        setCurrentAccountMock
    }
}

const simulateValidSubmit = async (sut: RenderResult, name = faker.name.findName(), email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
    Helper.populateField(sut, 'name', name);
    Helper.populateField(sut, 'email', email);
    Helper.populateField(sut, 'password', password);
    Helper.populateField(sut, 'passwordConfirmation', password);
    const form = sut.getByTestId('form');
    fireEvent.submit(form);
    await waitFor(() => form)
}

describe('SignUp component', () => {
    afterEach(cleanup);

    test('Should start with initial state', () => {
        const validationError = faker.random.words();
        const { sut } = makeSut({ validationError });
        Helper.testChildCount(sut, 'error-wrap', 0);
        Helper.testButtonIsDisabled(sut, 'submit', true);
        Helper.testStatusForField(sut, 'name', validationError);
        Helper.testStatusForField(sut, 'email', validationError);
        Helper.testStatusForField(sut, 'password', validationError);
        Helper.testStatusForField(sut, 'passwordConfirmation', validationError);
    });

    test('Should show name error if Validation fails', () => {
        const validationError = faker.random.words();
        const { sut } = makeSut({ validationError });
        Helper.populateField(sut, 'name');
        Helper.testStatusForField(sut, 'name', validationError);
    });

    test('Should show email error if Validation fails', () => {
        const validationError = faker.random.words();
        const { sut } = makeSut({ validationError });
        Helper.populateField(sut, 'email');
        Helper.testStatusForField(sut, 'email', validationError);
    });

    test('Should show password error if Validation fails', () => {
        const validationError = faker.random.words();
        const { sut } = makeSut({ validationError });
        Helper.populateField(sut, 'password');
        Helper.testStatusForField(sut, 'password', validationError);
    });

    test('Should show passwordConfirmation error if Validation fails', () => {
        const validationError = faker.random.words();
        const { sut } = makeSut({ validationError });
        Helper.populateField(sut, 'passwordConfirmation');
        Helper.testStatusForField(sut, 'passwordConfirmation', validationError);
    });

    test('Should show valid name if Validation succeeds', () => {
        const { sut } = makeSut();
        Helper.populateField(sut, 'name');
        Helper.testStatusForField(sut, 'name');
    });

    test('Should show valid email if Validation succeeds', () => {
        const { sut } = makeSut();
        Helper.populateField(sut, 'email');
        Helper.testStatusForField(sut, 'email');
    });

    test('Should show valid password if Validation succeeds', () => {
        const { sut } = makeSut();
        Helper.populateField(sut, 'password');
        Helper.testStatusForField(sut, 'password');
    });

    test('Should show valid passwordConfirmation if Validation succeeds', () => {
        const { sut } = makeSut();
        Helper.populateField(sut, 'passwordConfirmation');
        Helper.testStatusForField(sut, 'passwordConfirmation');
    });

    test('Should enable submit button if form is valid', () => {
        const { sut } = makeSut();
        Helper.populateField(sut, 'name');
        Helper.populateField(sut, 'email');
        Helper.populateField(sut, 'password');
        Helper.populateField(sut, 'passwordConfirmation');
        Helper.testButtonIsDisabled(sut, 'submit', false);
    });

    test('Should show spinner on submit', async () => {
        const { sut } = makeSut();
        await simulateValidSubmit(sut);
        Helper.testElementsExists(sut, 'spinner');
    });

    test('Should call AddAccount with correct values', async () => {
        const { sut, addAccountSpy } = makeSut();
        const name = faker.name.findName();
        const email = faker.internet.password();
        const password = faker.internet.password();
        await simulateValidSubmit(sut, name, email, password);
        expect(addAccountSpy.params).toEqual({
            name,
            email,
            password,
            passwordConfirmation: password
        });
    });

    test('Should call AddAccount only once', async () => {
        const { sut, addAccountSpy } = makeSut();
        await simulateValidSubmit(sut);
        await simulateValidSubmit(sut);
        expect(addAccountSpy.callsCount).toBe(1);
    });

    test('Should not call AddAccount if form is invalid', async () => {
        const validationError = faker.random.words();
        const { sut, addAccountSpy } = makeSut({ validationError });
        await simulateValidSubmit(sut);
        expect(addAccountSpy.callsCount).toBe(0);
    });

    test('Should present error if Authentication fails', async () => {
        const { sut, addAccountSpy } = makeSut();
        const error = new EmailInUseError();
        jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error);
        await simulateValidSubmit(sut);
        Helper.testElementText(sut, 'main-error', error.message)
        Helper.testChildCount(sut, 'error-wrap', 1);
    });

    test('Should call UpdateCurrentAccount on success', async () => {
        const { sut, addAccountSpy, setCurrentAccountMock } = makeSut();
        await simulateValidSubmit(sut);
        expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account);
        expect(history.length).toBe(1);
        expect(history.location.pathname).toBe('/')
    })

    test('Should go to signup page', async () => {
        const { sut } = makeSut();
        const register = sut.getByTestId('signup-link');
        fireEvent.click(register);
        expect(history.length).toBe(2);
        expect(history.location.pathname).toBe('/signup')
    })
});
