import { SurveyModel } from '@/domain/models'

export interface LoadSuveys {
  loadAll(): Promise<SurveyModel>
} 