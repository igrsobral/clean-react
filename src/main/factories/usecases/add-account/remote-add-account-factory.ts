import { AddAccount } from "@/domain/useCases";
import { makeAxiosHttpClient } from "@/main/factories/http/axios-main-client-factory";
import { makeApiUrl } from "@/main/factories/http/api-url-factory";
import {  RemoteAddAccount } from "@/data/usecases/add-account/remote-add-account";

export const makeRemoteAddAccount = () : AddAccount => {
    return new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient());
}