import { LoadSurveyList } from '@/domain/useCases';
import { SurveyList } from "@/presentation/pages";
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Router } from "react-router-dom";
import React from 'react'
import { mockAccountModel, mockSurveyListModel } from '@/domain/test';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';
import { createMemoryHistory, MemoryHistory } from 'history'
import ApiContext from '@/presentation/contexts/api/api-context';

class LoadSurveyListSpy implements LoadSurveyList {
    callsCount = 0
    surveys = mockSurveyListModel();

    async loadAll(): Promise<LoadSurveyList.Model[]> {
        this.callsCount++
        return this.surveys;
    }
}

type SutTypes = {
    loadSurveyListSpy: LoadSurveyListSpy
    history: MemoryHistory
    setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    const setCurrentAccountMock = jest.fn()
    render(
        <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
            <Router history={history}>
                <SurveyList loadSurveyList={loadSurveyListSpy} />
            </Router>
        </ApiContext.Provider>
    )
    return {
        loadSurveyListSpy,
        history,
        setCurrentAccountMock
    }
}

describe('SurveyList Component', () => {
    test('Should present 4 empty items on start', async () => {
        makeSut()
        const surveyList = screen.getByTestId('survey-list')
        expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
        expect(screen.queryByTestId('error')).not.toBeInTheDocument()
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

    test('Should render error on UnexpectedError', async () => {
        const loadSurveyListSpy = new LoadSurveyListSpy()
        const error = new UnexpectedError()
        jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)
        makeSut(loadSurveyListSpy)
        await waitFor(() => screen.getByRole('heading'))
        expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
        expect(screen.queryByTestId('error')).toHaveTextContent(error.message)
    })

    test('Should logout on AccessDeniedError', async () => {
        const loadSurveyListSpy = new LoadSurveyListSpy()
        jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new AccessDeniedError())
        const { setCurrentAccountMock, history } = makeSut(loadSurveyListSpy)
        await waitFor(() => screen.getByRole('heading'))
        expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
        expect(history.location.pathname).toBe('/login')
    })

    test('Should call LoadSurveyList on reload', async () => {
        const loadSurveyListSpy = new LoadSurveyListSpy()
        jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError())
        makeSut(loadSurveyListSpy)
        await waitFor(() => screen.getByRole('heading'))
        fireEvent.click(screen.getByTestId('reload'))
        expect(loadSurveyListSpy.callsCount).toBe(1)
        await waitFor(() => screen.getByRole('heading'))
    })
})