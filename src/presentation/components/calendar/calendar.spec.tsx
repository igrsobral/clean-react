import { render, screen } from "@testing-library/react"
import React from 'react'
import Calendar from "./calendar"

const makeSut = (date: Date): void => {
    render(<Calendar date={date} />)
}

describe('SurveyList component', () => {
    test('Should render with correct values', () => {
        makeSut(new Date('2020-01-10T00:00:00'))
        expect(screen.getByTestId('day')).toHaveTextContent('10')
        expect(screen.getByTestId('month')).toHaveTextContent('jan')
        expect(screen.getByTestId('year')).toHaveTextContent('2020')
    })

    test('Should render with correct values', () => {
        makeSut(new Date('2020-01-10T00:00:00'))
        expect(screen.getByTestId('day')).toHaveTextContent('10')
        expect(screen.getByTestId('month')).toHaveTextContent('jan')
        expect(screen.getByTestId('year')).toHaveTextContent('2020')
    })
})