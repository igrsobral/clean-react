import Styles from './item-styles.scss'

import { Link } from 'react-router-dom'
import React from 'react'


const SurveyItem = () => {
    return (
        <li className={Styles.surveyItemWrap}>
            <div className={Styles.surveyContent}>
                {/* <Icon className={Styles.survey} iconName={IconName.thumbDown} /> */}
                <time>
                    <span className={Styles.day}>22</span>
                    <span className={Styles.month}>03</span>
                    <span className={Styles.year}>2020</span>
                </time>
                <p data-testid="question">Qual framework web do momento?</p>
            </div>
            <footer><Link data-testid="link" to={'/'} >Ver Resultado</Link></footer>
        </li>
    )
}

export default SurveyItem