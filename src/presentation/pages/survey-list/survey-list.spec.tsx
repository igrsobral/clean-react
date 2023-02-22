import { LoadSurveyList } from '@/domain/useCases';
import { SurveyList } from "@/presentation/pages";
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from "react-router-dom";
import { SurveyModel } from '@/domain/models';
import React from 'react'
import { mockSurveyListModel } from '@/domain/test';

class LoadSurveyListSpy implements LoadSurveyList{
    callsCount = 0
    surveys =  mockSurveyListModel();

    async loadAll (): Promise<SurveyModel[]>{
        this.callsCount++
        return this.surveys;
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
    test('Should present 4 empty items on start', async () => {
        makeSut()
        const surveyList = screen.getByTestId('survey-list')
        expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
        await waitFor(() => surveyList)
    })
   
    test('Should call LoadSurveyList', async () => {
        const { loadSurveyListSpy } = makeSut()
        expect(loadSurveyListSpy.callsCount).toBe(1)
        await waitFor(() => screen.getByRole('heading'))
    })
    
    test('Should render SurveyItem on success', async () => {
        makeSut()
        const surveyList = screen.getByTestId('survey-list')
        await waitFor(() => surveyList)
        expect(surveyList.querySelectorAll('li')).toHaveLength(4)
    })
})