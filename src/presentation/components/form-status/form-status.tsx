import React, { useContext } from 'react'
import { Spinner } from '../';
import S from './form-status.scss'
import Context from '@/presentation/contexts/form/form-context'

function FormStatus() {
    const { isLoading, errorMessage } = useContext(Context)
    return (
        <div data-testid="error-wrap" className={S.errorWrap}>
            {isLoading && <Spinner />}
            {errorMessage && <span className={S.error}>{errorMessage}</span>}
        </div>
    );
}

export default FormStatus;