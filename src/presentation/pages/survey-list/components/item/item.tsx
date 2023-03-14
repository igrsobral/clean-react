import React from 'react'
import Styles from './item-styles.scss'
import { IconName, Icon } from '@/presentation/components'
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
                <time>
                    <span data-testid="day" className={Styles.day}>
                     {survey.date.getDate().toString().padStart(2, '0')}
                    </span>
                    <span data-testid="month" className={Styles.month}>
                    {survey.date.toLocaleDateString('pt-BR', {
                        month: 'short'
                    }).replace('.', '')}
                    </span>
                    <span data-testid="year" className={Styles.year}>
                        {survey.date.getFullYear()}
                    </span>
                </time>
                <p data-testid="question">{ survey.question }?</p>
            </div>
            <footer>Ver Resultado</footer>
        </li>
    )
}

export default SurveyItem