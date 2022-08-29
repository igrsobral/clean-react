import { AccountModel } from "@/domain/models";

export interface GetStorage {
    get: (key: string) => any
}