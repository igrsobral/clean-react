import React, { useContext } from 'react'
import S from './input.scss'
import Context from '@/presentation/contexts/form/form-context';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

function Input(props: Props) {
    const { state, setState } = useContext(Context);
    const error = state[`${props.name}Error`];
    const enabledInput = (e: React.FocusEvent<HTMLInputElement>): void => {
        e.target.readOnly = false;
    }
    const getStatus = (): string => {
        return '🔴'
    }
    const getTitle = (): string => {
        return error
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        });
    }
    return (
        <div className={S.inputWrap}>
            <input 
                {...props}
                onChange={handleChange} 
                data-testid={props.name} 
                onFocus={enabledInput} 
                autoComplete={"off"} 
                readOnly
             />
            <span data-testid={`${props.name}-status`} title={getTitle()} className={S.status}>{getStatus()}</span>
        </div>
    );
}

export default Input;