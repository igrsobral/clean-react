
import * as faker from 'faker'
import { LoadSurveyList } from '../useCases'

export const mockSurveyModel = (): LoadSurveyList.Model => ({
    id: faker.datatype.uuid(),
    question: faker.random.words(10),
    didAnswer: faker.datatype.boolean(),
    date: faker.date.recent()
})

export const mockSurveyListModel = (): LoadSurveyList.Model[] => ([
    mockSurveyModel(),
    mockSurveyModel(),
    mockSurveyModel(),
    mockSurveyModel(),
])