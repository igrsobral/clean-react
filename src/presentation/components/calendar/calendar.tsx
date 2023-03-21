import React from 'react'
import Styles from './calendar-styles.scss'

interface CalendarProps {
    date: Date
    className?: string
}

const Calendar = ({ date, className }: CalendarProps) => {
    return (
        <time className={[Styles.calendarWrap, className].join(' ')}>
            <span data-testid="day" className={Styles.day}>
                {date.getDate().toString().padStart(2, '0')}
            </span>
            <span data-testid="month" className={Styles.month}>
                {date.toLocaleDateString('pt-BR', {
                    month: 'short'
                }).replace('.', '')}
            </span>
            <span data-testid="year" className={Styles.year}>
                {date.getFullYear()}
            </span>
        </time>
    )
}

export default Calendar