import { RemoteAuthentication } from "@/data/usecases/authentication/remote-authentication";
import { Authentication } from "@/domain/useCases";
import { makeAxiosHttpClient } from "@/main/factories/http/axios-main-client-factory";
import { makeApiUrl } from "@/main/factories/http/api-url-factory";

export const makeRemoteAuthentication = () : Authentication => {
    return new RemoteAuthentication(makeApiUrl(), makeAxiosHttpClient());
}