import { fireEvent, screen } from "@testing-library/react";
import faker from 'faker';

export const testChildCount = (fieldName: string, count: number) : void => {
    expect(screen.getByTestId(fieldName).children).toHaveLength(count)
}

export const testStatusForField = (fieldName: string, validationError: string = ''): void  => {
    const wrap = screen.getByTestId(`${fieldName}-wrap`);
    const field = screen.getByTestId(`${fieldName}`);
    const label = screen.getByTestId(`${fieldName}-label`);
    expect(wrap).toHaveAttribute('data-status', validationError ? 'invalid' : 'valid');
    expect(field).toHaveProperty('title', validationError);
    expect(label).toHaveProperty('title', validationError);
}

export const populateField = (fieldName: string, value = faker.random.word()): void => {
    const input = screen.getByTestId(fieldName)
    fireEvent.input(input, { target: { value } });
}

export const testElementsExists = (fieldName: string) : void => {
    expect(screen.queryByTestId(fieldName)).toBeInTheDocument()
}
