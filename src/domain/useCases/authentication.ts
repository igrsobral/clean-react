import { AccountModel} from '../models/accout-models'

type AuthenticationParams = {
  email: string
  password: string
}

export interface Authentication {
    auth (params: AuthenticationParams): Promise<AccountModel>{}
}