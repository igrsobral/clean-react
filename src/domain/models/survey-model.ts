export type SurveyModel = {
    id: any;
    question: string;
    answers: SurveyAnswerModel[];
    date: Date;
    didAnswer: boolean;
}

export type SurveyAnswerModel = {
    image?: string;
    answer: string;
}