import { HttpGetClient, HttpStatusCode } from "@/data/protocols/http";
import { AccessDeniedError, UnexpectedError } from "@/domain/errors";
import { LoadSurveyList } from "@/domain/useCases";

export class RemoteLoadSurveyList implements LoadSurveyList {
    constructor(
        private readonly url: string,
        private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyList.Model[]>
    ) { }

    async loadAll(): Promise<LoadSurveyList.Model[]> {
        const httpResponse = await this.httpGetClient.get({ url: this.url })
        const remoteSurveys = httpResponse.body || []
        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok: return remoteSurveys.map(remoteSurvey => Object.assign(remoteSurvey, {
                date: new Date(remoteSurvey.date)
            }))
            case HttpStatusCode.noContent: return []
            case HttpStatusCode.forbidden: throw new AccessDeniedError()
            default: throw new UnexpectedError();
        }
    }
}

export namespace RemoteLoadSurveyList {
    export type Model = {
        id: string;
        question: string;
        date: string;
        didAnswer: boolean
    }
}