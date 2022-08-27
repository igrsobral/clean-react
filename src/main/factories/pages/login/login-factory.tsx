import React from 'react'
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory';
import { makeLoginValidation } from './login-validation-factory';
import { makeLocalUpdateCurrentAccount } from '@/main/factories/usecases/local-update-current-account/local-update-current-account';
import { Login } from '@/presentation/pages'

export const makeLogin: React.FC = () => {
    return (
        <Login
            authentication={makeRemoteAuthentication()}
            validation={makeLoginValidation()}
            updateCurrentAccount={makeLocalUpdateCurrentAccount()}
        />
    )
}