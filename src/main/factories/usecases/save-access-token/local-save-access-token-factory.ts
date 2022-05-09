import { SaveAccessToken } from "@/domain/useCases";
import { LocalStorageAccessToken } from "@/data/usecases/save-access-token/local-save-access-token";
import { makeLocalStorageAdapter } from "../../cache/local-storage-adapter-factory";

export const makeLocalSaveAccessToken = () : SaveAccessToken => {
    return new LocalStorageAccessToken(makeLocalStorageAdapter());
}