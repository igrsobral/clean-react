import React from 'react'
import S from './input.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

function Input(props: Props) {
    return (
        <div className={S.inputWrap}>
            <input {...props} />
            {/* <span className={S.status}>x</span> */}
        </div>
    );
}

export default Input;