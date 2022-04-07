import React, { useContext } from 'react'
import { Spinner } from '../';
import S from './form-status.scss'
import Context from '@/presentation/contexts/form/form-context'

function FormStatus() {
    const { state } = useContext(Context)
    const { isLoading, main } = state;
    return (
        <div data-testid="error-wrap" className={S.errorWrap}>
            {isLoading && <Spinner />}
            {main && <span data-testid="main-error" className={S.error}>{main}</span>}
        </div>
    );
}

export default FormStatus;