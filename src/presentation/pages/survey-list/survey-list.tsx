import React, { useEffect, useState } from 'react'
import { SurveyContext, SurveyListItem, Error } from '@/presentation/pages/survey-list/components'
import { LoadSurveyList } from '@/domain/useCases'
import { Footer, Header } from '@/presentation/components'
import { SurveyModel } from '@/domain/models'
import Styles from './survey-list-styles.scss'

type Props = {
    loadSurveyList: LoadSurveyList;
}

export default function SurveyList({ loadSurveyList }: Props) {
    const [state, setState] = useState({
        surveys: [] as SurveyModel[],
        error: '',
        reload: false
    })

    useEffect(() => {
        loadSurveyList.loadAll()
            .then(surveys => setState({ ...state, surveys }))
            .catch(error => setState({ ...state, error: error.message }))
    }, [state.reload])
    
    return (
        <div className={Styles.surveyListWrap}>
            <Header />
            <div className={Styles.contentWrap}>
                <h2>Enquetes</h2>
                <SurveyContext.Provider value={{ state, setState }}>
                 {state.error 
                    ?   <Error />
                    :   <SurveyListItem />
                  }
                </SurveyContext.Provider>
            </div>
            <Footer />
        </div>
    )
}
