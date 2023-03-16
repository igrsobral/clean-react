import React, { useEffect, useState } from 'react'
import { LoadSurveyList } from '@/domain/useCases'
import { SurveyContext, SurveyListItem, Error } from '@/presentation/pages/survey-list/components'
import { Footer, Header } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hook'
import Styles from './survey-list-styles.scss'

type Props = {
    loadSurveyList: LoadSurveyList;
}

export default function SurveyList({ loadSurveyList }: Props) {
    const handleError = useErrorHandler((error: Error) => {
        setState({ ...state, error: error.message })
    })
    const [state, setState] = useState({
        surveys: [] as LoadSurveyList.Model[],
        error: '',
        reload: false
    })

    useEffect(() => {
        loadSurveyList.loadAll()
            .then(surveys => setState({ ...state, surveys }))
            .catch((error) => {
                console.log(error)
                handleError(error)
            })
    }, [state.reload])

    return (
        <div className={Styles.surveyListWrap}>
            <Header />
            <div className={Styles.contentWrap}>
                <h2>Enquetes</h2>
                <SurveyContext.Provider value={{ state, setState }}>
                    {state.error
                        ? <Error />
                        : <SurveyListItem />
                    }
                </SurveyContext.Provider>
            </div>
            <Footer />
        </div>
    )
}
