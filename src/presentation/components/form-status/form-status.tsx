import React, { useContext } from 'react'
import { Spinner } from '../';
import S from './form-status.scss'
import Context from '@/presentation/contexts/form/form-context'

function FormStatus() {
    const { state: { isLoading }, errorState } = useContext(Context)

    return (
        <div data-testid="error-wrap" className={S.errorWrap}>
            {isLoading && <Spinner />}
            {errorState.main && <span className={S.error}>{errorState.main}</span>}
        </div>
    );
}

export default FormStatus;