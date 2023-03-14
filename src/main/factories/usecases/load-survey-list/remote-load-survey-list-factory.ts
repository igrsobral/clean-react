import { makeApiUrl } from "@/main/factories/http/api-url-factory";
import { makeAuthorizeHttpGetClientDecorator } from "@/main/factories/decorators";
import { LoadSurveyList } from "@/domain/useCases";
import { RemoteLoadSurveyList } from "@/data/usecases/load-survey-list/remote-load-survey-list";

export const makeRemoveLoadSurveyList = () : LoadSurveyList => {
    return new RemoteLoadSurveyList(makeApiUrl('/surveys'), makeAuthorizeHttpGetClientDecorator())
}