import React from 'react'
import Styles from './item-styles.scss'
import { IconName, Icon, Calendar } from '@/presentation/components'
import { LoadSurveyList } from '@/domain/useCases'

type Props = {
    survey: LoadSurveyList.Model;
}

const SurveyItem = ({ survey }: Props) => {
    const iconName = survey.didAnswer ? IconName.thumbUP : IconName.thumbDown
    return (
        <li className={Styles.surveyItemWrap}>
            <div className={Styles.surveyContent}>
                <Icon className={Styles.survey} iconName={iconName} />
                <Calendar date={survey.date} className={Styles.calendarWrap} />
                <p data-testid="question">{survey.question}?</p>
            </div>
            <footer>Ver Resultado</footer>
        </li>
    )
}

export default SurveyItem