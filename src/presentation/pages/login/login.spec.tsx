import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Login from "./login";
import { fireEvent, waitFor, screen, render } from '@testing-library/react';
import 'jest-localstorage-mock';
import { ValidationStub, AuthenticationSpy, Helper } from '@/presentation/tests';
import faker from 'faker';
import { InvalidCredentialsError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';
import { ApiContext } from '@/presentation/contexts';

type SutTypes = {
    authenticationSpy: AuthenticationSpy;
    setCurrentAccountMock: (account: AccountModel) => void;
}

type SutParams = {
    validationError: string;
}

const history = createMemoryHistory({ initialEntries: ['/login'] });
const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub();
    validationStub.errorMessage = params?.validationError;
    const authenticationSpy = new AuthenticationSpy();
    const setCurrentAccountMock = jest.fn();
    render(
        <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
            <Router history={history} >
                <Login
                    validation={validationStub}
                    authentication={authenticationSpy}
                />
            </Router>
        </ApiContext.Provider>
    );

    return {
        authenticationSpy,
        setCurrentAccountMock
    }
}

const simulateValidSubmit = async (email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
    Helper.populateField('email', email);
    Helper.populateField('password', password);
    const form = screen.queryByTestId('form');
    fireEvent.submit(form);
    await waitFor(() => form)
}

const testElementText = (fieldName: string, text: string): void => {
    const el = screen.queryByTestId(fieldName);
    expect(el.textContent).toBe(text)
}

describe('Login component', () => {
    test('Should start with initial state', () => {
        const validationError = faker.random.words();
        makeSut({ validationError });
        Helper.testChildCount('error-wrap', 0);
        Helper.testButtonIsDisabled('submit', true);
        Helper.testStatusForField('email', validationError);
        Helper.testStatusForField('password', validationError);
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

    test('Should show valid email state if Validation succeeds', () => {
        makeSut();
        Helper.populateField('email');
        Helper.testStatusForField('email');
    });

    test('Should show valid password state if Validation succeeds', () => {
        makeSut();
        Helper.populateField('email');
        Helper.testStatusForField('email');
    });

    test('Should enable submit button if form is valid', () => {
        makeSut();
        Helper.populateField('email');
        Helper.populateField('password');
        Helper.testButtonIsDisabled('submit', false);
    });

    test('Should show spinner on submit', async () => {
        makeSut();
        await simulateValidSubmit();
        Helper.testElementsExists('spinner');
    });


    test('Should call Authentication with correct values', async () => {
        const { authenticationSpy } = makeSut();
        const email = faker.internet.password();
        const password = faker.internet.password();
        await simulateValidSubmit(email, password);
        expect(authenticationSpy.params).toEqual({
            email,
            password,
        });
    });

    test('Should call Authentication only once', async () => {
        const { authenticationSpy } = makeSut();
        await simulateValidSubmit();
        await simulateValidSubmit();
        expect(authenticationSpy.callsCount).toBe(1);
    });

    test('Should not call Authentication if form is invalid', async () => {
        const validationError = faker.random.words();
        const { authenticationSpy } = makeSut({ validationError });
        await simulateValidSubmit();
        expect(authenticationSpy.callsCount).toBe(0);
    });

    test('Should present error if Authentication fails', async () => {
        const { authenticationSpy } = makeSut();
        const error = new InvalidCredentialsError();
        jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error));
        await simulateValidSubmit();
        testElementText('main-error', error.message)
        Helper.testChildCount('error-wrap', 1);
    });

    test('Should call SaveAccessToken on success', async () => {
        const { authenticationSpy, setCurrentAccountMock } = makeSut();
        await simulateValidSubmit();
        expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account);
        expect(history.length).toBe(1);
        expect(history.location.pathname).toBe('/')
    })

    test('Should go to login page', async () => {
        makeSut();
        const loginLink = screen.queryByTestId('login-link');
        console.log(loginLink);
        fireEvent.click(loginLink);
        expect(history.length).toBe(1);
        expect(history.location.pathname).toBe('/login')
    })
});