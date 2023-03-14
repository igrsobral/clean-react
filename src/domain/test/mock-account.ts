import { AccountModel } from '@/domain/models';
import * as faker from 'faker'

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
  name: faker.name.findName()
})

