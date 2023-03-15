import React, { memo, useContext } from 'react'
import { Logo } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import Styles from './header-styles.scss'
import { useHistory } from 'react-router-dom'

const Header = () => {
    const history = useHistory()
    const { setCurrentAccount } = useContext(ApiContext)
    const logout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
        e.preventDefault()
        setCurrentAccount(undefined)
        history.replace('/login')
    }

    return (
        <header className={Styles.headerWrap}>
            <div className={Styles.headerContent}>
                <Logo />
                <div className={Styles.logoutWrap}>
                    <span data-testid="username">Igor Ribeiro</span>
                    <a data-testid="logout" href="#" onClick={(e) => logout(e)}>Sair</a>
                </div>
            </div>
        </header>
    )
}

export default memo(Header)