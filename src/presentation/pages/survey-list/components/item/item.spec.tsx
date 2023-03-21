import { SurveyItem } from "@/presentation/pages/survey-list/components";
import { render, screen } from '@testing-library/react';
import React from 'react'
import { mockSurveyModel } from "@/domain/test";
import { IconName } from '@/presentation/components';
import { LoadSurveyList } from "@/domain/useCases";

const makeSut = (survey: LoadSurveyList.Model): void => {
  render(<SurveyItem survey={survey} />)
}

describe('SurveyList component', () => {
  test('Should render with correct values', () => {
    const survey = {
      ...mockSurveyModel(),
      didAnswer: true,
    }
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUP)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })

  test('Should render with correct values', () => {
    const survey = {
      ...mockSurveyModel(),
      didAnswer: false,
    }
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbDown)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })
})