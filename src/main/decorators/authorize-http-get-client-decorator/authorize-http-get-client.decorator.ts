import { GetStorage } from "@/data/protocols/cache";
import { HttpGetClient, HttpGetParams, HttpResponse } from "@/data/protocols/http";

export class AuthorizeHttpGetClientDecorator implements HttpGetClient{
   constructor (
      private readonly getStorage: GetStorage,
      private readonly httpGetClient: HttpGetClient
   ){}

   async get (params: HttpGetParams): Promise<HttpResponse> {
    const account = this.getStorage.get('account')
    let newHeaders = params
    if(account?.accessToken) {
      newHeaders = {
        ...params,
        headers: {
          ...params.headers || {},
          'x-access-token': account.accessToken
        }
      }
    }

    const httpResponse = await this.httpGetClient.get(newHeaders)
    return  httpResponse
   }
}