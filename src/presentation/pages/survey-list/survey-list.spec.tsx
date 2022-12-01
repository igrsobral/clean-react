import { LoadSurveyList } from '@/domain/useCases';
import { SurveyList } from "@/presentation/pages";
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from "react-router-dom";
import { SurveyModel } from '@/domain/models';
import React from 'react'

class LoadSurveyListSpy implements LoadSurveyList{
    callsCount = 0
    async loadAll (): Promise<SurveyModel[]>{
        this.callsCount++
        return [];
    }
}

type SutTypes = {
    loadSurveyListSpy: LoadSurveyListSpy;
}

const makeSut = (): SutTypes => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    render(
        <BrowserRouter>
           <SurveyList loadSurveyList={loadSurveyListSpy}/> 
         </BrowserRouter>
    )
    return { 
        loadSurveyListSpy
    }
}

describe('SurveyList Component', () => {
    test('Should present 4 empty items on start', () => {
        makeSut()
        const surveyList = screen.getByTestId('survey-list')
        expect(surveyList.querySelectorAll('li:empty').length).toBe(4)
    })
   
    test('Should call LoadSurveyList', () => {
        const { loadSurveyListSpy } = makeSut()
        expect(loadSurveyListSpy.callsCount).toBe(1)
    })
})