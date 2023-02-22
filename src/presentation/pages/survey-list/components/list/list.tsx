import React, { useContext } from 'react'
import Styles from './list-styles.scss'
import { SurveyItem, SurveyItemEmpty, SurveyContext } from '@/presentation/pages/survey-list/components'

export default function List() {
  const { state } = useContext(SurveyContext)
  return (
    <ul className={Styles.listWrap} data-testid="survey-list">
        {state.surveys.length 
        ? state.surveys.map((survey) => <SurveyItem key={survey.id} survey={survey} />)
        : <SurveyItemEmpty /> }
    </ul>
  )
}
