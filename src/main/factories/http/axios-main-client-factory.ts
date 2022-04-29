import { AxiosHttpClient } from "@/infra/https/axios-http-client/axios-http-client"

export const makeAxiosHttpClient = (): AxiosHttpClient => {
    return new AxiosHttpClient();
}