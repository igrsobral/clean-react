import React, { memo } from 'react'
import { Logo } from '../logo/logo'
import S from './login-header-styles.scss'

function LoginHeader() {
    return (
        <header className={S.header}>
            <Logo />
            <h1>4Dev - Enquetes para Programadores</h1>
        </header>
    );
}

export default memo(LoginHeader);