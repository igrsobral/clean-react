import React, { useEffect, useState } from 'react'
import { LoadSurveyList } from '@/domain/useCases'
import { SurveyContext, SurveyListItem } from '@/presentation/pages/survey-list/components'
import { Footer, Header, Error } from '@/presentation/components'
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

    const reload = (): void => {
        setState(old => ({ surveys: [], error: '', reload: !old.reload }))
    }

    useEffect(() => {
        loadSurveyList.loadAll()
            .then(surveys => setState(old => ({ ...old, surveys })))
            .catch(handleError)
    }, [state.reload])

    return (
        <div className={Styles.surveyListWrap}>
            <Header />
            <div className={Styles.contentWrap}>
                <h2>Enquetes</h2>
                <SurveyContext.Provider value={{ state, setState }}>
                    {state.error
                        ? <Error error={state.error} reload={reload} />
                        : <SurveyListItem />
                    }
                </SurveyContext.Provider>
            </div>
            <Footer />
        </div>
    )
}
