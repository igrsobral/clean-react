import { Footer, Header } from '@/presentation/components'
import React from 'react'
import { SurveyItemEmpty } from '@/presentation/pages/survey-list/components'
// import SurveyItem from './components/survey-list-item'
import Styles from './survey-list-styles.scss'

export default function SurveyList() {
    return (
        <div className={Styles.surveyListWrap}>
            <Header />
            <div className={Styles.contentWrap}>
                <h2>Enquetes</h2>
                <ul data-testid="survey-list">
                    {/* <SurveyItem /> */}
                    <SurveyItemEmpty />
                </ul>
            </div>
            <Footer />
        </div>
    )
}
