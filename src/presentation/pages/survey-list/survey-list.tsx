import React, { useContext, useEffect, useState } from 'react'
import { LoadSurveyList } from '@/domain/useCases'
import { AccessDeniedError } from '@/domain/errors'
import { SurveyContext, SurveyListItem, Error } from '@/presentation/pages/survey-list/components'
import { Footer, Header } from '@/presentation/components'
import Styles from './survey-list-styles.scss'
import { ApiContext } from '@/presentation/contexts'
import { useHistory } from 'react-router-dom'

type Props = {
    loadSurveyList: LoadSurveyList;
}

export default function SurveyList({ loadSurveyList }: Props) {
    const history = useHistory()
    const { setCurrentAccount } = useContext(ApiContext)
    const [state, setState] = useState({
        surveys: [] as LoadSurveyList.Model[],
        error: '',
        reload: false
    })

    useEffect(() => {
        loadSurveyList.loadAll()
            .then(surveys => setState({ ...state, surveys }))
            .catch(({ message: error }) => {
                if (error instanceof AccessDeniedError) {
                    setCurrentAccount(undefined)
                    history.replace('/login')
                } else {
                    setState({ ...state, error })
                }
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
