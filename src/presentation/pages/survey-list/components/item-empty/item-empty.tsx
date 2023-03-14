import React from 'react'
import Styles from './item-empty-styles.scss'

export const SurveyItemEmpty = () => {
    return (
        <>
            <li className={Styles.surveyItemEmpty} data-testid="empty"></li>
            <li className={Styles.surveyItemEmpty} data-testid="empty"></li>
            <li className={Styles.surveyItemEmpty} data-testid="empty"></li>
            <li className={Styles.surveyItemEmpty} data-testid="empty"></li>
        </>
    )
}

export default SurveyItemEmpty;