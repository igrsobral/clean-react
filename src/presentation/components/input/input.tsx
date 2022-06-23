import React, { useContext, useRef } from 'react'
import S from './input.scss'
import Context from '@/presentation/contexts/form/form-context';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

function Input(props: Props) {
    const { state, setState } = useContext(Context);
    const inputRef = useRef<HTMLInputElement>()
    const error = state[`${props.name}Error`];
    return (
        <div className={S.inputWrap}>
            <input
                {...props}
                ref={inputRef}
                placeholder=" "
                onChange={(e) => setState({ ...state, [e.target.name]: e.target.value })}
                data-testid={props.name}
                onFocus={(e) => e.target.readOnly = false}
                autoComplete={"off"}
                readOnly
            />
            <label onClick={() => inputRef.current.focus()}>
                {props.placeholder}
            </label>
            <span
                data-testid={`${props.name}-status`}
                title={error || 'Tudo certo'}
                className={S.status}
            >
                {error ? '🔴' : '✅'}
            </span>
        </div>
    );
}

export default Input;