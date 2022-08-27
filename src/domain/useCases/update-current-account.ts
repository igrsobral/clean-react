import { AccountModel } from "../models";

export interface UpdateCurrentAccount {
    save: (accessToken: AccountModel) => Promise<void>
}