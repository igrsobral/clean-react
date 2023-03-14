import { HttpPostClient, HttpStatusCode } from "@/data/protocols/http";
import { Authentication } from "@/domain/useCases";
import { UnexpectedError, InvalidCredentialsError } from "@/domain/errors";

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<RemoteAuthentication.Model>
  ) { }

  async auth(params: Authentication.Params): Promise<RemoteAuthentication.Model> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body;
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError();
    }
  }
}

export namespace RemoteAuthentication{
  export type Model = Authentication.Model
}
