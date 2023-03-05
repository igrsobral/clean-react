import { LoadSurveyList } from "@/domain/useCases";
import { makeAxiosHttpClient } from "@/main/factories/http/axios-main-client-factory";
import { makeApiUrl } from "@/main/factories/http/api-url-factory";
import { RemoteLoadSurveyList } from "@/data/usecases/load-survey-list/remote-load-survey-list";

export const makeRemoveLoadSurveyList = () : LoadSurveyList => {
    return new RemoteLoadSurveyList(makeApiUrl('/surveys'), makeAxiosHttpClient())
}