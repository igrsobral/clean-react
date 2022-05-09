import { SaveAccessToken } from "@/domain/useCases/save-access-token";
import { SetStorage } from "@/data/protocols/cache/set-storage";

export class LocalStorageAccessToken implements SaveAccessToken {
    constructor(private readonly setStorage: SetStorage){}
    async save (accessToken: string) : Promise<void> {
        await this.setStorage.set('accessToken', accessToken)
    }
}
