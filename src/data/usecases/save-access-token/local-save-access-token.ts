import { SaveAccessToken } from "@/domain/useCases/save-access-token";
import { SetStorage } from "@/data/protocols/cache/set-storage";
import { UnexpectedError } from "@/domain/errors";

export class LocalStorageAccessToken implements SaveAccessToken {
    constructor(private readonly setStorage: SetStorage) { }

    async save(accessToken: string): Promise<void> {
        if (!accessToken) {
            throw new UnexpectedError();
        }
        await this.setStorage.set('accessToken', accessToken)
    }
}
