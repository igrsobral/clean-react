import React, { useContext, useRef } from 'react'
import S from './input.scss'
import Context from '@/presentation/contexts/form/form-context';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

function Input(props: Props) {
    const { state, setState } = useContext(Context);
    const inputRef = useRef<HTMLInputElement>()
    const error = state[`${props.name}Error`];
    return (
        <div
            data-testid={`${props.name}-wrap`}
            className={S.inputWrap}
            data-status={error ? 'invalid' : 'valid'}
        >
            <input
                {...props}
                ref={inputRef}
                placeholder=" "
                title={error}
                onChange={(e) => setState({ ...state, [e.target.name]: e.target.value })}
                data-testid={props.name}
                onFocus={(e) => e.target.readOnly = false}
                autoComplete={"off"}
                readOnly
            />
            <label
                data-testid={`${props.name}-label`}
                onClick={() => inputRef.current.focus()}
                title={error}
            >
                {props.placeholder}
            </label>
        </div>
    );
}

export default Input;