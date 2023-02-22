import { Footer, Header } from '@/presentation/components'
import React, { useEffect, useState } from 'react'
import { SurveyItemEmpty } from '@/presentation/pages/survey-list/components'
import Styles from './survey-list-styles.scss'
import { LoadSurveyList } from '@/domain/useCases'
import { SurveyModel } from '@/domain/models'
import SurveyItem from './components/survey-list-item/survey-list-item'

type Props = {
    loadSurveyList: LoadSurveyList;
}

export default function SurveyList({ loadSurveyList }: Props) {
    const [state, setState] = useState({
        surveys: [] as SurveyModel[],
    })

    useEffect(() => {
        loadSurveyList.loadAll()
            .then(surveys => setState({ surveys }))
    }, [])
    
    return (
        <div className={Styles.surveyListWrap}>
            <Header />
            <div className={Styles.contentWrap}>
                <h2>Enquetes</h2>
                <ul data-testid="survey-list">
                    {state.surveys.length 
                    ? state.surveys.map((survey) => <SurveyItem key={survey.id} survey={survey} />)
                    : <SurveyItemEmpty /> }
                </ul>
            </div>
            <Footer />
        </div>
    )
}
