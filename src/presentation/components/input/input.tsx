import React, { useContext } from 'react'
import S from './input.scss'
import Context from '@/presentation/contexts/form/form-context';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

function Input(props: Props) {
    const { errorState } = useContext(Context);
    const error = errorState[props.name];
    const enabledInput = (e: React.FocusEvent<HTMLInputElement>): void => {
        e.target.readOnly = false;
    }
    const getStatus = (): string => {
        return '🔴'
        // return '✅'
    }
    const getTitle = (): string => {
        return error
    }
    return (
        <div className={S.inputWrap}>
            <input {...props} onFocus={enabledInput} autoComplete={"off"} readOnly />
            <span data-testid={`${props.name}-status`} title={getTitle()} className={S.status}>{getStatus()}</span>
        </div>
    );
}

export default Input;