import React from 'react'
import S from './input.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

function Input(props: Props) {
    const enabledInput = (e: React.FocusEvent<HTMLInputElement>): void => {
        e.target.readOnly = false;
    }

    return (
        <div className={S.inputWrap}>
            <input {...props} onFocus={enabledInput} readOnly />
            {/* <span className={S.status}>x</span> */}
        </div>
    );
}

export default Input;