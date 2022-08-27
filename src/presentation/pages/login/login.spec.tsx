import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import 'jest-localstorage-mock';
import { Login } from '@/presentation/pages';
import { ValidationStub, AuthenticationSpy, UpdateCurrentAccountMock, Helper } from '@/presentation/tests';
import faker from 'faker';
import { InvalidCredentialsError } from '@/domain/errors';

type SutTypes = {
    sut: RenderResult;
    authenticationSpy: AuthenticationSpy;
    updateCurrentAccount: UpdateCurrentAccountMock;
}

type SutParams = {
    validationError: string;
}

const history = createMemoryHistory({ initialEntries: ['/login'] });
const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub();
    validationStub.errorMessage = params?.validationError;
    const authenticationSpy = new AuthenticationSpy();
    const updateCurrentAccount = new UpdateCurrentAccountMock();
    const sut = render(
        <Router history={history} >
            <Login
                validation={validationStub}
                authentication={authenticationSpy}
                updateCurrentAccount={updateCurrentAccount}
            />
        </Router>
    );
    return {
        sut,
        authenticationSpy,
        updateCurrentAccount
    }
}

const simulateValidSubmit = async (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
    Helper.populateField(sut, 'email', email);
    Helper.populateField(sut, 'password', password);
    const form = sut.getByTestId('form');
    fireEvent.submit(form);
    await waitFor(() => form)
}

const testElementText = (sut: RenderResult, fieldName: string, text: string): void => {
    const el = sut.getByTestId(fieldName);
    expect(el.textContent).toBe(text)
}

describe('Login component', () => {
    afterEach(cleanup);

    // beforeEach(() => {
    //     localStorage.clear();
    // });

    test('Should start with initial state', () => {
        const validationError = faker.random.words();
        const { sut } = makeSut({ validationError });
        Helper.testChildCount(sut, 'error-wrap', 0);
        Helper.testButtonIsDisabled(sut, 'submit', true);
        Helper.testStatusForField(sut, 'email', validationError);
        Helper.testStatusForField(sut, 'password', validationError);
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

    test('Should show valid email state if Validation succeeds', () => {
        const { sut } = makeSut();
        Helper.populateField(sut, 'email');
        Helper.testStatusForField(sut, 'email');
    });

    test('Should show valid password state if Validation succeeds', () => {
        const { sut } = makeSut();
        Helper.populateField(sut, 'email');
        Helper.testStatusForField(sut, 'email');
    });

    test('Should enable submit button if form is valid', () => {
        const { sut } = makeSut();
        Helper.populateField(sut, 'email');
        Helper.populateField(sut, 'password');
        Helper.testButtonIsDisabled(sut, 'submit', false);
    });

    test('Should show spinner on submit', async () => {
        const { sut } = makeSut();
        await simulateValidSubmit(sut);
        Helper.testElementsExists(sut, 'spinner');
    });


    test('Should call Authentication with correct values', async () => {
        const { sut, authenticationSpy } = makeSut();
        const email = faker.internet.password();
        const password = faker.internet.password();
        await simulateValidSubmit(sut, email, password);
        expect(authenticationSpy.params).toEqual({
            email,
            password,
        });
    });

    test('Should call Authentication only once', async () => {
        const { sut, authenticationSpy } = makeSut();
        await simulateValidSubmit(sut);
        await simulateValidSubmit(sut);
        expect(authenticationSpy.callsCount).toBe(1);
    });

    test('Should not call Authentication if form is invalid', async () => {
        const validationError = faker.random.words();
        const { sut, authenticationSpy } = makeSut({ validationError });
        await simulateValidSubmit(sut);
        expect(authenticationSpy.callsCount).toBe(0);
    });

    test('Should present error if Authentication fails', async () => {
        const { sut, authenticationSpy } = makeSut();
        const error = new InvalidCredentialsError();
        jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error));
        await simulateValidSubmit(sut);
        testElementText(sut, 'main-error', error.message)
        Helper.testChildCount(sut, 'error-wrap', 1);
    });

    test('Should call SaveAccessToken on success', async () => {
        const { sut, authenticationSpy, updateCurrentAccount } = makeSut();
        await simulateValidSubmit(sut);
        expect(updateCurrentAccount.account).toEqual(authenticationSpy.account);
        expect(history.length).toBe(1);
        expect(history.location.pathname).toBe('/')
    })

    test('Should present error if SaveAccessToken fails', async () => {
        const { sut, updateCurrentAccount } = makeSut();
        const error = new InvalidCredentialsError();
        jest.spyOn(updateCurrentAccount, 'save').mockReturnValueOnce(Promise.reject(error));
        await simulateValidSubmit(sut);
        testElementText(sut, 'main-error', error.message)
        Helper.testChildCount(sut, 'error-wrap', 1)
    })

    test('Should go to login page', async () => {
        const { sut } = makeSut();
        const loginLink = sut.getByTestId('login-link');
        fireEvent.click(loginLink);
        expect(history.length).toBe(1);
        expect(history.location.pathname).toBe('/login')
    })
});