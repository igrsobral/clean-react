import React, { useContext } from 'react'
import S from './form-status.scss'
import Context from '@/presentation/contexts/form/form-context'

type Props = {
    text: string;
}

function SubmitButton({ text }: Props) {
    const { state } = useContext(Context)
    return (
        <button
            disabled={state.isFormInvalid}
            data-testid="submit"
            type="submit"
            className={S.submit}>
            {text}
        </button>
    )
}

export default SubmitButton;