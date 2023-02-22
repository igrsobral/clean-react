import SurveyItem from "@/presentation/pages/survey-list/components/survey-list-item/survey-list-item";
import { render, screen } from '@testing-library/react';
import React from 'react'
import { mockSurveyModel } from "@/domain/test";
import { IconName } from '@/presentation/components';
import { SurveyModel } from "@/domain/models";

const makeSut = (survey: SurveyModel): void => {
  render(<SurveyItem survey={survey} />)
}

describe('SurveyList component', () => {
  test('Should render with correct values', () => {
    const survey = {
      ...mockSurveyModel(),
      didAnswer: true,
      date: new Date('2020-01-10T00:00:00'),
    }
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUP)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
  })
})