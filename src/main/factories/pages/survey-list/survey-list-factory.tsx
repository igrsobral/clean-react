import React from 'react'
import { makeRemoveLoadSurveyList } from '@/main/factories/usecases'
import {  SurveyList } from '@/presentation/pages'


export const makeSurveyList = () => {

    return (  
        <SurveyList
            loadSurveyList={makeRemoveLoadSurveyList()}
        />
    )
}