import { Logo } from '@/presentation/components/logo/logo';
import { Spinner } from '@/presentation/components/spinner/spinner';
import React from 'react';
import S from './login-styles.scss';

const Login = () => {
    return (
        <div className={S.login}>
            <header className={S.header}>
                <Logo />
                <h1>4Dev - Enquetes para Programadores</h1>
            </header>
            <form className={S.form}>
                <h1>Login</h1>
                <div className={S.inputWrap}>
                    <input type="text" name="email" placeholder="Digite seu e-mail" />
                </div>
                <div className={S.inputWrap}>
                    <input type="password" name="password" placeholder="Digite sua senha" />
                </div>
                <button type="submit">Entrar</button>
                <a href="">criar conta</a>

                <Spinner />
            </form>
            <footer className={S.Footer}>

            </footer>
        </div>
    )
}

export default Login