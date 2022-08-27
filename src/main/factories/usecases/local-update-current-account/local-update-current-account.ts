import { UpdateCurrentAccount } from "@/domain/useCases";
import { LocalUpdateCurrentAccount } from "@/data/usecases/update-current-account/local-update-current-account";
import { makeLocalStorageAdapter } from "../../cache/local-storage-adapter-factory";

export const makeLocalUpdateCurrentAccount = (): UpdateCurrentAccount => {
    return new LocalUpdateCurrentAccount(makeLocalStorageAdapter());
}