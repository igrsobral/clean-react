import React from 'react'
import { Spinner } from '../';
import S from './form-status.scss'

function FormStatus() {
    return (
        <div className={S.errorWrap}>
            <Spinner />
            <span className={S.error}>Erro</span>
        </div>
    );
}

export default FormStatus;