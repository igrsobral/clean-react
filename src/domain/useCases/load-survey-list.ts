
export interface LoadSurveyList {
  loadAll: () => Promise<LoadSurveyList.Model[]>
} 

export namespace LoadSurveyList {
  export type Model = {
    id: any;
    question: string;
    date: Date;
    didAnswer: boolean;
  }
}

