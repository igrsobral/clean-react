import React from 'react'
import { SurveyList } from "@/presentation/pages";
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from "react-router-dom";


const makeSut = (): void => {
    render(
        <BrowserRouter>
            <SurveyList /> 
         </BrowserRouter>
    )
}

describe('SurveyList Component', () => {
    test('Should present 4 empty items on start', () => {
        makeSut()
        const surveyList = screen.getByTestId('survey-list')
        expect(surveyList.querySelectorAll('li:empty').length).toBe(4)
    })
})