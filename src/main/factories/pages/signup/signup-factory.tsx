import React from 'react'
import { makeLocalUpdateCurrentAccount } from '@/main/factories/usecases/local-update-current-account/local-update-current-account';
import { SignUp } from '@/presentation/pages'
import { makeSignUpValidation } from './signup-validation-factory';
import { makeRemoteAddAccount } from '../../usecases/add-account/remote-add-account-factory';

export const makeSignUp: React.FC = () => {

    return (
        <SignUp
            addAccount={makeRemoteAddAccount()}
            validation={makeSignUpValidation()}
            updateCurrentAccount={makeLocalUpdateCurrentAccount()}
        />
    )
}