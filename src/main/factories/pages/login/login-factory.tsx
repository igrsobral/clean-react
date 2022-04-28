import React from 'react'
import { Login } from '@/presentation/pages'
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { AxiosHttpClient } from '@/infra/https/axios-http-client/axios-http-client';
import { ValidationComposite } from '@/validation/validators/validation-composite/validation-composite';

export const makeLogin: React.FC = () => {
    const url = 'https://fordevs.herokuapp.com/api/login'
    const axiosHttpClient = new AxiosHttpClient();
    const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)
    const validationComposite = ValidationComposite;

    return (
        <Login validation={undefined} authentication={undefined} />
    )
}